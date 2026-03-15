export type ToolCategory = 'download' | 'image' | 'video' | 'creator' | 'ai';

export interface ToolConfig {
    name: string;
    slug: string;
    category: ToolCategory;
    description: string;
    icon: string;
    apiEndpoint?: string;
    isAlias?: boolean;
    parentSlug?: string;
    faqs?: { q: string; a: string }[];
}

export const toolsConfig: ToolConfig[] = [

    // ── Download Tools (Primary, no duplicates) ─────────────────────────────
    {
        name: "Instagram Reel Downloader",
        slug: "instagram-reel-downloader",
        category: "download",
        description: "Download Instagram Reels and videos instantly in high quality, no watermark.",
        icon: "Instagram",
        apiEndpoint: "/api/download",
        faqs: [
            { q: "How to download Instagram Reels without a watermark?", a: "Simply copy the Instagram Reel link from your app, paste it into the Klipto downloader above, and click Download. Your video will be saved in full HD without any watermarks." },
            { q: "Is it safe to download Instagram videos?", a: "Yes, downloading public Instagram videos using Klipto is 100% safe. We do not require you to log in or provide any personal information." },
            { q: "Where are the downloaded Instagram Reels saved?", a: "Downloaded videos are typically saved to your device's default 'Downloads' folder or your camera roll if you are using a mobile device." },
            { q: "Can I download private Instagram Reels?", a: "No, Klipto currently only supports downloading Reels and videos from public Instagram accounts to respect user privacy." }
        ]
    },
    {
        name: "Instagram Story Downloader",
        slug: "instagram-story-downloader",
        category: "download",
        description: "Download Instagram Stories before they disappear, completely free.",
        icon: "Instagram",
        apiEndpoint: "/api/download"
    },
    {
        name: "TikTok Downloader (No Watermark)",
        slug: "tiktok-downloader",
        category: "download",
        description: "Download TikTok videos without the watermark in full HD.",
        icon: "Video",
        apiEndpoint: "/api/download",
        faqs: [
            { q: "How do I remove the TikTok watermark?", a: "Klipto's TikTok downloader automatically removes the username and logo watermark from the video during the download process. Just paste the link and download." },
            { q: "Do I need to install an app to download TikToks?", a: "No, Klipto is completely web-based. You can download TikTok videos directly from your browser on iPhone, Android, or PC without installing any software." },
            { q: "Can I download TikTok sounds or audio only?", a: "Yes! While this tool downloads the video, you can use our TikTok Audio Downloader tool or YouTube to MP3 tool if you only need the audio track." },
            { q: "Is there a limit to how many TikToks I can download?", a: "No, there are no limits. You can download as many TikTok videos as you want, completely free of charge." }
        ]
    },
    {
        name: "YouTube Video Downloader",
        slug: "youtube-video-downloader",
        category: "download",
        description: "Download YouTube videos in up to 4K resolution.",
        icon: "Youtube",
        apiEndpoint: "/api/download",
        faqs: [
            { q: "What is the maximum resolution supported for YouTube downloads?", a: "Klipto supports downloading YouTube videos in the highest available quality, up to 4K resolution (2160p) when available from the source video." },
            { q: "Is downloading YouTube videos legal?", a: "Downloading YouTube videos for personal, offline viewing is generally acceptable. However, you should not distribute, sell, or use copyrighted material without permission from the creator." },
            { q: "Can I download long YouTube videos?", a: "Yes, you can download long YouTube videos, documentaries, or podcasts, but longer videos may take more time to process and download depending on the file size." },
            { q: "Does the downloaded YouTube video include audio?", a: "Yes, all MP4 downloads from YouTube include both the high-quality video track and original audio track combined." }
        ]
    },
    {
        name: "YouTube Shorts Downloader",
        slug: "youtube-shorts-downloader",
        category: "download",
        description: "Save YouTube Shorts directly to your device in HD.",
        icon: "Youtube",
        apiEndpoint: "/api/download"
    },
    {
        name: "YouTube to MP3 Converter",
        slug: "youtube-to-mp3",
        category: "download",
        description: "Extract audio from any YouTube video and download it as an MP3 file.",
        icon: "Youtube",
        apiEndpoint: "/api/download"
    },
    {
        name: "Twitter Video Downloader",
        slug: "twitter-video-downloader",
        category: "download",
        description: "Download videos and GIFs from Twitter/X easily.",
        icon: "Twitter",
        apiEndpoint: "/api/download"
    },
    {
        name: "Facebook Video Downloader",
        slug: "facebook-video-downloader",
        category: "download",
        description: "Download any Facebook video or Reel in HD quality, free and fast.",
        icon: "Video",
        apiEndpoint: "/api/download"
    },
    {
        name: "Pinterest Video Downloader",
        slug: "pinterest-video-downloader",
        category: "download",
        description: "Download Pinterest videos, GIFs, and images directly to your device.",
        icon: "Video",
        apiEndpoint: "/api/download"
    },
    {
        name: "Reddit Video Downloader",
        slug: "reddit-video-downloader",
        category: "download",
        description: "Download Reddit videos and GIFs with audio intact.",
        icon: "Video",
        apiEndpoint: "/api/download"
    },
    {
        name: "Snapchat Video Downloader",
        slug: "snapchat-video-downloader",
        category: "download",
        description: "Save and download public Snapchat videos and stories.",
        icon: "Video",
        apiEndpoint: "/api/download"
    },
    {
        name: "Vimeo Downloader",
        slug: "vimeo-downloader",
        category: "download",
        description: "Download Vimeo videos in HD without any software.",
        icon: "Video",
        apiEndpoint: "/api/download"
    },
    {
        name: "Twitch Clip Downloader",
        slug: "twitch-clip-downloader",
        category: "download",
        description: "Download Twitch clips and VODs in high quality.",
        icon: "Video",
        apiEndpoint: "/api/download"
    },
    {
        name: "Dailymotion Downloader",
        slug: "dailymotion-downloader",
        category: "download",
        description: "Download videos from Dailymotion quickly and for free.",
        icon: "Video",
        apiEndpoint: "/api/download"
    },
    {
        name: "LinkedIn Video Downloader",
        slug: "linkedin-video-downloader",
        category: "download",
        description: "Download videos shared on LinkedIn posts and articles.",
        icon: "Video",
        apiEndpoint: "/api/download"
    },
    {
        name: "SoundCloud Downloader",
        slug: "soundcloud-downloader",
        category: "download",
        description: "Download any public SoundCloud track as an MP3.",
        icon: "Video",
        apiEndpoint: "/api/download"
    },
    {
        name: "Bilibili Video Downloader",
        slug: "bilibili-video-downloader",
        category: "download",
        description: "Download Bilibili videos in HD quality without any watermark.",
        icon: "Video",
        apiEndpoint: "/api/download"
    },
    {
        name: "Mixcloud Downloader",
        slug: "mixcloud-downloader",
        category: "download",
        description: "Download Mixcloud DJ sets and podcasts as MP3 files for free.",
        icon: "Video",
        apiEndpoint: "/api/download"
    },
    {
        name: "Kwai Video Downloader",
        slug: "kwai-video-downloader",
        category: "download",
        description: "Download Kwai videos without watermark in high quality.",
        icon: "Video",
        apiEndpoint: "/api/download"
    },

    // ── Image Tools ─────────────────────────────────────────────────────────
    {
        name: "Image Compressor",
        slug: "image-compressor",
        category: "image",
        description: "Compress images rapidly without losing quality.",
        icon: "Image",
    },
    {
        name: "Background Remover",
        slug: "background-remover",
        category: "image",
        description: "Remove the background from any photo automatically.",
        icon: "Scissors",
    },

    // ── Video Tools ──────────────────────────────────────────────────────────
    {
        name: "Video to GIF Converter",
        slug: "video-to-gif",
        category: "video",
        description: "Convert any short video clip into an animated GIF.",
        icon: "Film",
    },

    // ── Creator Tools ────────────────────────────────────────────────────────
    {
        name: "Hashtag Generator",
        slug: "hashtag-generator",
        category: "creator",
        description: "Generate trending hashtags for your niche.",
        icon: "Hash",
    },

    // ── AI Tools ─────────────────────────────────────────────────────────────
    {
        name: "AI Caption Generator",
        slug: "ai-caption-generator",
        category: "ai",
        description: "Instantly create engaging captions using AI.",
        icon: "Wand2",
    },

    // ── SEO Aliases (Long-Tail Keywords) — each points to a unique parent ────
    {
        name: "Download Instagram Reels 1080p",
        slug: "download-instagram-reels-1080p",
        category: "download",
        description: "Download Instagram Reels in full HD 1080p resolution.",
        icon: "Instagram",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "instagram-reel-downloader"
    },
    {
        name: "Download Instagram Stories",
        slug: "download-instagram-stories",
        category: "download",
        description: "Anonymously download Instagram Stories before they expire.",
        icon: "Instagram",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "instagram-story-downloader"
    },
    {
        name: "TikTok Downloader No Watermark iPhone",
        slug: "tiktok-no-watermark-iphone",
        category: "download",
        description: "Save TikToks to your iPhone camera roll without the watermark.",
        icon: "Video",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "tiktok-downloader"
    },
    {
        name: "Save TikTok Video Without Watermark",
        slug: "save-tiktok-without-watermark",
        category: "download",
        description: "Save any TikTok video clean, without the TikTok logo watermark.",
        icon: "Video",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "tiktok-downloader"
    },
    {
        name: "YouTube to MP4 Converter HD",
        slug: "youtube-to-mp4-hd",
        category: "download",
        description: "Convert and download any YouTube video to a high-quality MP4 file.",
        icon: "Youtube",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "youtube-video-downloader"
    },
    {
        name: "YouTube Audio Downloader",
        slug: "youtube-audio-downloader",
        category: "download",
        description: "Extract and download the audio from any YouTube video as MP3.",
        icon: "Youtube",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "youtube-to-mp3"
    },
    {
        name: "YouTube Shorts Downloader No Watermark",
        slug: "youtube-shorts-downloader-no-watermark",
        category: "download",
        description: "Download YouTube Shorts with no branding or watermark in HD quality.",
        icon: "Youtube",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "youtube-shorts-downloader"
    },
    {
        name: "Twitter GIF Downloader",
        slug: "twitter-gif-downloader",
        category: "download",
        description: "Download Twitter/X GIFs and videos as MP4 files instantly.",
        icon: "Twitter",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "twitter-video-downloader"
    },
    {
        name: "Facebook Reel Downloader",
        slug: "facebook-reel-downloader",
        category: "download",
        description: "Save Facebook Reels to your device quickly without any watermark.",
        icon: "Video",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "facebook-video-downloader"
    },
    {
        name: "Pinterest Image Downloader",
        slug: "pinterest-image-downloader",
        category: "download",
        description: "Download full-resolution Pinterest photos and infographics.",
        icon: "Video",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "pinterest-video-downloader"
    },
    {
        name: "Reddit Video Downloader with Audio",
        slug: "reddit-video-downloader-with-audio",
        category: "download",
        description: "Download Reddit-hosted videos with their audio track merged.",
        icon: "Video",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "reddit-video-downloader"
    },
    {
        name: "Snapchat Story Downloader",
        slug: "snapchat-story-downloader",
        category: "download",
        description: "Save public Snapchat stories before they vanish — no account needed.",
        icon: "Video",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "snapchat-video-downloader"
    },
    {
        name: "Twitch VOD Downloader",
        slug: "twitch-vod-downloader",
        category: "download",
        description: "Download full Twitch VODs and past broadcasts in high quality.",
        icon: "Video",
        apiEndpoint: "/api/download",
        isAlias: true,
        parentSlug: "twitch-clip-downloader"
    },
    {
        name: "Remove Background from Product Photo",
        slug: "remove-background-product-photo",
        category: "image",
        description: "Instantly strip backgrounds from e-commerce product photos.",
        icon: "Scissors",
        isAlias: true,
        parentSlug: "background-remover"
    },
    {
        name: "Remove White Background from Logo",
        slug: "remove-white-background-logo",
        category: "image",
        description: "Remove the white background from logos and make them transparent PNG.",
        icon: "Scissors",
        isAlias: true,
        parentSlug: "background-remover"
    },
    {
        name: "Compress WebP Images Online Free",
        slug: "compress-webp-online",
        category: "image",
        description: "Shrink massive WebP images without losing visual fidelity.",
        icon: "Image",
        isAlias: true,
        parentSlug: "image-compressor"
    },
    {
        name: "Resize Image for Instagram Post",
        slug: "resize-image-for-instagram",
        category: "image",
        description: "Resize images to perfect Instagram post dimensions without quality loss.",
        icon: "Image",
        isAlias: true,
        parentSlug: "image-compressor"
    },
    {
        name: "Instagram Hashtag Generator Free",
        slug: "instagram-hashtag-generator",
        category: "creator",
        description: "Generate the best Instagram hashtags for maximum reach and engagement.",
        icon: "Hash",
        isAlias: true,
        parentSlug: "hashtag-generator"
    },
    {
        name: "AI Instagram Caption Generator",
        slug: "ai-instagram-caption-generator",
        category: "ai",
        description: "Let AI write perfect Instagram captions with emojis and hashtags.",
        icon: "Wand2",
        isAlias: true,
        parentSlug: "ai-caption-generator"
    }

];

export const getToolBySlug = (slug: string): ToolConfig | undefined => {
    return toolsConfig.find(t => t.slug === slug);
};

// Only returns primary tools (no SEO aliases) — aliases still exist for URL routing
export const getToolsByCategory = (category: ToolCategory): ToolConfig[] => {
    return toolsConfig.filter(t => t.category === category && !t.isAlias);
};

// All tools including aliases (for sitemap, search, etc.)
export const getAllTools = (): ToolConfig[] => toolsConfig;
