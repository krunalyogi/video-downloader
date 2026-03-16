"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Link as LinkIcon, Loader2, Download, AlertCircle, Clipboard, CheckCircle2 } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";

interface DownloadResult {
    platform: string;
    title: string;
    thumbnail: string;
    formats: { quality: string; type: string; url: string; label: string; filesize?: number | null }[];
}

const SUPPORTED_PLATFORMS = "YouTube, Instagram, TikTok, Twitter/X, Facebook, Reddit, Pinterest, Vimeo, Twitch, Snapchat, Dailymotion, SoundCloud";

export const DownloaderInput = () => {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [slowWarning, setSlowWarning] = useState(false);
    const [result, setResult] = useState<DownloadResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [clipboardHint, setClipboardHint] = useState(false);
    const [pasted, setPasted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setIsLoading(true);
        setLoadingMessage("Connecting to server...");
        setResult(null);
        setError(null);
        setSlowWarning(false);

        // Rotating messages to keep users engaged during yt-dlp fetches
        const messages = [
            "Connecting to server...",
            "Extracting video metadata...",
            "Bypassing restrictions...",
            "Parsing media formats...",
            "Finalizing download links..."
        ];
        let msgIndex = 0;
        const msgInterval = setInterval(() => {
            msgIndex = (msgIndex + 1) % messages.length;
            setLoadingMessage(messages[msgIndex]);
        }, 1500);

        // Advisory fix: show a slow warning after 8 seconds
        const slowTimer = setTimeout(() => setSlowWarning(true), 8000);

        try {
            const response = await fetch("/api/download", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            });

            clearInterval(msgInterval);
            clearTimeout(slowTimer);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to download");
            }

            setResult(data);
        } catch (err: unknown) {
            clearInterval(msgInterval);
            clearTimeout(slowTimer);
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setIsLoading(false);
            setLoadingMessage("");
            setSlowWarning(false);
        }
    };

    // Clipboard Detection - auto-paste URL on page focus
    const checkClipboard = useCallback(async () => {
        try {
            if (!navigator.clipboard || !navigator.clipboard.readText) return;
            const text = await navigator.clipboard.readText();
            if (text && (text.startsWith('http://') || text.startsWith('https://')) && !url) {
                setClipboardHint(true);
            }
        } catch {
            // Silently fail if clipboard permission denied
        }
    }, [url]);

    useEffect(() => {
        window.addEventListener('focus', checkClipboard);
        checkClipboard();
        return () => window.removeEventListener('focus', checkClipboard);
    }, [checkClipboard]);

    const pasteFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                setUrl(text);
                setPasted(true);
                setClipboardHint(false);
                setTimeout(() => setPasted(false), 3000);
            }
        } catch {
            inputRef.current?.focus();
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="w-full max-w-3xl mx-auto"
            >
                <div className="relative flex items-center shadow-2xl rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 focus-within:ring-2 focus-within:ring-purple-500 transition-all overflow-hidden p-2">
                    <div className="pl-4 pr-2 text-gray-400">
                        <LinkIcon className="w-6 h-6" />
                    </div>
                    <input
                        ref={inputRef}
                        type="url"
                        required
                        placeholder="Paste URL from Instagram, TikTok, YouTube, Facebook..."
                        value={url}
                        onChange={(e) => { setUrl(e.target.value); setClipboardHint(false); }}
                        className="flex-1 min-w-0 bg-transparent py-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none text-base sm:text-lg"
                    />
                    {clipboardHint && !url && (
                        <button
                            type="button"
                            onClick={pasteFromClipboard}
                            className="hidden sm:flex items-center gap-1 text-xs text-purple-600 font-semibold bg-purple-50 dark:bg-purple-900/30 px-3 py-1.5 rounded-lg mr-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors whitespace-nowrap"
                        >
                            {pasted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
                            {pasted ? 'Pasted!' : 'Paste URL'}
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading || !url}
                        className="ml-2 flex flex-shrink-0 items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <span className="hidden sm:inline">Download</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>
                <div className="h-6 mt-4">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key={loadingMessage}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="flex flex-col items-center gap-1"
                            >
                                <p className="text-center text-sm font-medium text-purple-600 dark:text-purple-400 flex items-center justify-center gap-2">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> {loadingMessage}
                                </p>
                                {slowWarning && (
                                    <p className="text-center text-xs text-amber-500 dark:text-amber-400 animate-pulse">
                                        ⏳ This is taking longer than usual — still working...
                                    </p>
                                )}
                            </motion.div>
                        ) : (
                            <motion.p 
                                key="supported"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="text-center text-sm text-gray-500"
                            >
                                Supports {SUPPORTED_PLATFORMS}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </motion.form>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50 flex items-center gap-3 w-full max-w-2xl"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden w-full max-w-3xl flex flex-col md:flex-row"
                    >
                        <div className="w-full md:w-1/3 bg-gray-100 dark:bg-zinc-800 relative min-h-[200px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={result.thumbnail}
                                alt={result.title}
                                referrerPolicy="no-referrer"
                                className="object-cover w-full h-full absolute inset-0"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2.5 py-1 text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-md">
                                    {result.platform}
                                </span>
                            </div>
                            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6 line-clamp-2">
                                {result.title}
                            </h3>

                            <div className="flex flex-col gap-3">
                                {result.formats.map((format, idx) => {
                                    const extension = format.type.split('/')[1] || 'mp4';
                                    const cleanTitle = result.title.replace(/[^a-zA-Z0-9 -]/g, '').slice(0, 50).trim();
                                    const filename = `${cleanTitle}.${extension}`;
                                    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';
                                    const downloadUrl = `${backendUrl}/api/proxy-stream?url=${encodeURIComponent(format.url)}&filename=${encodeURIComponent(filename)}`;

                                    return (
                                        <a
                                            key={idx}
                                            href={downloadUrl}
                                            className="flex justify-between items-center w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700 rounded-lg transition-colors group text-left max-w-full"
                                        >
                                            <span className="font-medium text-gray-700 dark:text-gray-300 truncate pr-2">
                                                {format.quality} <span className="text-gray-400 dark:text-gray-500 text-xs ml-1">({format.type}{format.filesize ? ` · ${(format.filesize / (1024 * 1024)).toFixed(1)} MB` : ''})</span>
                                            </span>
                                            <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold group-hover:underline text-sm flex-shrink-0">
                                                <Download className="w-4 h-4" />
                                                {format.label}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AdSlot slotId="downloader_bottom_1" className="mt-8" />
        </div>
    );
};
