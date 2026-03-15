"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    title?: string;
    description?: string;
    sourceTool: string;
}

export const LeadCaptureModal = ({
    isOpen,
    onClose,
    onSuccess,
    title = "Unlock Your Results",
    description = "Enter your email to get your AI generated content and stay updated on our latest creator tools.",
    sourceTool
}: LeadCaptureModalProps) => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        setError(null);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const res = await fetch(`${backendUrl}/api/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, sourceTool })
            });

            if (!res.ok) {
                throw new Error("Failed to subscribe");
            }

            setIsSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 1000);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-zinc-800"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center mt-4">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6">
                                <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">{description}</p>

                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className="w-full relative">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-4 pr-16 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !email}
                                        className="absolute right-2 top-2 bottom-2 bg-purple-600 hover:bg-purple-700 text-white p-2 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                                    >
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                                    </button>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl flex items-center justify-center gap-3 font-semibold"
                                >
                                    <CheckCircle2 className="w-5 h-5" /> Unlocked Successfully!
                                </motion.div>
                            )}

                            {error && (
                                <p className="text-red-500 text-sm mt-4 font-medium">{error}</p>
                            )}
                            
                            <p className="text-xs text-gray-400 mt-6">
                                We respect your privacy. No spam, ever.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
