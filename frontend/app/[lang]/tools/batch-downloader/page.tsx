import { Metadata } from 'next';
import { BatchDownloaderUI } from '@/components/BatchDownloaderUI';
import { Download, Zap, Shield, List } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Batch Video Downloader — Download Multiple URLs at Once | Klipto',
    description: 'Download up to 10 videos at once from Instagram, TikTok, YouTube, Facebook and more. Free batch downloader with no limits.',
};

const FEATURES = [
    { icon: Download, title: 'Up to 10 URLs at once', desc: 'Queue multiple downloads and process them all with one click.' },
    { icon: Zap, title: 'Fast parallel processing', desc: 'Videos are fetched and processed simultaneously for speed.' },
    { icon: Shield, title: 'No limits, no login', desc: 'Completely free with no signup, no daily cap, no watermarks.' },
    { icon: List, title: 'Quality choices per video', desc: 'Choose your preferred quality for each video individually.' },
];

export default function BatchDownloaderPage() {
    return (
        <div className="w-full flex flex-col items-center">
            {/* Hero */}
            <section className="w-full relative py-16 overflow-hidden flex justify-center px-4">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-zinc-950" />
                <div className="max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
                        Batch Video Downloader
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                        Add up to 10 URLs from any platform and download them all at once. No limits, no login.
                    </p>
                    <BatchDownloaderUI />
                </div>
            </section>

            {/* Features */}
            <section className="w-full max-w-4xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">Why Use Batch Downloader?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {FEATURES.map((f) => (
                        <div key={f.title} className="flex gap-4 p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm">
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-xl h-fit flex-shrink-0">
                                <f.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{f.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-zinc-400">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
