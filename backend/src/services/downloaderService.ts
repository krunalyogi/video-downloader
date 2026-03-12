const ytDlp = require('yt-dlp-exec');

export const handleDownload = async (url: string) => {
    try {
        console.log(`[Service] Processing download request for ${url}`);

        // TikTok Native Fallback: yt-dlp is notoriously unreliable for TikTok due to anti-bot.
        // We use a known free, public TikTok downloader API (tikwm) as a primary attempt for TikTok.
        if (url.includes('tiktok.com')) {
            try {
                const fetch = (await import('node-fetch')).default;
                const tikRes = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
                const tikData = await tikRes.json() as any;

                if (tikData && tikData.code === 0 && tikData.data) {
                    return {
                        platform: 'TikTok',
                        title: tikData.data.title || 'TikTok Video',
                        thumbnail: tikData.data.cover || tikData.data.origin_cover || 'https://via.placeholder.com/640x360.png?text=TikTok',
                        formats: [
                            { quality: 'HD No Watermark', type: 'video/mp4', url: tikData.data.hdplay || tikData.data.play, label: 'Download HD' },
                            { quality: 'No Watermark', type: 'video/mp4', url: tikData.data.play, label: 'Download SD' },
                            { quality: 'Audio Only', type: 'audio/mp3', url: tikData.data.music, label: 'Download MP3' }
                        ]
                    };
                }
            } catch (err) {
                console.log("[Service] TikTok API fallback failed, trying yt-dlp...");
            }
        }

        // Standard Extraction via yt-dlp-exec
        const data = await ytDlp(url, {
            dumpJson: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: [
                'referer:youtube.com',
                'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
            ]
        });

        const jsonMeta = data as any;
        const availableFormats = jsonMeta.formats?.filter((f: any) => f.url && f.ext !== 'mhtml') || [];
        availableFormats.sort((a: any, b: any) => (b.height || 0) - (a.height || 0));

        const formattedOutputs = availableFormats.map((f: any) => ({
            quality: f.format_note || f.resolution || `${f.height || '?'}p`,
            type: `${f.vcodec !== 'none' ? 'video' : 'audio'}/${f.ext}`,
            url: f.url,
            label: `Download ${f.ext.toUpperCase()}`
        }));

        const uniqueFormats = Array.from(new Map(formattedOutputs.map((item: any) =>
            [item.quality, item])).values());

        // Robust thumbnail extraction (Instagram usually puts it in thumbnails array)
        const bestThumbnail = jsonMeta.thumbnail || 
            (jsonMeta.thumbnails && jsonMeta.thumbnails.length > 0 ? jsonMeta.thumbnails[jsonMeta.thumbnails.length - 1].url : null) || 
            'https://via.placeholder.com/640x360.png?text=Video+Thumbnail';

        // Robust Title extraction for Instagram
        const title = jsonMeta.title || jsonMeta.description || 'Social Media Video';

        return {
            platform: jsonMeta.extractor_key || jsonMeta.extractor || 'Unknown Output',
            title: title.length > 50 ? title.substring(0, 50) + '...' : title,
            thumbnail: bestThumbnail,
            formats: uniqueFormats.length > 0 ? uniqueFormats.slice(0, 5) : [
                { quality: 'Original', type: jsonMeta.ext || 'mp4', url: jsonMeta.url, label: 'Download Source' }
            ]
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`[Service] yt-dlp-exec fatal fail: ${error.message}`);
            // Provide user-friendly errors
            if (error.message.includes('Unsupported URL') || error.message.includes('Video unavailable')) {
                throw new Error("This video is private, unavailable, or the URL format is unsupported.");
            }
            throw new Error(`Extraction failed: Our servers could not access this video. Try a public link.`);
        } else {
            throw new Error('An unknown error occurred while downloading.');
        }
    }
};
