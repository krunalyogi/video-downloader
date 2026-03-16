"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Download, Loader2, Link as LinkIcon, CheckCircle, AlertCircle, X } from "lucide-react";

interface BatchJob {
    id: string;
    url: string;
    status: 'pending' | 'loading' | 'done' | 'error';
    result?: { title: string; platform: string; formats: { quality: string; type: string; url: string; label: string }[] };
    error?: string;
}

export const BatchDownloaderUI = () => {
    const [jobs, setJobs] = useState<BatchJob[]>([{ id: '1', url: '', status: 'pending' }]);
    const [isProcessing, setIsProcessing] = useState(false);
    const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

    const addRow = () => {
        const newId = Date.now().toString();
        setJobs(prev => [...prev, { id: newId, url: '', status: 'pending' }]);
        setTimeout(() => inputRefs.current[newId]?.focus(), 50);
    };

    const removeRow = (id: string) => {
        setJobs(prev => prev.filter(j => j.id !== id));
    };

    const updateUrl = (id: string, url: string) => {
        setJobs(prev => prev.map(j => j.id === id ? { ...j, url } : j));
    };

    const processAll = async () => {
        const validJobs = jobs.filter(j => j.url.trim());
        if (validJobs.length === 0) return;

        setIsProcessing(true);
        setJobs(prev => prev.map(j => j.url.trim() ? { ...j, status: 'loading' } : j));

        for (const job of validJobs) {
            try {
                const res = await fetch('/api/download', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: job.url }),
                });
                // Issue #5 Fix: safe JSON parse to avoid SyntaxError on server timeouts
                const text = await res.text();
                let data;
                try { data = JSON.parse(text); }
                catch { throw new Error('Server returned an unexpected response. Please try again.'); }
                if (!res.ok) throw new Error(data?.error || 'Failed');
                setJobs(prev => prev.map(j => j.id === job.id ? { ...j, status: 'done', result: data } : j));
            } catch (err) {
                setJobs(prev => prev.map(j => j.id === job.id ? { ...j, status: 'error', error: err instanceof Error ? err.message : 'Error' } : j));
            }
        }
        setIsProcessing(false);
    };

    const clearAll = () => {
        setJobs([{ id: Date.now().toString(), url: '', status: 'pending' }]);
    };

    const pendingCount = jobs.filter(j => j.url.trim()).length;
    const doneCount = jobs.filter(j => j.status === 'done').length;

    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Batch Downloader</h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Add multiple URLs and download them all at once</p>
                </div>
                {jobs.length > 1 && (
                    <button onClick={clearAll} className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1">
                        <X className="w-4 h-4" /> Clear all
                    </button>
                )}
            </div>

            {/* URL Input Rows */}
            <div className="space-y-3 mb-4">
                <AnimatePresence>
                    {jobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-start gap-3"
                        >
                            <div className="flex-1">
                                <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 transition-colors ${
                                    job.status === 'error' ? 'border-red-300 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10' :
                                    job.status === 'done' ? 'border-green-300 dark:border-green-900/50 bg-green-50 dark:bg-green-900/10' :
                                    'border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500'
                                }`}>
                                    <span className="text-xs font-bold text-gray-300 dark:text-zinc-600 w-5 text-center">{index + 1}</span>
                                    <LinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <input
                                        ref={el => { inputRefs.current[job.id] = el; }}
                                        type="url"
                                        value={job.url}
                                        onChange={e => updateUrl(job.id, e.target.value)}
                                        placeholder="Paste URL from Instagram, TikTok, YouTube..."
                                        disabled={job.status === 'loading' || job.status === 'done'}
                                        className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none disabled:opacity-50"
                                    />
                                    {job.status === 'loading' && <Loader2 className="w-4 h-4 text-purple-500 animate-spin flex-shrink-0" />}
                                    {job.status === 'done' && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                                    {job.status === 'error' && <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                                </div>

                                {/* Results */}
                                {job.status === 'done' && job.result && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 pl-9">
                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 truncate">{job.result.title}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {job.result.formats.slice(0, 3).map((fmt, fi) => {
                                                const ext = fmt.type.split('/')[1] || 'mp4';
                                                const cleanTitle = job.result!.title.replace(/[^a-zA-Z0-9 -]/g, '').slice(0, 50).trim();
                                                const filename = `${cleanTitle}.${ext}`;
                                                const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';
                                                const dlUrl = `${backendUrl}/api/proxy-stream?url=${encodeURIComponent(fmt.url)}&filename=${encodeURIComponent(filename)}`;
                                                return (
                                                    <a key={fi} href={dlUrl}
                                                        className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 rounded-lg px-3 py-1.5 hover:bg-purple-100 transition-colors">
                                                        <Download className="w-3 h-3" />
                                                        {fmt.quality} ({fmt.label})
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                                {job.status === 'error' && (
                                    <p className="text-xs text-red-500 mt-1 pl-9">{job.error}</p>
                                )}
                            </div>

                            {jobs.length > 1 && (
                                <button onClick={() => removeRow(job.id)} disabled={job.status === 'loading'}
                                    className="mt-3 text-gray-300 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-500 transition-colors disabled:opacity-30">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Add Row */}
            <button onClick={addRow} disabled={isProcessing || jobs.length >= 10}
                className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-200 dark:border-zinc-700 rounded-xl text-sm text-gray-400 hover:border-purple-400 hover:text-purple-600 dark:hover:border-purple-800 transition-colors disabled:opacity-40 mb-6">
                <Plus className="w-4 h-4" /> Add another URL {jobs.length >= 10 && '(max 10)'}
            </button>

            {/* Progress */}
            {isProcessing && (
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                        <span>Processing...</span>
                        <span>{doneCount}/{pendingCount}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(doneCount / pendingCount) * 100}%` }} />
                    </div>
                </div>
            )}

            {/* Action Button */}
            <button
                onClick={processAll}
                disabled={isProcessing || pendingCount === 0}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing {doneCount}/{pendingCount}...</>
                ) : (
                    <><Download className="w-5 h-5" /> Download All ({pendingCount} URL{pendingCount !== 1 ? 's' : ''})</>
                )}
            </button>
        </div>
    );
};
