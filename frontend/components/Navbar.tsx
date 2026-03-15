/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { toolsConfig } from '@/config/tools';

export const Navbar = ({ dict }: { dict?: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    const results = query.length > 1
        ? toolsConfig.filter(t =>
            t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.category.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 5)
        : [];

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setShowResults(false);
            setQuery('');
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-gray-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/icon.png" alt="Kliptify" width={28} height={28} className="rounded-md" priority />
                            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                                Kliptify
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/category/download" className="text-sm font-medium hover:text-purple-600 transition-colors">{dict?.navigation?.tools || 'Downloaders'}</Link>
                        <Link href="/category/image" className="text-sm font-medium hover:text-purple-600 transition-colors">Image</Link>
                        <Link href="/category/video" className="text-sm font-medium hover:text-purple-600 transition-colors">Video</Link>
                        <Link href="/category/creator" className="text-sm font-medium hover:text-purple-600 transition-colors">Creator</Link>
                        <Link href="/category/ai" className="text-sm font-medium hover:text-purple-600 transition-colors">AI Tools</Link>
                        <Link href="/tools/batch-downloader" className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 dark:bg-purple-900/30 px-3 py-1.5 rounded-full">Batch ⚡</Link>
                        <Link href="/blog" className="text-sm font-medium hover:text-purple-600 transition-colors">{dict?.navigation?.blog || 'Blog'}</Link>

                        {/* Live Search */}
                        <div className="relative" ref={searchRef}>
                            <form onSubmit={handleSearch}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={e => { setQuery(e.target.value); setShowResults(true); }}
                                        onFocus={() => setShowResults(true)}
                                        placeholder="Search tools..."
                                        className="block w-48 pl-10 pr-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-full leading-5 bg-gray-50 dark:bg-zinc-900 placeholder-gray-500 focus:outline-none focus:w-64 focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm transition-all duration-300"
                                    />
                                </div>
                            </form>

                            <AnimatePresence>
                                {showResults && results.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-xl overflow-hidden z-50"
                                    >
                                        {results.map(tool => (
                                            <Link
                                                key={tool.slug}
                                                href={`/tools/${tool.slug}`}
                                                onClick={() => { setShowResults(false); setQuery(''); }}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                                            >
                                                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Search className="w-4 h-4 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{tool.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{tool.category}</p>
                                                </div>
                                            </Link>
                                        ))}
                                        <Link
                                            href={`/search?q=${encodeURIComponent(query)}`}
                                            onClick={() => { setShowResults(false); setQuery(''); }}
                                            className="block px-4 py-2 text-sm text-center text-purple-600 font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 border-t border-gray-100 dark:border-zinc-800"
                                        >
                                            See all results →
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-3 space-y-1">
                            <form onSubmit={handleSearch} className="pb-2">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        placeholder="Search tools..."
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-full bg-gray-50 dark:bg-zinc-900 sm:text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    />
                                </div>
                            </form>
                            <Link href="/category/download" className="block px-3 py-2 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900" onClick={() => setIsOpen(false)}>Downloaders</Link>
                            <Link href="/category/image" className="block px-3 py-2 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900" onClick={() => setIsOpen(false)}>Image Tools</Link>
                            <Link href="/category/video" className="block px-3 py-2 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900" onClick={() => setIsOpen(false)}>Video Tools</Link>
                            <Link href="/category/ai" className="block px-3 py-2 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900" onClick={() => setIsOpen(false)}>AI Tools</Link>
                            <Link href="/category/creator" className="block px-3 py-2 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900" onClick={() => setIsOpen(false)}>Creator Tools</Link>
                            <Link href="/tools/batch-downloader" className="block px-3 py-2 rounded-xl text-base font-medium text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20" onClick={() => setIsOpen(false)}>⚡ Batch Downloader</Link>
                            <Link href="/blog" className="block px-3 py-2 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900" onClick={() => setIsOpen(false)}>Blog</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
