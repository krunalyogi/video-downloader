"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Hash, Loader2, Copy, Check, AlertCircle } from "lucide-react";

export const HashtagGeneratorUI = () => {
    const [topic, setTopic] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setIsLoading(true);
        setError(null);
        setResult(null);
        setCopied(false);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const res = await fetch(`${backendUrl}/api/ai/hashtags`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to generate hashtags");
            }

            setResult(data.result);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!result) return;
        navigator.clipboard.writeText(result.join(" "));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col items-center gap-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                <form onSubmit={handleGenerate} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            What is your post about?
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Hash className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g. A vlog about traveling in Kyoto during autumn..."
                                required
                                className="block w-full pl-11 pr-4 py-4 border border-gray-300 dark:border-zinc-700 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium"
                            />
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading || !topic.trim()}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl transition-all disabled:opacity-70 shadow-lg shadow-purple-500/25"
                    >
                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-5 h-5" /> Generate Hashtags</>}
                    </button>
                </form>

                {error && (
                    <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}
            </motion.div>

            <AnimatePresence>
                {result && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-purple-900/30 rounded-3xl p-8 shadow-xl relative"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                                <Sparkles className="w-5 h-5 text-purple-500" />
                                Your Viral Tags
                            </h3>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold rounded-xl transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied!" : "Copy All"}
                            </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {result.map((tag, i) => (
                                <span 
                                    key={i} 
                                    className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 font-medium rounded-lg border border-gray-200 dark:border-zinc-700 hover:border-purple-300 hover:text-purple-600 transition-colors cursor-default"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
