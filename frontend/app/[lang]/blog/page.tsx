import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Blog — Creator Tips, Tutorials & Guides | Klipto',
    description: 'Learn how to download videos, optimize your social media content, and use free creator tools with step-by-step guides from the Klipto team.',
};

const POSTS = [
    {
        slug: 'download-trending-instagram-audio',
        title: 'How to Download Trending Instagram Audio as MP3 in 2025',
        excerpt: 'Found a viral sound on Instagram Reels that you want to use? Learn how to extract and save Instagram audio directly to your phone as an MP3 instantly.',
        category: 'Tutorials',
        readTime: '3 min read',
        date: 'March 15, 2025',
        color: 'from-orange-400 to-rose-500',
    },
    {
        slug: 'video-to-gif-converter-guide',
        title: 'The Ultimate Guide to Converting Video to High-Quality GIF',
        excerpt: 'GIFs are the language of the internet. Discover how to clip your favorite YouTube, TikTok, or personal videos into shareable, high-quality GIFs in seconds.',
        category: 'Guides',
        readTime: '4 min read',
        date: 'March 14, 2025',
        color: 'from-indigo-400 to-cyan-500',
    },
    {
        slug: 'best-ai-youtube-title-generator',
        title: 'How to Write Viral YouTube Titles Using AI (A 2025 Guide)',
        excerpt: 'Your YouTube video will fail if the title doesn\'t drive clicks. Learn how top creators use AI generators to write compelling, click-worthy titles without the clickbait.',
        category: 'AI Tools',
        readTime: '6 min read',
        date: 'March 12, 2025',
        color: 'from-teal-400 to-emerald-500',
    },
    {
        slug: 'how-to-download-instagram-reels-without-watermark',
        title: 'How to Download Instagram Reels Without a Watermark in 2025',
        excerpt: 'Learn the fastest and most reliable method to save Instagram Reels to your phone or computer — completely free, no app needed.',
        category: 'Guides',
        readTime: '4 min read',
        date: 'March 10, 2025',
        color: 'from-purple-400 to-pink-500',
    },
    {
        slug: 'tiktok-downloader-no-watermark-guide',
        title: 'TikTok Downloader: Save Any Video Without the Watermark',
        excerpt: 'A complete guide to downloading TikTok videos to iPhone and Android with no watermark — including a method that works in 2025.',
        category: 'Guides',
        readTime: '5 min read',
        date: 'March 8, 2025',
        color: 'from-blue-400 to-cyan-500',
    },
    {
        slug: 'youtube-to-mp3-guide',
        title: 'YouTube to MP3: Download Any YouTube Audio in 3 Steps',
        excerpt: 'Extract the audio from any YouTube video and convert it to high-quality MP3 instantly — completely free, no software required.',
        category: 'Guides',
        readTime: '3 min read',
        date: 'March 6, 2025',
        color: 'from-red-400 to-orange-500',
    },
    {
        slug: 'best-hashtags-for-instagram-reels',
        title: 'Best Hashtags for Instagram Reels in 2025 (With Examples)',
        excerpt: 'Discover which hashtags are actually driving reach for Reels in 2025 — and learn how to find the perfect ones for your niche with our free generator.',
        category: 'Strategy',
        readTime: '7 min read',
        date: 'March 4, 2025',
        color: 'from-green-400 to-emerald-500',
    },
    {
        slug: 'compress-images-for-web-without-quality-loss',
        title: 'How to Compress Images for Web Without Losing Quality',
        excerpt: 'Slow website? Your images are probably too large. This guide shows you how to reduce image size by up to 90% without any visible quality loss.',
        category: 'Tutorials',
        readTime: '6 min read',
        date: 'March 2, 2025',
        color: 'from-yellow-400 to-orange-500',
    },
    {
        slug: 'ai-captions-for-social-media',
        title: 'How AI Caption Generators Are Transforming Social Media in 2025',
        excerpt: 'AI-powered captions are helping creators save dozens of hours each week. Here\'s everything you need to know and how to use them for free.',
        category: 'AI Tools',
        readTime: '5 min read',
        date: 'Feb 28, 2025',
        color: 'from-violet-400 to-fuchsia-500',
    },
];

const CATEGORIES = ['All', 'Guides', 'Tutorials', 'Strategy', 'AI Tools'];

export default function BlogPage() {
    return (
        <div className="w-full flex flex-col items-center">
            {/* Hero */}
            <section className="w-full relative py-20 overflow-hidden flex justify-center px-4">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-zinc-950" />
                <div className="max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold rounded-full px-4 py-1.5 mb-6">
                        <BookOpen className="w-4 h-4" />
                        Creator Blog
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
                        Tips, Guides & Tutorials
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Everything you need to grow your audience, save time, and get the most out of free creator tools.
                    </p>
                </div>
            </section>

            {/* Category Filters */}
            <div className="w-full max-w-5xl mx-auto px-4 flex gap-3 flex-wrap mb-10">
                {CATEGORIES.map((cat) => (
                    <span key={cat} className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${cat === 'All' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600'}`}>
                        {cat}
                    </span>
                ))}
            </div>

            {/* Posts Grid */}
            <section className="w-full max-w-5xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {POSTS.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                            <div className="h-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-900 transition-all duration-300 flex flex-col">
                                {/* Card header color bar */}
                                <div className={`h-2 bg-gradient-to-r ${post.color}`} />
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">{post.category}</span>
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    <h2 className="font-bold text-gray-900 dark:text-white text-lg leading-snug mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-zinc-400 line-clamp-3 flex-1 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </span>
                                        <span className="text-purple-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
