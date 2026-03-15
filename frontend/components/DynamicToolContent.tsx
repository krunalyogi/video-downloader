import { ToolConfig } from "@/config/tools";

interface Props {
    tool: ToolConfig;
    renderSlug: string;
}

export function DynamicToolContent({ tool, renderSlug }: Props) {
    // Some tools have highly specific interactive components that don't need this generic text injections
    if (renderSlug === "video-to-gif") {
        return null;
    }

    const platformName = tool.name.split(" ")[0]; // e.g., "Instagram", "TikTok", "YouTube"

    return (
        <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-sm text-left mt-8">
            {tool.category === "download" && (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        How to use the Free {tool.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Downloading videos using our {tool.name} is the fastest way to save your favorite content offline. Whether you want to preserve a funny clip, save a tutorial for offline viewing, or backup your own content, Kliptify provides a seamless, watermark-free experience. There is no software to install, no browser extension required, and absolutely no registration needed. Just paste the {platformName} link, and our servers instantly extract the highest available quality media file directly to your device.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Why choose our {platformName} Downloader?
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
                        <li><strong>Highest Quality:</strong> We extract the original source file resolution, up to 4K and 1080p HD where available.</li>
                        <li><strong>Absolutely No Watermarks:</strong> Keep your downloaded media clean. We instantly remove any associated platform watermarks during processing so you get the pure video.</li>
                        <li><strong>Cross-Platform Compatible:</strong> Use our downloader seamlessly on Windows, Mac, iOS Safari, or Android Chrome without downloading suspicious third-party APKs or applications.</li>
                        <li><strong>Lightning Fast Speed:</strong> Powered by premium edge server infrastructure and intelligent proxy routing, allowing for instant processing even on massive 4K video files.</li>
                        <li><strong>100% Free Forever:</strong> We don&apos;t hide our {platformName} downloading features behind premium paywalls.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Supported Formats & Quality
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        By default, Kliptify processes and delivers your {platformName} files in standard `.mp4` video container formats for maximum playback compatibility with all modern media players, editing software (like Premiere Pro or CapCut), and mobile devices. If you select an audio-only extraction, the file is delivered in crisp `.mp3` format with 320kbps bitrate whenever possible.
                    </p>
                </>
            )}

            {tool.category === "image" && (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Free Online {tool.name} for Creators
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Process, convert, and optimize your media effortlessly with our web-based {tool.name}. Designed specifically for web developers, social media managers, and graphic designers, our premium utility provides professional-grade processing directly inside your browser. Stop paying for expensive desktop software—get the exact same high-fidelity results for free.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Benefits of using Kliptify Image Utilities
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                        <li><strong>Rapid Processing:</strong> We utilize state-of-the-art server infrastructure to process massive image files blazingly fast.</li>
                        <li><strong>Format Agnostic:</strong> Full support for PNG, JPEG, WEBP, and modern image containers. Seamlessly convert between formats on the fly.</li>
                        <li><strong>Privacy First Architecture:</strong> Your files remain your property. They are processed securely and deleted from our temporal storage immediately. We never train AI models on your personal photos.</li>
                    </ul>
                </>
            )}

            {tool.category === "ai" && (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Generate Viral Concept Art & Copy with {tool.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Harness the power of the latest large-language models (LLMs) to supercharge your content creation workflow. Our {tool.name} helps creators break through writer&apos;s block by generating highly specific, platform-native outputs tailored perfectly to your creative prompt. Say goodbye to struggling with the perfect hook.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        How it works
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Unlike generic NLP tools, Kliptify&apos;s {tool.name} is specifically fine-tuned on thousands of high-converting social media posts, viral captions, and trending metadata. When you input your topic, our proprietary abstraction layer instructs the AI to optimize the syntax strictly for social media algorithms.
                    </p>
                </>
            )}

            {tool.category === "video" && renderSlug !== "video-to-gif" && (
                 <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Professional {tool.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Edit and manipulate your clips directly in the browser with our free {tool.name}. Render high-quality outputs instantly without watermarks.
                    </p>
                 </>
            )}

            {tool.category === "creator" && (
                 <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Grow Your Audience with our {tool.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Stop guessing what works. Our {tool.name} relies on real-time data and algorithmic best-practices to provide you with the exact assets you need to maximize your reach, engagement, and click-through rates on platforms like Instagram, TikTok, and YouTube.
                    </p>
                 </>
            )}
        </div>
    );
}
