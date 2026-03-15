import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, CheckCircle } from 'lucide-react';
import { toolsConfig } from '@/config/tools';

const BLOG_POSTS: Record<string, {
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    content: string;
    relatedTools: string[];
}> = {
    'how-to-download-instagram-reels-without-watermark': {
        title: 'How to Download Instagram Reels Without a Watermark in 2025',
        excerpt: 'Learn the fastest and most reliable method to save Instagram Reels to your phone or computer — completely free, no app needed.',
        category: 'Guides',
        readTime: '4 min read',
        date: 'March 10, 2025',
        relatedTools: ['instagram-reel-downloader', 'instagram-story-downloader', 'instagram-video-downloader'],
        content: `
Instagram Reels have become one of the most engaging content formats of 2025. But what happens when you want to save a Reel — without that distracting Instagram watermark?

## Why Instagram Adds a Watermark

When you use Instagram's built-in "Save" feature, it downloads the video with a permanent watermark overlay that includes the creator's handle and the Instagram logo. This is great for sharing but terrible for repurposing content.

## The Easiest Method: Klipto's Instagram Reel Downloader

1. **Open Instagram** and find the Reel you want to download.
2. **Tap the three dots (⋮)** in the bottom right corner of the Reel.
3. **Tap "Copy Link"** to copy the Reel's URL to your clipboard.
4. **Open Klipto** in your browser — the smart clipboard detection will automatically detect the URL.
5. **Tap "Paste URL"** when the button appears, then click **Download**.
6. Your clean, watermark-free video will appear with quality options — choose your preferred resolution and save it.

## Tips for Best Quality

- Always choose **1080p** if available for the best quality reels.
- If the uploader posted a low-resolution video, unfortunately no tool can upscale it beyond the original quality.
- For slideshows and photo posts, use our Instagram story downloader instead.

## Is It Legal?

Downloading content for **personal use** is generally fine. Republishing someone else's content without credit, however, may violate copyright law and Instagram's terms of service. Always credit original creators when reposting.
        `,
    },
    'tiktok-downloader-no-watermark-guide': {
        title: 'TikTok Downloader: Save Any Video Without the Watermark',
        excerpt: 'A complete guide to downloading TikTok videos to iPhone and Android with no watermark.',
        category: 'Guides',
        readTime: '5 min read',
        date: 'March 8, 2025',
        relatedTools: ['tiktok-downloader', 'tiktok-no-watermark-iphone', 'save-tiktok-without-watermark'],
        content: `
TikTok's built-in downloader adds a watermark with the creator's username and the TikTok logo. While this is great for giving credit, it makes it difficult to repurpose or save clean versions of videos.

## How to Download TikTok Videos Without Watermark

### On iPhone
1. Open the TikTok app and find the video.
2. Tap the **Share** button → **Copy Link**.
3. Open **Klipto** in Safari — the clipboard alert appears automatically.
4. Tap **Paste URL** → **Download**.
5. The video downloads directly to your iPhone Photos app.

### On Android
The process is identical. Klipto works on all modern Android browsers including Chrome, Firefox, and Samsung Internet.

### On Desktop
Simply copy the TikTok URL from your browser's address bar, paste it into Klipto, and download in HD.

## Why Our Method Works Best

- **No registration** required
- **No daily limits** on downloads
- Works on **private links** shared with you
- Supports all TikTok video types including slideshows

## Frequently Asked Questions

**Is it free?** Yes, 100% free.  
**Does it work on all TikToks?** Yes, as long as the video is public.  
**What format is the download?** MP4 video file, ready to share anywhere.
        `,
    },
    'youtube-to-mp3-guide': {
        title: 'YouTube to MP3: Download Any YouTube Audio in 3 Steps',
        excerpt: 'Extract the audio from any YouTube video and convert it to high-quality MP3 instantly.',
        category: 'Guides',
        readTime: '3 min read',
        date: 'March 6, 2025',
        relatedTools: ['youtube-to-mp3', 'youtube-video-downloader', 'youtube-shorts-downloader'],
        content: `
Converting YouTube videos to MP3 is one of the most-searched tasks online. Whether you want to save a podcast, a music mix, or a lecture — Klipto makes it simple.

## 3 Steps to Convert YouTube to MP3

1. **Copy the YouTube URL** from your browser or the share button.
2. **Paste it into Klipto** — our clipboard detection will auto-detect it for you.
3. **Click Download** — select the **MP3** format option and save the audio file.

## Audio Quality Options

Klipto extracts audio at the highest quality available from the source video:
- **Standard (128kbps)** — great for podcasts and speech
- **High Quality (320kbps)** — ideal for music

## Legal Considerations

Downloading audio for personal use is generally considered acceptable in most countries. However, distributing copyrighted music without authorization is illegal. Always respect content creators' rights and YouTube's Terms of Service.

## Other YouTube Download Options

Besides MP3, you can also download YouTube videos in:
- **MP4 720p/1080p/4K** using our YouTube Video Downloader
- **YouTube Shorts** via our Shorts Downloader
        `,
    },
    'best-hashtags-for-instagram-reels': {
        title: 'Best Hashtags for Instagram Reels in 2025 (With Examples)',
        excerpt: 'Discover which hashtags are actually driving reach for Reels in 2025.',
        category: 'Strategy',
        readTime: '7 min read',
        date: 'March 4, 2025',
        relatedTools: ['hashtag-generator', 'instagram-hashtag-generator', 'ai-caption-generator'],
        content: `
Instagram's algorithm for Reels has undergone major changes in 2025. Hashtags still matter — but the strategy has evolved.

## What's Changed in 2025

- **3–5 targeted hashtags** outperform 30 random ones
- **Niche-specific hashtags** (10K–500K posts) beat mega tags
- **Hashtags in the caption** are preferred over the first comment

## Top Hashtag Strategies by Niche

### Fitness & Health
#FitTok #GymLife #WorkoutMotivation #FitnessReels #HomeWorkout

### Food & Cooking
#FoodReels #RecipeOfTheDay #EasyRecipes #CookingVideo #FoodTok

### Travel
#TravelReels #HiddenGems #TravelTok #Wanderlust #TravelPhotography

### Business & Entrepreneurship
#BusinessTips #EntrepreneurLife #SideHustle #SmallBusiness #CreatorEconomy

## The Easy Way: Use Klipto's Hashtag Generator

Instead of researching manually, use our **free AI Hashtag Generator** to instantly get perfectly tailored hashtag sets for any niche. Just describe your content and get 30 optimized hashtags in seconds.
        `,
    },
    'compress-images-for-web-without-quality-loss': {
        title: 'How to Compress Images for Web Without Losing Quality',
        excerpt: 'Learn how to reduce image size by up to 90% without any visible quality loss.',
        category: 'Tutorials',
        readTime: '6 min read',
        date: 'March 2, 2025',
        relatedTools: ['image-compressor', 'compress-webp-online', 'resize-image-for-instagram'],
        content: `
Large images are the #1 reason websites are slow. A 5MB JPEG that could be 200KB is costing you visitors, SEO ranking, and ad revenue.

## The Formats That Matter in 2025

| Format | Best For | Average Size |
|---|---|---|
| **WebP** | Everything on the web | Smallest |
| **AVIF** | Modern browsers | Smallest |
| **JPG** | Photos | Medium |
| **PNG** | Logos / Transparency | Larger |

## How to Compress Images for Free

1. Open **Klipto's Image Compressor**
2. Drag and drop your PNG, JPG, or WebP file
3. Choose your quality setting (80% is the sweet spot)
4. Download the compressed file — often 60–90% smaller

## Tips For Maximum Compression

- **Convert JPG to WebP** — WebP is typically 30% smaller than JPG at the same quality
- **Set quality to 75–85** — below 75 you start to notice artifacts; above 85 the file is unnecessarily large
- **Resize before compressing** — if the display size is 800px wide, don't upload a 4000px image

## WordPress & Shopify Users

Always compress product photos before uploading. A Shopify store with optimized images loads 2–3x faster, which directly improves conversion rates and Google ranking.
        `,
    },
    'ai-captions-for-social-media': {
        title: 'How AI Caption Generators Are Transforming Social Media in 2025',
        excerpt: 'AI-powered captions are helping creators save dozens of hours each week.',
        category: 'AI Tools',
        readTime: '5 min read',
        date: 'Feb 28, 2025',
        relatedTools: ['ai-caption-generator', 'ai-instagram-caption-generator', 'hashtag-generator'],
        content: `
Writing captions used to take creators 20–30 minutes per post. AI has changed that completely. In 2025, the best creators use AI to draft, then humanize.

## What Makes a Great AI Caption?

The best AI captions are:
- **Specific** — reference details unique to the post
- **Compelling** — start with a hook, end with a CTA
- **Voice-matched** — sounds like YOU, not a robot

## How Klipto's AI Caption Generator Works

1. **Describe your post** in 1–2 sentences
2. **Select your tone** — Casual, Professional, Funny, Inspirational
3. **Generate** — get 3 caption variants instantly
4. **Pick and edit** — personalize the best one

## Real Time Savings

| Task | Manual Time | With AI |
|---|---|---|
| Writing one caption | 15–25 min | 2 min |
| Writing 7 posts/week | 3 hours | 20 min |
| Writing 30 posts/month | 12.5 hours | 1.5 hours |

## Best Practices When Using AI Captions

- Always add 1–2 personal details that only you would know
- Keep your brand voice consistent by always using the same tone
- Use Klipto's Hashtag Generator after generating your caption to complete the post
        `,
    },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = BLOG_POSTS[params.slug];
    if (!post) return { title: 'Not Found' };
    return {
        title: `${post.title} | Klipto Blog`,
        description: post.excerpt,
        openGraph: { title: post.title, description: post.excerpt },
    };
}

