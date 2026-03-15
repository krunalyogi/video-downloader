import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Download, Sparkles, Shield, Globe, Users, Heart } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Klipto | Free Creator Tools for Everyone',
    description: 'Learn about Klipto — our mission to give every content creator access to powerful, professional-grade tools for free.',
    openGraph: {
        title: 'About Klipto | Free Creator Tools for Everyone',
        description: 'We believe premium creator tools should be free for everyone.',
    }
};

const stats = [
    { icon: Download, value: '50M+', label: 'Downloads Processed' },
    { icon: Globe, value: '20+', label: 'Platforms Supported' },
    { icon: Users, value: '100K+', label: 'Monthly Creators' },
    { icon: Heart, value: '4.8/5', label: 'Average Rating' },
];

const values = [
    { icon: Shield, title: 'Privacy First', description: 'We never store your files or personal data. Everything is processed in memory and discarded instantly after use.' },
    { icon: Zap, title: 'Always Free', description: 'Every tool on Klipto is 100% free. No subscriptions, no credits, no watermarks on our end. We are supported by ads, not by you.' },
    { icon: Sparkles, title: 'AI-Powered', description: 'We integrate cutting-edge AI to provide intelligent tools like caption generation and hashtag optimization that grow with you.' },
    { icon: Globe, title: 'Multi-Platform', description: 'From Instagram to Reddit, TikTok to Vimeo — we support 20+ social platforms so you always have one place to go.' },
];

export default function AboutPage() {
    return (
        <div className="w-full flex flex-col items-center">
            {/* Hero */}
            <section className="w-full relative py-20 overflow-hidden flex justify-center px-4">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-white to-white dark:from-purple-900/20 dark:via-zinc-950 dark:to-zinc-950" />
                <div className="max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold rounded-full px-4 py-1.5 mb-6">
                        <Zap className="w-4 h-4" />
                        Our Story
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-400 dark:to-white">
                        Built for Creators, By Creators
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Klipto was born from a simple frustration: why do basic creator tools cost money, demand sign-ups, or bury downloads behind paywalls? We decided to fix that.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="w-full max-w-5xl mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-sm">
                            <stat.icon className="w-6 h-6 text-purple-600 mx-auto mb-3" />
                            <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-500 dark:text-zinc-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission */}
            <section className="w-full max-w-4xl mx-auto px-4 py-16">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-10 text-white text-center">
                    <h2 className="text-3xl font-extrabold mb-4">Our Mission</h2>
                    <p className="text-lg text-purple-100 max-w-2xl mx-auto">
                        To democratize content creation by giving every person — from a student to a professional — access to the same powerful tools that used to cost hundreds of dollars per month. Forever free. No limits.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="w-full max-w-5xl mx-auto px-4 pb-20">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">What We Stand For</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map((v) => (
                        <div key={v.title} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-8 shadow-sm flex gap-5">
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-xl h-fit">
                                <v.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                                <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">{v.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="w-full bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-200 dark:border-zinc-800 py-16 text-center px-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to get started?</h2>
                <p className="text-gray-500 dark:text-zinc-400 mb-8 max-w-md mx-auto">Explore all our free tools and see why 100,000+ creators choose Klipto every month.</p>
                <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-xl transition-all">
                    <Zap className="w-5 h-5" />
                    Explore All Tools
                </Link>
            </section>
        </div>
    );
}
