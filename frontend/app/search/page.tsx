"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toolsConfig } from "@/config/tools";
import { ToolCard } from "@/components/ToolCard";
import { Search } from "lucide-react";

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get("q") || "";
    const [query, setQuery] = useState(initialQuery);

    const filtered = toolsConfig.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        router.replace(`/search?${params.toString()}`, { scroll: false });
    }, [query, router]);

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
                Search Tools
            </h1>

            <div className="relative mb-10">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    autoFocus
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search tools, e.g. compress, hashtag, gif..."
                    className="block w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-zinc-700 rounded-2xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg transition-all"
                />
            </div>

            {query && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{query}&quot;
                </p>
            )}

            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(tool => (
                        <ToolCard key={tool.slug} tool={tool} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-400 dark:text-zinc-500">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">No tools found for &quot;{query}&quot;</p>
                    <p className="text-sm mt-2">Try a different keyword like &quot;download&quot;, &quot;image&quot;, or &quot;AI&quot;</p>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense>
            <SearchContent />
        </Suspense>
    );
}
