import Link from "next/link";
import { Users, HelpCircle, User2 } from "lucide-react";

export const metadata = {
    title: "SnipCrate | About",
    description: "SnipCrate is a collaborative hub for code snippets, AI prompts, and script templates. Discover, share, and accelerate your workflow with our growing developer community.",
};

const aboutCards = [
    {
        title: "Meet the Team",
        desc: "Get to know the people building SnipCrate.",
        icon: User2,
        href: "/about/team",
    },
    {
        title: "Community",
        desc: "Join our developer community, share and collaborate.",
        icon: Users,
        href: "/about/community",
    },
    {
        title: "Help & Support",
        desc: "Find answers or get in touch with our support team.",
        icon: HelpCircle,
        href: "/about/help",
    },
];

export default function AboutPage() {
    return (
        <main className="font-sans bg-background min-h-screen flex flex-col">
            <section className="relative flex-1 w-full flex flex-col items-center justify-center text-center overflow-hidden min-h-0">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-200/30 dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-800/40" />
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-100/20 dark:to-slate-900/30" />
                <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')" />

                {/* Title */}
                <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent leading-tight max-w-4xl">
                    About SnipCrate
                </h1>
                <p className="relative z-10 text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto px-4 font-medium">
                    SnipCrate is a collaborative hub for code snippets, AI prompts, and script templates. Discover, share, and accelerate your workflow with our growing developer community.
                </p>

                {/* Cards */}
                <div className="relative z-10 grid gap-8 md:grid-cols-3 w-full max-w-5xl px-4">
                    {aboutCards.map((card) => (
                        <Link
                            key={card.title}
                            href={card.href}
                            className="group block rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-700/50 shadow-md hover:shadow-xl transition-all duration-200 p-8 text-left backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <card.icon className="w-8 h-8 text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors" />
                                <span className="text-2xl font-semibold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                                    {card.title}
                                </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-base font-medium mb-2">
                                {card.desc}
                            </p>
                            <span className="inline-block mt-2 text-primary font-semibold group-hover:underline">Learn more &rarr;</span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
