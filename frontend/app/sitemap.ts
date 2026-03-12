import { MetadataRoute } from "next";
import { toolsConfig } from "@/config/tools";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://klipto.vercel.app";

    const toolUrls = toolsConfig.map(tool => ({
        url: `${baseUrl}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    const categoryUrls = ["download", "image", "video", "creator", "ai"].map(cat => ({
        url: `${baseUrl}/category/${cat}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
        { url: `${baseUrl}/tools/batch-downloader`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `${baseUrl}/tools/image-converter`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
        // Blog articles
        ...[
            'how-to-download-instagram-reels-without-watermark',
            'tiktok-downloader-no-watermark-guide',
            'youtube-to-mp3-guide',
            'best-hashtags-for-instagram-reels',
            'compress-images-for-web-without-quality-loss',
            'ai-captions-for-social-media',
        ].map(slug => ({
            url: `${baseUrl}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        ...toolUrls,
        ...categoryUrls,
        { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.3 },
        { url: `${baseUrl}/terms`, lastModified: new Date(), priority: 0.3 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.4 },
    ];
}
