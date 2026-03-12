"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ToolConfig } from "@/config/tools";
import { getIcon } from "@/components/IconMapper";

interface ToolCardProps {
    tool: ToolConfig;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
    const IconComponent = getIcon(tool.icon);

    return (
        <Link href={`/tools/${tool.slug}`}>
            <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group h-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-900 transition-all duration-300 flex flex-col items-start gap-4 cursor-pointer"
            >
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                        {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 line-clamp-2">
                        {tool.description}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};
