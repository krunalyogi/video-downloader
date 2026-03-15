"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, Loader2, AlertCircle, Settings2, Trash2 } from "lucide-react";
import { io } from "socket.io-client";
import { AdSlot } from "@/components/AdSlot";
import JSZip from "jszip";

interface CompressorResult {
    dataUrl: string;
    name: string;
    savingsPercentage: string;
    originalSize: number;
    newSize: number;
    format: string;
}

export const ImageCompressorUI = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [quality, setQuality] = useState(80);
    const [format, setFormat] = useState("webp");

    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("");
    const [results, setResults] = useState<CompressorResult[]>([]);
    const [error, setError] = useState<string | null>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            
            // Limit to 20 files at once to prevent browser crash
            if (selectedFiles.length > 20) {
                setError("Please upload a maximum of 20 images at a time.");
                return;
            }

            setFiles(selectedFiles);
            setPreviews(selectedFiles.map(f => URL.createObjectURL(f)));
            setResults([]);
            setError(null);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
        // Also remove from results if they exist to keep parity
        if (results.length > 0) {
             setResults(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setIsLoading(true);
        setProgress(0);
        setStatusText(`Initializing batch of ${files.length} images...`);
        setError(null);
        setResults([]);

        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const newResults: CompressorResult[] = [];
        
        try {
            // Process sequentially to not overload socket/server memory on large batches
            for (let i = 0; i < files.length; i++) {
                const f = files[i];
                setStatusText(`Compressing ${i + 1} of ${files.length}: ${f.name}`);
                setProgress(Math.round((i / files.length) * 100));

                const formData = new FormData();
                formData.append("image", f);
                formData.append("quality", quality.toString());
                formData.append("format", format);

                const response = await fetch(`${backendUrl}/api/image/compress`, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.error || `Failed to compress ${f.name}`);

                // If sync processed, it returns result directly
                if (data.result) {
                    newResults.push(data.result);
                } 
                // If async (BullMQ), we await socket resolution
                else if (data.jobId) {
                    await new Promise<void>((resolve, reject) => {
                        const socket = io(backendUrl);
                        socket.on("connect", () => socket.emit("subscribe_job", data.jobId));
                        
                        socket.on("progress", (event: { progress: number, status: string, resultData?: CompressorResult }) => {
                            if (event.progress === 100 && event.resultData) {
                                newResults.push(event.resultData);
                                socket.disconnect();
                                resolve();
                            }
                        });

                        setTimeout(() => {
                            socket.disconnect();
                            reject(new Error(`Timeout processing ${f.name}`));
                        }, 30000);
                    });
                }
            }

            setResults(newResults);
            setProgress(100);
            setStatusText("All images compressed!");

        } catch (err: unknown) {
             setError(err instanceof Error ? err.message : "An error occurred during batch processing");
        } finally {
             setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        if (results.length === 0) return;

        if (results.length === 1) {
            // Single download
            const link = document.createElement("a");
            link.href = results[0].dataUrl;
            link.download = results[0].name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            // Batch Zip download
            const zip = new JSZip();
            results.forEach((res) => {
                // Remove data URL prefix
                const base64Data = res.dataUrl.split(',')[1];
                zip.file(res.name, base64Data, { base64: true });
            });

            const content = await zip.generateAsync({ type: "blob" });
            const url = URL.createObjectURL(content);
            const link = document.createElement("a");
            link.href = url;
            link.download = "kliptify_compressed_images.zip";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl"
            >
                {/* Upload Zone */}
                {files.length === 0 ? (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-2xl cursor-pointer bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-12 h-12 text-gray-400 group-hover:text-purple-500 mb-4 transition-colors" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold group-hover:text-purple-500">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WebP (Up to 20 files)</p>
                        </div>
                        <input type="file" multiple className="hidden" accept="image/png, image/jpeg, image/webp" onChange={onFileChange} />
                    </label>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            {/* Previews Grid */}
                            <div className="flex-shrink-0 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto max-h-64 overflow-y-auto pr-2 rounded-xl">
                                <label className="min-w-24 h-24 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:text-purple-500 hover:border-purple-300 bg-gray-50 dark:bg-zinc-800/50">
                                   <Upload className="w-6 h-6 mb-1" />
                                   <span className="text-[10px] font-medium uppercase">Add More</span>
                                   <input type="file" multiple className="hidden" accept="image/png, image/jpeg, image/webp" onChange={(e) => {
                                       if(e.target.files) {
                                          const newArr = [...files, ...Array.from(e.target.files)].slice(0, 20);
                                          setFiles(newArr);
                                          setPreviews(newArr.map(f => URL.createObjectURL(f)));
                                       }
                                   }} />
                                </label>
                                {previews.map((src, i) => (
                                    <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 group">
                                        <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                        <button onClick={() => removeFile(i)} className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
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
                                onClick={() => { setFiles([]); setPreviews([]); setResults([]); }}
                                className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                            >
                                Clear All
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

                {!isLoading && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-3xl bg-[#f8fbfa] dark:bg-[#121c17] border border-emerald-100 dark:border-emerald-900/30 rounded-3xl overflow-hidden shadow-lg p-8 flex flex-col md:flex-row items-center gap-8"
                    >
                        <div className="flex-1 w-full text-center md:text-left">
                            <div className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-bold text-sm rounded-full mb-4">
                                {results.length} Images Compressed!
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                                {results.reduce((total, r) => total + parseFloat(r.savingsPercentage), 0) / results.length | 0}% Avg Saved.
                            </h3>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-gray-500 dark:text-gray-400 font-medium mt-4">
                                <div className="line-through">
                                    {(results.reduce((t, r) => t + r.originalSize, 0) / 1024 / 1024).toFixed(2)} MB Total
                                </div>
                                <div>→</div>
                                <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                                    {(results.reduce((t, r) => t + r.newSize, 0) / 1024 / 1024).toFixed(2)} MB Total
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-auto flex flex-col items-center gap-3 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-emerald-50 dark:border-emerald-900/10">
                            <div className="flex -space-x-4">
                               {results.slice(0, 3).map((r, i) => (
                                   <img key={i} src={r.dataUrl} alt="Compressed" className="w-16 h-16 object-cover rounded-full border-4 border-white dark:border-zinc-900 shadow-sm" />
                               ))}
                               {results.length > 3 && (
                                   <div className="w-16 h-16 rounded-full border-4 border-white dark:border-zinc-900 bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shadow-sm">
                                       +{results.length - 3}
                                   </div>
                               )}
                            </div>
                            <button
                                onClick={handleDownload}
                                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-emerald-500/20 mt-2"
                            >
                                <Download className="w-5 h-5" /> {results.length === 1 ? 'Download PNG' : 'Download ZIP'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AdSlot slotId="image_compressor_bottom" />
        </div>
    );
};
