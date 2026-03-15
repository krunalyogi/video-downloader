export const dictionaries = {
    en: () => import('./en.json').then((module) => module.default),
    es: () => import('./es.json').then((module) => module.default),
    fr: () => import('./fr.json').then((module) => module.default),
    de: () => import('./de.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    // Graceful fallback to english if locale undefined or unsupported
    const dictLoader = dictionaries[locale as keyof typeof dictionaries];
    return dictLoader ? await dictLoader() : await dictionaries.en();
};
