'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const cards = [
    {
        title: 'What is SnipCrate?',
        desc: 'SnipCrate is a platform for storing, sharing, and using code snippets, AI chat prompts, and script templates. Developers can collaborate and quickly find reusable code and resources for their projects.'
    },
    {
        title: 'How does it work?',
        desc: 'Sign up, create or browse code snippets, AI prompts, and script templates. Use them in your own projects, or create your own crates and share with others. Customize resources to fit your needs.'
    },
    {
        title: 'Who is it for?',
        desc: 'SnipCrate is for anyone who codes and wants to save time by using and sharing useful code snippets with others.'
    }
];

export default function AboutCards() {
    return (
        <section className="relative py-12 grid gap-8 md:grid-cols-3 container mx-auto px-4 md:px-6 overflow-hidden">
            {/* Blurry dots pattern background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Scattered blurry dots */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-br from-gray-400/10 to-gray-600/5 dark:from-white/8 dark:to-gray-300/3 blur-sm animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${8 + Math.random() * 16}px`,
                            height: `${8 + Math.random() * 16}px`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${4 + Math.random() * 2}s`
                        }}
                    />
                ))}

                {/* Larger blurred dots for depth */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`large-${i}`}
                        className="absolute rounded-full bg-gradient-to-br from-gray-300/8 to-gray-500/4 dark:from-white/5 dark:to-gray-200/2 blur-md animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${20 + Math.random() * 30}px`,
                            height: `${20 + Math.random() * 30}px`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${6 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Cards with relative positioning to appear above dots */}
            {/* Cards with relative positioning to appear above dots */}
            {cards.map((card, index) => (
                <motion.div
                    key={card.title}
                    initial={{
                        opacity: 0,
                        y: 50,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    whileHover={{
                        y: -12,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                        delay: index * 0.15
                    }}
                    className="group relative z-10"
                >
                    <Card className="shadow-none border-0 backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 h-full relative overflow-hidden rounded-2xl">
                        {/* Frosted glass overlay */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/20 via-gray-50/10 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent"
                            initial={{ opacity: 0.5 }}
                            whileHover={{ opacity: 0.8 }}
                            transition={{ duration: 0.4 }}
                        />

                        {/* Subtle animated shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                        />

                        <CardHeader className="relative z-10 pb-4">
                            <div className="relative">
                                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500 cursor-pointer">
                                    {card.title}
                                </CardTitle>
                                {/* Elegant animated underline */}
                                <motion.div
                                    className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-gray-600 via-gray-800 to-black dark:from-gray-400 dark:via-gray-200 dark:to-white rounded-full"
                                    initial={{ width: 0, opacity: 0 }}
                                    whileHover={{ width: '100%', opacity: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.25, 0.1, 0.25, 1]
                                    }}
                                />
                            </div>
                        </CardHeader>

                        <CardContent className="relative z-10 pt-2">
                            <motion.p
                                className="text-muted-foreground/80 leading-relaxed text-sm font-medium"
                                initial={{ opacity: 0.7 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {card.desc}
                            </motion.p>
                        </CardContent>

                        {/* Elegant corner accent with frosted effect */}
                        <motion.div
                            className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-500/20 via-gray-400/10 to-transparent dark:from-white/20 dark:via-white/10 rounded-bl-3xl backdrop-blur-sm border-l border-b border-white/20 dark:border-white/10"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        />

                        {/* Subtle bottom glow */}
                        <motion.div
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gray-400/30 dark:via-white/20 to-transparent"
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileHover={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    </Card>
                </motion.div>
            ))}
        </section>
    );
}
