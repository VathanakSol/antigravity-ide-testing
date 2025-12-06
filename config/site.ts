export const siteConfig = {
    // Base site information
    name: "Developer 2050",
    description: "Discover the future of development with Developer 2050. Learn cutting-edge technologies, access AI-powered learning paths, explore interactive tutorials, and stay ahead with the latest tech trends. Your comprehensive platform for modern software development.",

    // URLs
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://v2050.vercel.app",
    ogImage: process.env.NEXT_PUBLIC_OG_IMAGE_URL || "https://utfs.io/a/30qinxb2cu/v2QQauFkR64MB9QkP7rteWGKzfUpAxN1wk9nsdSXIZalEy0L",

    // Social Media
    twitter: {
        handle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@developer2050",
        cardType: "summary_large_image" as const,
    },

    // SEO Keywords
    keywords: [
        "developer platform",
        "programming tutorials",
        "coding education",
        "AI learning path",
        "software development",
        "web development",
        "technology trends",
        "coding resources",
        "developer tools",
        "tech learning",
        "programming courses",
        "code tutorials",
        "developer community",
        "tech education",
        "future technologies",
    ],

    // Authors
    authors: [{ name: "Developer 2050 Team" }],
    creator: "Developer 2050",
    publisher: "Developer 2050",
};
