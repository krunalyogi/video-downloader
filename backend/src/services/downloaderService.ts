const ytDlp = require('yt-dlp-exec');

export const handleDownload = async (url: string) => {
    try {
        console.log(`[Service] Processing download request for ${url}`);

        // ── TikTok: use TikWM API first (faster, no-watermark, more reliable) ──
        if (url.includes('tiktok.com')) {
            try {
                const fetch = (await import('node-fetch')).default;
                const tikRes = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`);
                const tikData = await tikRes.json() as any;

                if (tikData && tikData.code === 0 && tikData.data) {
                    return {
                        platform: 'TikTok',
                        title: tikData.data.title || 'TikTok Video',
                        thumbnail: tikData.data.cover || tikData.data.origin_cover || '',
                        formats: [
                            { quality: 'HD No Watermark', type: 'video/mp4', url: tikData.data.hdplay || tikData.data.play, label: 'Download HD' },
                            { quality: 'No Watermark', type: 'video/mp4', url: tikData.data.play, label: 'Download SD' },
                            { quality: 'Audio Only', type: 'audio/mp3', url: tikData.data.music, label: 'Download MP3' }
                        ].filter(f => f.url)
                    };
                }
            } catch (err) {
                console.log('[Service] TikWM API failed, trying yt-dlp...');
            }
        }

        // ── All other platforms: yt-dlp-exec ─────────────────────────────────
        const data = await ytDlp(url, {
            dumpJson: true,
            noWarnings: true,
            preferFreeFormats: true,
            noCheckCertificates: true,     // bypass SSL issues on some CDNs
            geoBypass: true,               // bypass geo-restrictions where possible
            ageLimit: 99,                  // attempt age-restricted content
            addHeader: [
                'referer:youtube.com',
                'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            ]
        });

        const jsonMeta = data as any;
        const availableFormats = jsonMeta.formats?.filter((f: any) =>
            f.url && f.ext !== 'mhtml' && f.protocol !== 'mhtml'
        ) || [];
        availableFormats.sort((a: any, b: any) => (b.height || 0) - (a.height || 0));

        const formattedOutputs = availableFormats.map((f: any) => ({
            quality: f.format_note || (f.height ? `${f.height}p` : f.resolution) || 'Auto',
            type: `${f.vcodec && f.vcodec !== 'none' ? 'video' : 'audio'}/${f.ext}`,
            url: f.url,
            label: `Download ${f.ext?.toUpperCase() || 'MP4'}`
        }));

        // Deduplicate by quality label
        const uniqueFormats = Array.from(
            new Map(formattedOutputs.map((item: any) => [item.quality, item])).values()
        );

        // Best thumbnail — Instagram puts it in thumbnails array
        const bestThumbnail =
            jsonMeta.thumbnail ||
            (jsonMeta.thumbnails?.length > 0 ? jsonMeta.thumbnails[jsonMeta.thumbnails.length - 1].url : null) ||
            '';

        const title = jsonMeta.title || jsonMeta.description || 'Social Media Video';

        return {
            platform: jsonMeta.extractor_key || jsonMeta.extractor || 'Video',
            title: title.length > 80 ? title.substring(0, 80) + '...' : title,
            thumbnail: bestThumbnail,
            formats: uniqueFormats.length > 0
                ? (uniqueFormats as any[]).slice(0, 6)
                : [{ quality: 'Original', type: jsonMeta.ext || 'mp4', url: jsonMeta.url, label: 'Download' }]
        };

    } catch (error: unknown) {
        if (error instanceof Error) {
            const msg = error.message.toLowerCase();
            console.error(`[Service] yt-dlp error: ${error.message}`);

            if (msg.includes('age') || msg.includes('sign in') || msg.includes('login')) {
                throw new Error('This video is age-restricted and requires authentication. Try a public video.');
            }
            if (msg.includes('private') || msg.includes('unavailable') || msg.includes('removed')) {
                throw new Error('This video is private, deleted, or unavailable.');
            }
            if (msg.includes('unsupported url')) {
                throw new Error('This URL is not supported. Try Instagram, TikTok, YouTube, Facebook, Twitter, Reddit, or Pinterest.');
            }
            throw new Error('Could not extract this video. Make sure the video is public and try again.');
        }
        throw new Error('An unexpected error occurred while processing your request.');
    }
};
