
import Image from "next/image";
import { Sparkles, Users, Code2 } from 'lucide-react';
import FeatureCards from "@/components/FeatureCards";

export const metadata = {
    title: "SnipCrate | Home",
    description: "SnipCrate is a collaborative hub for code snippets, AI prompts, and script templates. Discover, share, and accelerate your workflow with our growing developer community.",
};

export default function Home() {
    return (
        <div className="font-sans bg-background min-h-screen flex flex-col">
            <section className="relative flex-1 w-full flex flex-col items-center justify-center text-center overflow-hidden min-h-0">
                {/* Professional Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-200/30 dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-800/40" />

                {/* Subtle Radial Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-100/20 dark:to-slate-900/30" />

                {/* Optional: Noise Texture for Premium Feel */}
                <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')" />

                {/* Animated Logo - More Prominent */}
                <div className="relative z-10 mb-8 flex justify-center">
                    <Image
                        className="dark:invert opacity-95 drop-shadow-sm"
                        src="/media/logo.svg"
                        alt="SnipCrate logo"
                        width={450}
                        height={180}
                        priority
                    />
                </div>

                {/* Title - Enhanced with Better Gradient */}
                <h1 className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent leading-tight max-w-4xl">
                    Unlock Your Development Potential
                </h1>

                {/* Subtitle - Improved Contrast */}
                <p className="relative z-10 text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto px-4 font-medium">
                    Your collaborative hub for code snippets, AI prompts, and script templates.
                    <br className="hidden sm:block" />
                    Share, discover, and accelerate your development workflow.
                </p>

                {/* Feature Highlights - Slate Theme Aligned */}
                <div className="relative z-10 flex flex-wrap justify-center gap-3 mb-16 px-4">
                    {[
                        { icon: Sparkles, text: "AI-Powered" },
                        { icon: Users, text: "Community-Driven" },
                        { icon: Code2, text: "Developer-Focused" }
                    ].map((feature) => (
                        <div
                            key={feature.text}
                            className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/50 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-800/90 transition-all duration-200"
                        >
                            <feature.icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature.text}</span>
                        </div>
                    ))}
                </div>

                {/* Cards (animated, client-side) */}
                <FeatureCards />
            </section>
        </div>
    );
}
