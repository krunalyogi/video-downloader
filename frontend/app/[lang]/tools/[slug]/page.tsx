import { notFound } from "next/navigation";
import { getToolBySlug, toolsConfig } from "@/config/tools";
import { DownloaderInput } from "@/components/DownloaderInput";
import { ImageCompressorUI } from "@/components/ImageCompressorUI";
import { AICaptionGeneratorUI } from "@/components/AICaptionGeneratorUI";
import { HashtagGeneratorUI } from "@/components/HashtagGeneratorUI";
import { VideoToGifUI } from "@/components/VideoToGifUI";
import { BackgroundRemoverUI } from "@/components/BackgroundRemoverUI";
import { ToolCard } from "@/components/ToolCard";
import { AdBanner } from "@/components/AdBanner";
import { getIcon } from "@/components/IconMapper";
import { DynamicToolContent } from "@/components/DynamicToolContent";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const tool = getToolBySlug(params.slug);
    if (!tool) return { title: 'Not Found' };

    const url = `https://klipto.vercel.app/tools/${tool.slug}`;

    return {
        title: `${tool.name} | Klipto`,
        description: tool.description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: `${tool.name} | Klipto`,
            description: tool.description,
            url,
            type: 'website',
            siteName: 'Klipto',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${tool.name} | Klipto`,
            description: tool.description,
        }
    };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
    const tool = getToolBySlug(params.slug);

    if (!tool) {
        notFound();
    }

    const relatedTools = toolsConfig
        .filter(t => t.category === tool.category && t.slug !== tool.slug)
        .slice(0, 3);

    const IconComponent = getIcon(tool.icon);

    const defaultFaqs = [
        { q: `Is ${tool.name} free to use?`, a: `Yes, ${tool.name} on Klipto is 100% free. No sign-up, no subscription, and no hidden fees.` },
        { q: `Do downloaded files have watermarks?`, a: `No. Klipto removes all platform watermarks. Your downloaded file is clean and ready to use.` },
        { q: `Is it safe to use ${tool.name}?`, a: `Yes. Klipto never stores your files or personal data. All processing happens securely and files are discarded immediately after download.` },
        { q: `What file format will I get?`, a: `Videos are downloaded in MP4 format. Audio tools provide MP3 files. Images are provided in their original format.` },
        { q: `Does it work on mobile devices?`, a: `Yes — Klipto is fully optimized for iPhone, Android, and all modern browsers.` },
    ];

    const faqItems = tool.faqs && tool.faqs.length > 0 ? tool.faqs : defaultFaqs;

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                // WebApplication — no aggregateRating until we collect real reviews
                "@type": "WebApplication",
                "name": tool.name,
                "description": tool.description,
                "url": `https://klipto.com/tools/${tool.slug}`,
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "All",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqItems.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                }))
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Klipto", "item": "https://klipto.vercel.app" },
                    { "@type": "ListItem", "position": 2, "name": tool.category.charAt(0).toUpperCase() + tool.category.slice(1) + " Tools", "item": `https://klipto.vercel.app/category/${tool.category}` },
                    { "@type": "ListItem", "position": 3, "name": tool.name, "item": `https://klipto.vercel.app/tools/${tool.slug}` }
                ]
            }
        ]
    };

    // Use parentSlug for alias pages so they render the exact same UI as the main tool
    const renderSlug = tool.parentSlug || tool.slug;

    return (
        <div className="w-full flex flex-col items-center">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            {/* Tool Hero */}
            <section className="w-full relative py-16 overflow-hidden flex justify-center px-4">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-zinc-950"></div>
                <div className="max-w-4xl text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                        <IconComponent className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
                        {tool.name}
                    </h1>

                    {/* Feature Pills — honest, no fake review count */}
                    <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                        {["100% Free", "No Watermark", "No Login", "Works on Mobile"].map(badge => (
                            <span key={badge} className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800">
                                ✓ {badge}
                            </span>
                        ))}
                    </div>

                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
                        {tool.description} Fast, free, and secure. No installation required.
                    </p>

                    {tool.category === "download" && (
                        <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
                            <DownloaderInput />
                        </div>
                    )}

                    {renderSlug === "image-compressor" && (
                        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
                            <ImageCompressorUI />
                        </div>
                    )}

                    {renderSlug === "ai-caption-generator" && (
                        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
                            <AICaptionGeneratorUI />
                        </div>
                    )}

                    {renderSlug === "hashtag-generator" && (
                        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
                            <HashtagGeneratorUI />
                        </div>
                    )}

                    {renderSlug === "video-to-gif" && (
                        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
                            <VideoToGifUI />
                        </div>
                    )}

                    {renderSlug === "background-remover" && (
                        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
                            <BackgroundRemoverUI />
                        </div>
                    )}

                    {!["download", "image", "ai", "video"].includes(tool.category) && !["hashtag-generator", "video-to-gif", "background-remover"].includes(renderSlug) && (
                        <div className="p-10 border border-dashed border-gray-300 dark:border-zinc-700 rounded-3xl w-full max-w-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm mt-8">
                            <p className="text-gray-500 dark:text-zinc-400">Tool interface placeholder for {tool.category}</p>
                        </div>
                    )}

                    {/* Highly dynamic SEO-injected content */}
                    <DynamicToolContent tool={tool} renderSlug={renderSlug} />

                </div>
            </section>

            {/* Instructions */}
            <section className="w-full max-w-4xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center">How to use {tool.name}?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 dark:bg-zinc-800 -z-10" />
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col items-center text-center relative z-10">
                            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mb-4 shadow-md">
                                {step}
                            </div>
                            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Step {step}</h3>
                            <p className="text-gray-500 dark:text-zinc-400 text-sm">
                                {step === 1 && tool.category === "download" && "Copy the video URL from your social app."}
                                {step === 1 && tool.category === "image" && "Select or drag & drop your image file."}
                                {step === 1 && !["download", "image"].includes(tool.category) && "Provide your input or prompt."}
                                
                                {step === 2 && "Paste it into the tool or click process."}
                                
                                {step === 3 && tool.category === "download" && "Save the high-quality MP4/MP3 to your device."}
                                {step === 3 && tool.category !== "download" && "Preview the result and download instantly."}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Dynamic SEO FAQs (High Content Density for Google) */}
            <section className="w-full max-w-4xl mx-auto px-4 pb-16">
                <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqItems.map((faq, i) => (
                        <div key={i} className="p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{faq.q}</h3>
                            <p className="text-gray-600 dark:text-zinc-400">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Ad Slot */}
            <section className="w-full max-w-4xl mx-auto px-4 mb-8">
                <AdBanner position="horizontal" />
            </section>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
                <section className="w-full bg-gray-50 dark:bg-zinc-900/50 py-16 border-t border-gray-200 dark:border-zinc-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Related Tools</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedTools.map(t => (
                                <ToolCard key={t.slug} tool={t} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
