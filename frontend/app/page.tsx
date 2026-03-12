import { DownloaderInput } from "@/components/DownloaderInput";
import { ToolCard } from "@/components/ToolCard";
import { toolsConfig } from "@/config/tools";
import { Zap, Sparkles, Video, Image as ImageIcon, Star, Download, Globe, Shield } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";

const TESTIMONIALS = [
  { name: "Sarah M.", handle: "@sarahmakes", avatar: "SM", color: "from-purple-400 to-pink-500", rating: 5, text: "Klipto is literally the fastest downloader I've ever used. Saved 3 years of Instagram content in one afternoon!" },
  { name: "Jake Rivera", handle: "@jakerivera_", avatar: "JR", color: "from-blue-400 to-cyan-500", rating: 5, text: "Finally, a TikTok downloader that actually removes the watermark AND works on iPhone. No other app could do this." },
  { name: "Priya Patel", handle: "@priya.creates", avatar: "PP", color: "from-orange-400 to-red-500", rating: 5, text: "The AI Caption Generator saved me hours every week. My engagement went up 40% after using Klipto captions." },
  { name: "Marcus Chen", handle: "@marcuschen.design", avatar: "MC", color: "from-green-400 to-emerald-500", rating: 5, text: "Background remover works better than Canva Pro and it's completely free. This is insane." },
  { name: "Lana K.", handle: "@lana.digital", avatar: "LK", color: "from-violet-400 to-fuchsia-500", rating: 5, text: "I switched from SnapSave to Klipto and never looked back. More platforms, no watermarks, beautiful design." },
  { name: "Tom Bradley", handle: "@tombradley.yt", avatar: "TB", color: "from-yellow-400 to-orange-500", rating: 5, text: "YouTube to MP3 in 3 seconds flat. No annoying redirects, no fake download buttons. Just works." },
];

export const metadata = {
  title: "Klipto | Free Video Downloader & Creator Tools",
  description: "Download videos from Instagram, TikTok, YouTube, Facebook, Pinterest, Reddit, Vimeo and 20+ platforms. Free, fast, no watermark.",
};

export default function Home() {
  const popularTools = toolsConfig.filter(t => !t.isAlias).slice(0, 6);
  const aiTools = toolsConfig.filter(t => t.category === "ai" && !t.isAlias);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative py-20 lg:py-32 overflow-hidden flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-white to-white dark:from-purple-900/20 dark:via-zinc-950 dark:to-zinc-950"></div>
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-400 dark:to-white">
            The Ultimate Toolkit <br className="hidden md:block" /> for Creators
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Download videos, edit images, and generate AI content in seconds.
            All the tools you need in one powerful platform.
          </p>
          <DownloaderInput />

          {/* Stats Bar */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-6 animate-in fade-in duration-1000 delay-300">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-zinc-300">
              <Download className="w-4 h-4 text-purple-500" />
              <span><strong className="text-gray-900 dark:text-white">50M+</strong> Downloads</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-zinc-300">
              <Globe className="w-4 h-4 text-purple-500" />
              <span><strong className="text-gray-900 dark:text-white">20+</strong> Platforms</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-zinc-300">
              <Shield className="w-4 h-4 text-purple-500" />
              <span><strong className="text-gray-900 dark:text-white">100%</strong> Free &amp; Secure</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-zinc-300">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span><strong className="text-gray-900 dark:text-white">4.8/5</strong> Rating</span>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 animate-in fade-in duration-1000 delay-500">
             <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 dark:text-zinc-400 bg-white/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-full py-2 px-4 w-fit mx-auto shadow-sm">
                <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className={`w-6 h-6 rounded-full border-2 border-white dark:border-zinc-950 bg-gradient-to-br ${['from-purple-400 to-pink-500', 'from-blue-400 to-cyan-500', 'from-orange-400 to-red-500', 'from-green-400 to-emerald-500'][i]}`} />
                    ))}
                </div>
                Trusted by 50,000+ creators worldwide
             </div>
          </div>

          {/* As Seen In / Platform Bar */}
          <div className="mt-10 animate-in fade-in duration-1000 delay-700">
            <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-widest text-center mb-4">Works with all your favorite platforms</p>
            <div className="flex flex-wrap items-center justify-center gap-6 opacity-50 dark:opacity-30">
              {["Instagram", "TikTok", "YouTube", "Twitter / X", "Facebook", "Reddit", "Pinterest"].map((name) => (
                <span key={name} className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-tight select-none">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot slotId="hp_middle_1" format="auto" />
      </div>

      {/* Popular Tools Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Popular Tools</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* AI Magic Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-6 h-6 text-pink-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Powered</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Categories Overview */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-white dark:bg-zinc-900 p-10 flex flex-col justify-center">
            <Video className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Video Utilities</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
              Download, trim, compress and convert videos from any major social platform without losing quality.
            </p>
            <a href="/category/video" className="text-purple-600 font-semibold hover:text-purple-700 w-fit">Browse video tools &rarr;</a>
          </div>
          <div className="bg-gray-50 dark:bg-zinc-950 p-10 flex flex-col justify-center border-l border-gray-200 dark:border-zinc-800">
            <ImageIcon className="w-10 h-10 text-pink-600 mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Image Suite</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
              Compress, resize, remove backgrounds and convert image formats with professional-grade quality.
            </p>
            <a href="/category/image" className="text-pink-600 font-semibold hover:text-pink-700 w-fit">Browse image tools &rarr;</a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 bg-gray-50 dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Loved by Creators Worldwide</h2>
          <div className="flex items-center justify-center gap-1 mb-8">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">4.8/5 from 2,400+ reviews</span>
          </div>
        </div>
        <div className="flex gap-6 overflow-hidden">
          <div className="flex gap-6 animate-marquee whitespace-nowrap flex-shrink-0">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="flex-shrink-0 w-80 p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white whitespace-normal">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 whitespace-normal">{t.handle}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-600 dark:text-zinc-400 whitespace-normal line-clamp-3">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
