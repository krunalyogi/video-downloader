import { ToolConfig } from "@/config/tools";

interface Props {
    tool: ToolConfig;
    renderSlug: string;
}

export function DynamicToolContent({ tool, renderSlug }: Props) {
    // We already have hardcoded content for Video-To-Gif, so avoid replacing it if they want that specific one.
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
                        Downloading videos using our {tool.name} is the fastest way to save your favorite content offline. Whether you want to preserve a funny clip, save a tutorial for offline viewing, or backup your own content, Klipto provides a seamless, watermark-free experience. There is no software to install and no registration required.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Why choose our {platformName} Downloader?
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
                        <li><strong>Highest Quality:</strong> We extract the original source file resolution, up to 4K and 1080p where available.</li>
                        <li><strong>No Watermarks:</strong> Keep your videos clean. We instantly remove any associated platform watermarks during processing.</li>
                        <li><strong>Cross-Platform Compatible:</strong> Use our downloader on Windows, Mac, iOS, or Android browser without installing any third-party applications.</li>
                        <li><strong>Lightning Fast Speed:</strong> Powered by premium edge server infrastructure, allowing for instant processing.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Supported Formats & Quality
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        By default, Klipto processes and delivers your {platformName} files in standard `.mp4` video container formats for maximum compatibility with all modern media players, editing software, and mobile devices. Audio-only extractions are delivered in crisp `.mp3` format.
                    </p>
                </>
            )}

            {tool.category === "image" && (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Free Online {tool.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Process, convert, and optimize your media effortlessly with our web-based {tool.name}. Designed for photographers, web developers, and social media managers, our utility provides professional-grade processing directly inside your browser. No data leaves your machine unless strictly necessary for computationally heavy ML models.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Benefits of using Klipto Image Utilities
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                        <li><strong>Rapid Processing:</strong> Harness WebAssembly (WASM) to process images blazingly fast using your own device&apos;s hardware.</li>
                        <li><strong>Format Agnostic:</strong> Full support for PNG, JPEG, WEBP, and modern image containers.</li>
                        <li><strong>Privacy First:</strong> Your files remain your property. Period.</li>
                    </ul>
                </>
            )}

            {tool.category === "ai" && (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Generate Engaging Content with {tool.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Harness the power of latest large-language models to supercharge your workflow. Our {tool.name} helps creators break through writer&apos;s block by generating highly specific, platform-native outputs tailored perfectly to your creative prompt. Say goodbye to struggling with the perfect hook.
                    </p>
                </>
            )}

        </div>
    );
}
