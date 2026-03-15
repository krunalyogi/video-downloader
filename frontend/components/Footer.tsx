/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Instagram } from 'lucide-react';

export const Footer = ({ dict }: { dict?: any }) => {
    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 pt-12 pb-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Image src="/icon.png" alt="Kliptify" width={28} height={28} className="rounded-md" />
                            <span className="font-bold text-xl tracking-tight">Kliptify</span>
                        </Link>
                        <p className="text-gray-500 dark:text-zinc-400 text-sm mb-4">
                            {dict?.footer?.description || "The ultimate suite of tools for content creators. Download, edit, and optimize your content for any platform."}
                        </p>
                        <div className="flex gap-4">
                            <a href="https://twitter.com/kliptify" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600"><Twitter className="h-5 w-5" /></a>
                            <a href="https://instagram.com/kliptify" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600"><Instagram className="h-5 w-5" /></a>
                            <a href="https://github.com/kliptify" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600"><Github className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{dict?.footer?.topTools || "Top Tools"}</h3>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-zinc-400">
                            <li><Link href="/tools/instagram-reel-downloader" className="hover:text-purple-600">Instagram Reel Downloader</Link></li>
                            <li><Link href="/tools/tiktok-downloader" className="hover:text-purple-600">TikTok Downloader</Link></li>
                            <li><Link href="/tools/youtube-to-mp3" className="hover:text-purple-600">YouTube to MP3</Link></li>
                            <li><Link href="/tools/facebook-video-downloader" className="hover:text-purple-600">Facebook Downloader</Link></li>
                            <li><Link href="/tools/image-compressor" className="hover:text-purple-600">Image Compressor</Link></li>
                            <li><Link href="/tools/batch-downloader" className="hover:text-purple-600">Batch Downloader</Link></li>
                            <li><Link href="/blog" className="hover:text-purple-600">{dict?.navigation?.blog || "Creator Blog"}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{dict?.navigation?.categories || "Categories"}</h3>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-zinc-400">
                            <li><Link href="/category/download" className="hover:text-purple-600">Downloaders</Link></li>
                            <li><Link href="/category/image" className="hover:text-purple-600">Image Utilities</Link></li>
                            <li><Link href="/category/video" className="hover:text-purple-600">Video Editors</Link></li>
                            <li><Link href="/category/creator" className="hover:text-purple-600">Creator Tools</Link></li>
                            <li><Link href="/category/ai" className="hover:text-purple-600">AI Generators</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{dict?.footer?.company || "Company"}</h3>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-zinc-400">
                            <li><Link href="/about" className="hover:text-purple-600">{dict?.footer?.aboutUs || "About Us"}</Link></li>
                            <li><Link href="/privacy" className="hover:text-purple-600">{dict?.footer?.privacy || "Privacy Policy"}</Link></li>
                            <li><Link href="/terms" className="hover:text-purple-600">{dict?.footer?.terms || "Terms of Service"}</Link></li>
                            <li><Link href="/contact" className="hover:text-purple-600">{dict?.footer?.contact || "Contact Us"}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-3">
                    <p>&copy; {new Date().getFullYear()} Kliptify. All rights reserved.</p>
                    <a
                        href="https://www.buymeacoffee.com/kliptify"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold text-xs px-4 py-2 rounded-full transition-colors"
                    >
                        ☕ {dict?.footer?.support || "Support Kliptify"}
                    </a>
                    <p className="mt-0">{dict?.footer?.builtFor || "Built for creators worldwide."}</p>
                </div>
            </div>
        </footer>
    );
};
