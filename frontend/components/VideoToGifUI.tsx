"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Film, Loader2, Download, AlertCircle } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";

export const VideoToGifUI = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ dataUrl: string; name: string; size: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.size > 20 * 1024 * 1024) {
                setError("File is too large. Max size is 20MB.");
                return;
            }
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("video", file);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const response = await fetch(`${backendUrl}/api/video/gif`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to convert video");
            }

            setResult(data.result);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (!result) return;
        const link = document.createElement("a");
        link.href = result.dataUrl;
        link.download = result.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full flex flex-col items-center gap-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl"
            >
                {!file ? (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-2xl cursor-pointer bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-12 h-12 text-gray-400 group-hover:text-purple-500 mb-4 transition-colors" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold group-hover:text-purple-500">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">MP4, MOV, WEBM (MAX. 20MB)</p>
                        </div>
                        <input type="file" className="hidden" accept="video/mp4, video/quicktime, video/webm" onChange={onFileChange} />
                    </label>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-4">
                            <video src={preview!} controls className="max-h-64 rounded-xl border border-gray-200 dark:border-zinc-700" />
                            <p className="font-semibold text-gray-700 dark:text-gray-300 truncate w-full px-4 text-center">{file.name}</p>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                            <button
                                onClick={() => { setFile(null); setResult(null); }}
                                className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={isLoading}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-70 shadow-lg"
                            >
                                {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing (max 10s)...</> : <><Film className="w-5 h-5" /> Convert to GIF</>}
                            </button>
                        </div>
                    </div>
                )}
                
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
                        className="w-full max-w-2xl bg-[#f8fbfa] dark:bg-[#121c17] border border-emerald-100 dark:border-emerald-900/30 rounded-3xl overflow-hidden shadow-lg p-8 flex flex-col md:flex-row items-center gap-8"
                    >
                        <div className="flex-1 w-full text-center md:text-left">
                            <div className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-bold text-sm rounded-full mb-4">
                                Conversion Complete!
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 truncate" title={result.name}>
                                {result.name}
                            </h3>
                            <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-2">
                                Output Size: {(result.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                        </div>

                        <div className="w-full md:w-auto flex flex-col items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={result.dataUrl} alt="GIF Result" className="w-32 h-32 object-cover rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800" />
                            <button
                                onClick={handleDownload}
                                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-emerald-500/20"
                            >
                                <Download className="w-5 h-5" /> Download GIF
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SEO Text Content */}
            <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-sm text-left mt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Convert Video to GIF Online Free</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Klipto provides the fastest and most secure way to convert your MP4, MOV, or WEBM videos into stunning, looping animated GIFs. Whether you are creating memes, reaction GIFs, or short animations for social media, our free online video to GIF maker handles it all entirely in your browser.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Features of our GIF Converter</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
                    <li><strong>No Watermark:</strong> Your generated GIFs are completely clean and branding-free.</li>
                    <li><strong>Lightning Fast:</strong> Conversion happens in seconds using optimized edge infrastructure.</li>
                    <li><strong>High Quality:</strong> Maintained frame rates and optimized color palettes for the best balance of quality and file size.</li>
                    <li><strong>Secure & Private:</strong> Files are processed securely and discarded immediately. No data is stored.</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Why create animated GIFs?</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    GIFs are the language of the internet. They auto-play everywhere, from Twitter and Reddit to iMessage and Discord. By converting your short video clips into GIFs, you guarantee that your content will be seen instantly without the user needing to press &quot;Play&quot; or unmute their device. Perfect for email newsletters, blog posts, and forum signatures!
                </p>
            </div>

            <AdSlot slotId="video_to_gif_bottom" />
        </div>
    );
};