export async function generateStaticParams() {
    return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = BLOG_POSTS[params.slug];
    if (!post) return <div className="p-20 text-center">Post not found</div>;

    const relatedTools = toolsConfig.filter(t => post.relatedTools.includes(t.slug));
    
    // Simple markdown renderer: split by \n\n, treat ## as h2, **text** as bold, - as li
    const renderContent = (text: string) => {
        return text.trim().split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">{block.replace('## ', '')}</h2>;
            }
            if (block.startsWith('### ')) {
                return <h3 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">{block.replace('### ', '')}</h3>;
            }
            if (block.includes('|')) {
                const rows = block.split('\n').filter(r => r.trim() && !r.includes('|---|'));
                return (
                    <div key={i} className="overflow-x-auto my-6">
                        <table className="w-full border-collapse text-sm">
                            {rows.map((row, ri) => {
                                const cells = row.split('|').filter(Boolean);
                                return ri === 0 ? (
                                    <thead key={ri}><tr>{cells.map((c, ci) => <th key={ci} className="px-4 py-3 bg-gray-50 dark:bg-zinc-800 text-left font-semibold border border-gray-200 dark:border-zinc-700">{c.trim().replace(/\*\*/g, '')}</th>)}</tr></thead>
                                ) : (
                                    <tbody key={ri}><tr>{cells.map((c, ci) => <td key={ci} className="px-4 py-3 border border-gray-200 dark:border-zinc-700">{c.trim().replace(/\*\*/g, '')}</td>)}</tr></tbody>
                                );
                            })}
                        </table>
                    </div>
                );
            }
            if (block.startsWith('- ') || block.includes('\n- ')) {
                const items = block.split('\n').filter(l => l.startsWith('- '));
                return (
                    <ul key={i} className="my-4 space-y-2 pl-2">
                        {items.map((item, li) => (
                            <li key={li} className="flex items-start gap-2 text-gray-600 dark:text-zinc-300">
                                <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span dangerouslySetInnerHTML={{ __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </li>
                        ))}
                    </ul>
                );
            }
            return (
                <p key={i} className="text-gray-600 dark:text-zinc-300 leading-relaxed my-4"
                    dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            );
        });
    };

    return (
        <div className="w-full flex justify-center py-12 px-4">
            <div className="max-w-3xl w-full">
                {/* Back */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>

                {/* Header */}
                <div className="mb-10">
                    <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">{post.category}</span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 mb-4 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                        <button className="ml-auto flex items-center gap-1 hover:text-purple-600 transition-colors">
                            <Share2 className="w-3.5 h-3.5" /> Share
                        </button>
                    </div>
                </div>

                {/* Content */}
                <article className="prose-lg max-w-none">
                    {renderContent(post.content)}
                </article>

                {/* Author Bio */}
                <div className="mt-14 p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0">
                        K
                    </div>
                    <div>
                        <div className="font-bold text-gray-900 dark:text-white text-base">Klipto Editorial Team</div>
                        <div className="text-xs text-purple-600 font-semibold mb-2">Content & Creator Strategy</div>
                        <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                            The Klipto team tests every downloader, image tool, and AI generator we write about firsthand. Our guides are based on real usage across 22+ platforms so you always get accurate, up-to-date instructions.
                        </p>
                    </div>
                </div>

                {/* Related Tools */}
                {relatedTools.length > 0 && (
                    <div className="mt-16 p-8 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 rounded-2xl">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Try These Free Tools</h3>
                        <div className="flex flex-wrap gap-3">
                            {relatedTools.map(t => (
                                <Link key={t.slug} href={`/tools/${t.slug}`}
                                    className="px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-purple-400 hover:text-purple-600 transition-colors">
                                    {t.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back to Blog */}
                <div className="mt-12 text-center">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700">
                        <ArrowLeft className="w-4 h-4" /> View All Articles
                    </Link>
                </div>
            </div>
        </div>
    );
}
