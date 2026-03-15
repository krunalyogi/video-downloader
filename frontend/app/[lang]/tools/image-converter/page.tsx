import { toolsConfig } from "@/config/tools";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Image Format Converter — PNG to WebP, JPG to PNG | Klipto',
    description: 'Convert image formats online for free. PNG to WebP, JPG to PNG, HEIC to JPG and more. No upload limit, no quality loss.',
};

const FORMAT_CONVERSIONS = [
    { from: 'PNG', to: 'WebP', benefit: 'Reduce file size by up to 30%' },
    { from: 'JPG', to: 'PNG', benefit: 'Add transparency support' },
    { from: 'JPG', to: 'WebP', benefit: 'Modern format for faster loading' },
    { from: 'PNG', to: 'JPG', benefit: 'Smaller file for photos' },
    { from: 'HEIC', to: 'JPG', benefit: 'Open iPhone photos on any device' },
    { from: 'WebP', to: 'PNG', benefit: 'Full edit compatibility' },
];

export default function ImageConverterPage() {
    return (
        <div className="w-full flex flex-col items-center">
            <section className="w-full relative py-16 overflow-hidden flex justify-center px-4">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50 to-white dark:from-zinc-900 dark:to-zinc-950" />
                <div className="max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
                        Image Format Converter
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                        Convert PNG, JPG, WebP, HEIC and more online for free — in seconds, no software needed.
                    </p>

                    {/* Converter UI */}
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto text-left">
                        <div className="border-2 border-dashed border-gray-200 dark:border-zinc-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-400 transition-colors group mb-6">
                            <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <p className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">Drop your image here</p>
                            <p className="text-sm text-gray-400 dark:text-zinc-500">or click to browse — PNG, JPG, WebP, HEIC supported</p>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Convert from</label>
                                <select className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                    <option>PNG</option><option>JPG</option><option>WebP</option><option>HEIC</option>
                                </select>
                            </div>
                            <div className="mt-6 text-gray-400">→</div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Convert to</label>
                                <select className="w-full border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                    <option>WebP</option><option>PNG</option><option>JPG</option><option>HEIC</option>
                                </select>
                            </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all">
                            Convert Image
                        </button>
                        <p className="text-xs text-center text-gray-400 mt-3">This feature is coming soon — Image Compressor is available now</p>
                    </div>
                </div>
            </section>

            {/* Supported Conversions */}
            <section className="w-full max-w-4xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Supported Conversions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {FORMAT_CONVERSIONS.map((conv) => (
                        <div key={`${conv.from}-${conv.to}`} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-5 flex flex-col gap-2 shadow-sm">
                            <div className="flex items-center gap-3">
                                <span className="font-mono font-bold text-purple-600 text-sm">{conv.from}</span>
                                <span className="text-gray-300 dark:text-zinc-600">→</span>
                                <span className="font-mono font-bold text-pink-600 text-sm">{conv.to}</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-zinc-400">{conv.benefit}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Related Tools */}
            <section className="w-full bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-200 dark:border-zinc-800 py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Other Image Tools</h2>
                    <div className="flex flex-wrap gap-3">
                        {toolsConfig.filter(t => t.category === 'image' && !t.isAlias).map(t => (
                            <Link key={t.slug} href={`/tools/${t.slug}`} className="px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-sm font-medium hover:border-purple-400 hover:text-purple-600 transition-colors">
                                {t.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
