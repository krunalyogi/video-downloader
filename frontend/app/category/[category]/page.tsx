import { getToolsByCategory, ToolCategory } from "@/config/tools";
import { ToolCard } from "@/components/ToolCard";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const categoryTitles: Record<ToolCategory, string> = {
    download: "Download Utilities",
    video: "Video Editors & Mixers",
    image: "Image Processing Tools",
    creator: "Creator Assitants",
    ai: "AI Magic Generators"
};

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
    const cat = params.category as ToolCategory;
    const title = categoryTitles[cat];
    if (!title) return { title: 'Not Found' };

    return {
        title: `${title} | Klipto`,
        description: `Explore the best ${title.toLowerCase()} for content creators.`,
    };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
    const cat = params.category as ToolCategory;
    const title = categoryTitles[cat];

    if (!title) {
        notFound();
    }

    const tools = getToolsByCategory(cat);

    return (
        <div className="w-full flex flex-col items-center">
            <section className="w-full relative py-16 md:py-24 overflow-hidden flex justify-center px-4 bg-gray-50 dark:bg-zinc-900/30 border-b border-gray-200 dark:border-zinc-800">
                <div className="max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white capitalize">
                        {title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Everything you need to level up your content. Fast, secure, and professional tools tailored for you.
                    </p>
                </div>
            </section>

            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <ToolCard key={tool.slug} tool={tool} />
                    ))}
                    {tools.length === 0 && (
                        <p className="text-gray-500 col-span-full text-center py-10">No tools found for this category yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
