"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, Loader2, AlertCircle, Scissors } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";

export const BackgroundRemoverUI = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ dataUrl: string; name: string; size: number } | null>(null);
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

    const handleRemove = async () => {
        if (!file) return;
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
            // Issue B Fix: prevent indefinite spinner if backend hangs
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 60000);
            try {
                const response = await fetch(`${backendUrl}/api/image/remove-bg`, {
                    method: "POST",
                    body: formData,
                    signal: controller.signal,
                });
                clearTimeout(timeout);

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.error || "Failed to remove background");
                }

                setResult(data.result);
            } catch (fetchError: unknown) {
                clearTimeout(timeout); // Ensure timeout is cleared even if fetch fails
                if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
                    throw new Error("Request timed out after 60 seconds. Please try again.");
                }
                throw fetchError; // Re-throw other fetch errors to outer catch
            }
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
                className="w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl"
            >
                {!file ? (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-2xl cursor-pointer bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-12 h-12 text-gray-400 group-hover:text-purple-500 mb-4 transition-colors" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold group-hover:text-purple-500">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WebP (MAX. 10MB)</p>
                        </div>
                        <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={onFileChange} />
                    </label>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            {/* Original Preview */}
                            <div className="flex-shrink-0 text-center">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Original</p>
                                <div className="w-44 h-44 rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={preview!} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="text-2xl text-gray-300 dark:text-zinc-600 font-bold hidden md:block">→</div>

                            {/* Result Preview */}
                            <div className="flex-shrink-0 text-center">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Result</p>
                                <div
                                    className="w-44 h-44 rounded-xl border border-gray-200 dark:border-zinc-700 overflow-hidden"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'16\' height=\'16\' viewBox=\'0 0 16 16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'%23e5e5e5\' d=\'M0 0h8v8H0zm8 8h8v8H8z\'/%3E%3Cpath fill=\'%23f5f5f5\' d=\'M8 0h8v8H8zM0 8h8v8H0z\'/%3E%3C/svg%3E")', backgroundSize: '16px 16px' }}
                                >
                                    {result ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={result.dataUrl} alt="Result" className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            {isLoading
                                                ? <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                                                : <Scissors className="w-8 h-8 text-gray-300 dark:text-zinc-600" />
                                            }
                                        </div>
                                    )}
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
                            {result ? (
                                <button
                                    onClick={handleDownload}
                                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-emerald-500/20"
                                >
                                    <Download className="w-5 h-5" /> Download PNG
                                </button>
                            ) : (
                                <button
                                    onClick={handleRemove}
                                    disabled={isLoading}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-70 shadow-lg"
                                >
                                    {isLoading
                                        ? <><Loader2 className="w-5 h-5 animate-spin" /> Removing background...</>
                                        : <><Scissors className="w-5 h-5" /> Remove Background</>
                                    }
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-3xl p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50 flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <AdSlot slotId="bg_remover_bottom" />
        </div>
    );
};
