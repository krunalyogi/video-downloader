import Link from "next/link";
import { Zap, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="w-20 h-20 bg-purple-50 dark:bg-purple-900/20 rounded-3xl flex items-center justify-center mb-6">
                <Zap className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-6xl font-black text-gray-900 dark:text-white mb-2">404</h1>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Page not found</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-10">
                The page you&apos;re looking for doesn&apos;t exist. Try browsing all our creator tools instead.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                    Go Home
                </Link>
                <Link
                    href="/search"
                    className="px-6 py-3 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                >
                    <Search className="w-4 h-4" /> Search Tools
                </Link>
            </div>
        </div>
    );
}
