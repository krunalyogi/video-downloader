"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

interface AdSlotProps {
    slotId?: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    className?: string; // For wrapper styling (e.g., margins, alignments)
}

/**
 * Reusable Google AdSense AdSlot Component.
 * Automatically handles the injection of the ad script and rendering the box.
 * Collapses gracefully if an ad-blocker is detected to preserve UX.
 */
export const AdSlot = ({ slotId = "example_slot_123", format = "auto", className = "" }: AdSlotProps) => {
    const [isAdBlockerDetected, setIsAdBlockerDetected] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        try {
            // Push the AdSense command to initialize the ad
            if (typeof window !== "undefined") {
                // @ts-expect-error - AdSense injects into the global window object
                const adsbygoogle = window.adsbygoogle || [];
                adsbygoogle.push({});
            }
        } catch (error) {
            console.error("AdSense Error: ", error);
            // Basic heuristic to detect blocked scripts
            setIsAdBlockerDetected(true);
        }
    }, []);

    // Prevent rendering issues during SSR hydration
    if (!isClient) return <div className={`w-full min-h-[90px] bg-gray-50/50 dark:bg-zinc-900/50 animate-pulse rounded-xl ${className}`} />;

    return (
        <div className={`w-full flex justify-center items-center my-6 relative overflow-hidden rounded-xl ${className}`}>
            
            {/* AdBlocker Graceful Degradation */}
            {isAdBlockerDetected ? (
                <div className="w-full max-w-3xl p-6 bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-xl flex items-center justify-center gap-3 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">Please consider disabling your adblocker to support free tools!</p>
                </div>
            ) : (
                <div className="w-full relative bg-gray-50 dark:bg-zinc-900/30 rounded-xl border border-dashed border-gray-200 dark:border-zinc-800 p-2 text-center flex flex-col items-center">
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 font-semibold">Advertisement</span>
                    
                    {/* Official AdSense Implementation */}
                    <ins
                        className="adsbygoogle"
                        style={{ display: "block", width: "100%" }}
                        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with real Pub ID
                        data-ad-slot={slotId}
                        data-ad-format={format}
                        data-full-width-responsive="true"
                    />
                </div>
            )}
            
        </div>
    );
};
