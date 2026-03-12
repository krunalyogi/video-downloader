"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, Loader2, AlertCircle, Settings2 } from "lucide-react";
import { io } from "socket.io-client";
import { AdSlot } from "@/components/AdSlot";

interface CompressorResult {
    dataUrl: string;
    name: string;
    savingsPercentage: string;
    originalSize: number;
    newSize: number;
    format: string;
}

export const ImageCompressorUI = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [quality, setQuality] = useState(80);
    const [format, setFormat] = useState("webp");

    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("");
    const [result, setResult] = useState<CompressorResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsLoading(true);
        setProgress(0);
        setStatusText("Initializing job queue...");
        setError(null);

        const formData = new FormData();
        formData.append("image", file);
        formData.append("quality", quality.toString());
        formData.append("format", format);

        try {
            // Send directly to backend via relative proxy proxy or full URL
            // using the backend URL we permitted in CORS
            const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

            const response = await fetch(`${backendUrl}/api/image/compress`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to compress image");
            }

            // Connect to WebSocket using the Job ID returned from the queue
            if (data.jobId) {
                const socket = io(backendUrl);

                socket.on("connect", () => {
                    socket.emit("subscribe_job", data.jobId);
                });

                socket.on("progress", (event: { progress: number, status: string, resultData?: CompressorResult }) => {
                    setProgress(event.progress);
                    setStatusText(event.status.charAt(0).toUpperCase() + event.status.slice(1));

                    if (event.progress === 100 && event.resultData) {
                        setResult(event.resultData);
                        setIsLoading(false);
                        socket.disconnect();
                    }
                });

                // Fail-safe timeout if socket hangs
                setTimeout(() => {
                    if (isLoading) {
                        socket.disconnect();
                        setError("Processing timed out. Please try again.");
                        setIsLoading(false);
                    }
                }, 30000); // 30s timeout for image compression
            }

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
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
                className="w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl"
            >
                {/* Upload Zone */}
                {!file ? (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-2xl cursor-pointer bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-12 h-12 text-gray-400 group-hover:text-purple-500 mb-4 transition-colors" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold group-hover:text-purple-500">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WebP (MAX. 10MB)</p>
                        </div>
                        <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={onFileChange} />
                    </label>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            {/* Preview */}
                            <div className="w-48 h-48 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={preview!} alt="Preview" className="w-full h-full object-cover" />
                            </div>

                            {/* Controls */}
                            <div className="flex-1 w-full space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                            <Settings2 className="w-4 h-4" /> Compression Quality
                                        </label>
                                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{quality}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1" max="100"
                                        value={quality}
                                        onChange={(e) => setQuality(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 accent-purple-600"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                                        Output Format
                                    </label>
                                    <div className="flex gap-3">
                                        {['webp', 'jpeg', 'png'].map(ext => (
                                            <button
                                                key={ext}
                                                onClick={() => setFormat(ext)}
                                                className={`flex-1 py-2 text-sm font-semibold rounded-lg border transition-all ${format === ext
                                                    ? 'bg-purple-100 dark:bg-purple-900/40 border-purple-500 text-purple-700 dark:text-purple-400'
                                                    : 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:border-purple-300'
                                                    }`}
                                            >
                                                {ext.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
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
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-70"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Compress Image"}
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full max-w-3xl overflow-hidden"
                    >
                        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm text-center">
                            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                                {statusText}
                            </h3>

                            <div className="w-full h-4 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <p className="text-right text-sm font-medium text-gray-400 mt-2">{progress}%</p>
                        </div>
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full max-w-3xl p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50 flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </motion.div>
                )}

                {!isLoading && result && result.format && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-3xl bg-[#f8fbfa] dark:bg-[#121c17] border border-emerald-100 dark:border-emerald-900/30 rounded-3xl overflow-hidden shadow-lg p-8 flex flex-col md:flex-row items-center gap-8"
                    >
                        <div className="flex-1 w-full text-center md:text-left">
                            <div className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-bold text-sm rounded-full mb-4">
                                Processing Complete!
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                                {result.savingsPercentage}% Saved.
                            </h3>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-gray-500 dark:text-gray-400 font-medium mt-4">
                                <div className="line-through">
                                    {(result.originalSize / 1024).toFixed(1)} KB
                                </div>
                                <div>→</div>
                                <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                                    {(result.newSize / 1024).toFixed(1)} KB
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-auto flex flex-col items-center gap-3 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-emerald-50 dark:border-emerald-900/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={result.dataUrl} alt="Compressed Result" className="w-32 h-32 object-contain rounded-lg border border-gray-100 dark:border-zinc-800" />
                            <button
                                onClick={handleDownload}
                                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-emerald-500/20"
                            >
                                <Download className="w-5 h-5" /> Download New File
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AdSlot slotId="image_compressor_bottom" />
        </div>
    );
};
