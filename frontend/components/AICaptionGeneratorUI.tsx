"use client";

import { useState, useEffect } from "react";
import { Sparkles, Loader2, Copy, Check, Hash } from "lucide-react";
import { motion } from "framer-motion";
import { AdSlot } from "@/components/AdSlot";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";

export const AICaptionGeneratorUI = () => {
    const [topic, setTopic] = useState("");
    const [platform, setPlatform] = useState("instagram");
    const [tone, setTone] = useState("engaging");

    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<{ caption: string, hashtags: string[] } | null>(null);
    const [copied, setCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasSubscribed, setHasSubscribed] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHasSubscribed(!!localStorage.getItem("kliptify_subscribed"));
        }
    }, []);

    const handleGenerate = () => {
        if (!topic) return;
        
        if (!hasSubscribed) {
            setIsModalOpen(true);
            return;
        }

        executeGeneration();
    };

    const handleModalSuccess = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("kliptify_subscribed", "true");
        }
        setHasSubscribed(true);
        setIsModalOpen(false);
        executeGeneration();
    };

    const executeGeneration = async () => {
        setIsGenerating(true);
        setResult(null);
        setError(null);

        try {
            // Fix: corrected port fallback from 5000 → 5002
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'}/api/ai/captions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic, platform, tone })
            });
            // Fix: safe JSON parse
            const text = await res.text();
            let data;
            try { data = JSON.parse(text); }
            catch { throw new Error('The AI service returned an unexpected response. Please try again.'); }

            if (data.success) {
                setResult(data.result);
            } else {
                // Fix: replaced alert() with proper error state
                setError(data.error || "Failed to generate caption. Please try again.");
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        if (!result) return;
        const fullText = `${result.caption}\n\n${result.hashtags.join(" ")}`;
        navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Sparkles className="w-48 h-48 text-purple-500" />
                </div>

                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" /> AI Prompt Configuration
                </h3>

                <div className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What&apos;s your post about?</label>
                        <textarea
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white"
                            placeholder="e.g., A beautiful sunset at the Grand Canyon during a summer road trip"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Platform</label>
                            <select
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white"
                            >
                                <option value="instagram">Instagram</option>
                                <option value="tiktok">TikTok</option>
                                <option value="youtube">YouTube Shorts</option>
                                <option value="twitter">X / Twitter</option>
                                <option value="linkedin">LinkedIn</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tone/Vibe</label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white"
                            >
                                <option value="engaging">Engaging & Questioning</option>
                                <option value="funny">Funny & Witty</option>
                                <option value="professional">Professional / Corporate</option>
                                <option value="inspirational">Inspirational / Deep</option>
                                <option value="minimalist">Minimalist (Short)</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !topic.trim()}
                        className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                    >
                        {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                        {isGenerating ? "Generating Magic..." : "Generate Caption"}
                    </button>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50 flex items-center gap-3"
                >
                    <span className="text-sm">{error}</span>
                </motion.div>
            )}

            {/* Result Area */}
            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-900/50 rounded-3xl p-6 sm:p-10 shadow-sm relative"
                >
                    <button
                        onClick={handleCopy}
                        className="absolute top-6 right-6 p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>

                    <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Your Generated Caption</h3>

                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg whitespace-pre-wrap mb-6 text-gray-800 dark:text-gray-200">{result.caption}</p>

                        {/* Character counter — helps users stay within platform limits */}
                        <p className="text-xs text-gray-400 dark:text-zinc-500 mb-4">
                            {result.caption.length} characters
                            {platform === 'twitter' && result.caption.length > 280 && <span className="ml-2 text-red-500 font-semibold">⚠ Exceeds X/Twitter 280 char limit</span>}
                            {platform === 'instagram' && result.caption.length > 2200 && <span className="ml-2 text-red-500 font-semibold">⚠ Exceeds Instagram 2200 char limit</span>}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-6">
                            {result.hashtags.map((tag, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-white dark:bg-zinc-800 border border-purple-200 dark:border-purple-800 rounded-full text-sm font-medium text-purple-700 dark:text-purple-400 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                                    onClick={() => navigator.clipboard.writeText(tag)}
                                    title="Click to copy"
                                >
                                    <Hash className="w-3 h-3" /> {tag.replace('#', '')}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Click any hashtag to copy it individually</p>
                    </div>
                </motion.div>
            )}

            <LeadCaptureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleModalSuccess}
                sourceTool="ai-caption-generator"
                title="Unlock AI Generation"
                description="Enter your email to unlock unlimited AI caption generations and get our weekly growth tips!"
            />

            <AdSlot slotId="ai_caption_bottom" />
        </div>
    );
};
