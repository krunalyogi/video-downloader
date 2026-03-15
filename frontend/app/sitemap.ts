import { MetadataRoute } from "next";
import { toolsConfig } from "@/config/tools";
import { locales } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://klipto.vercel.app";

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Helper to add permutations of a path for every supported locale
    const addPathsForLocales = (path: string, priority: number, changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "weekly") => {
        locales.forEach((locale) => {
            const localePrefix = `/${locale}`;
            const fullUrl = `${baseUrl}${localePrefix}${path}`;

            sitemapEntries.push({
                url: fullUrl,
                lastModified: new Date(),
                changeFrequency,
                priority,
            });
        });
    };

    // 1. Root and Static Pages
    addPathsForLocales("", 1, "daily"); // Homepage
    addPathsForLocales("/about", 0.7, "monthly");
    addPathsForLocales("/blog", 0.8, "weekly");
    addPathsForLocales("/privacy", 0.3, "monthly");
    addPathsForLocales("/terms", 0.3, "monthly");
    addPathsForLocales("/contact", 0.4, "monthly");
    
    // Tools Hubs
    addPathsForLocales("/tools/batch-downloader", 0.7, "monthly");
    addPathsForLocales("/tools/image-converter", 0.7, "monthly");

    // 2. Individual Tools
    toolsConfig.forEach((tool) => {
        addPathsForLocales(`/tools/${tool.slug}`, 0.8, "weekly");
    });

    // 3. Category Pages
    ["download", "image", "video", "creator", "ai"].forEach((cat) => {
        addPathsForLocales(`/category/${cat}`, 0.6, "weekly");
    });

    // 4. Static Blog Articles currently tracked
    [
        'how-to-download-instagram-reels-without-watermark',
        'tiktok-downloader-no-watermark-guide',
        'youtube-to-mp3-guide',
        'best-hashtags-for-instagram-reels',
        'compress-images-for-web-without-quality-loss',
        'ai-captions-for-social-media',
    ].forEach((slug) => {
        addPathsForLocales(`/blog/${slug}`, 0.7, "monthly");
    });

    return sitemapEntries;
}
