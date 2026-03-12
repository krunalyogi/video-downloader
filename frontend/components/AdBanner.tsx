export const AdBanner = ({ position = "horizontal" }: { position?: "horizontal" | "vertical" }) => {
    return (
        <div
            className={`bg-gray-100 dark:bg-zinc-800/80 border border-dashed border-gray-300 dark:border-zinc-700 flex flex-col items-center justify-center rounded-xl overflow-hidden relative ${position === 'horizontal' ? 'w-full h-32 md:h-24 my-8' : 'w-full md:w-72 h-64 md:h-[600px] my-4 md:my-0'
                }`}
        >
            <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-zinc-500 absolute top-2 right-2">Advertisement</span>
            <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium px-4 text-center">
                Support free tools by upgrading to <a href="#" className="text-purple-600 hover:underline">Premium</a>
            </p>
        </div>
    );
};
