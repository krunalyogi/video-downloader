import { Instagram, Video, Youtube, Twitter, Image, Scissors, Film, Hash, Wand2, Wrench, LucideIcon } from "lucide-react";

export const IconMap: Record<string, LucideIcon> = {
    Instagram,
    Video,
    Youtube,
    Twitter,
    Image,
    Scissors,
    Film,
    Hash,
    Wand2,
    Wrench,
};

export const getIcon = (iconName: string): LucideIcon => {
    return IconMap[iconName] || Wrench;
};
