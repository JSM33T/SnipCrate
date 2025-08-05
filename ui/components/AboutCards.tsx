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
        <section className="py-12 grid gap-8 md:grid-cols-3 container mx-auto px-4 md:px-6">
            {cards.map((card, index) => (
                <motion.div
                    key={card.title}
                    initial={{
                        opacity: 0,
                        y: 50,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    whileHover={{
                        y: -8,
                        boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                        delay: index * 0.1
                    }}
                    className="group"
                >
                    <Card className="shadow-none border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 backdrop-blur-sm h-full relative overflow-hidden">
                        {/* Animated background gradient */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-indigo-400/10"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />

                        <CardHeader className="relative z-10">
                            <div className="relative">
                                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                                    {card.title}
                                </CardTitle>
                                {/* Animated underline */}
                                <motion.div
                                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: '100%' }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.25, 0.1, 0.25, 1]
                                    }}
                                />
                            </div>
                        </CardHeader>

                        <CardContent className="relative z-10">
                            <motion.p
                                className="text-muted-foreground leading-relaxed"
                                initial={{ opacity: 0.8 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {card.desc}
                            </motion.p>
                        </CardContent>

                        {/* Subtle corner accent */}
                        <motion.div
                            className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-transparent dark:from-blue-400/20 rounded-bl-2xl"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        />
                    </Card>
                </motion.div>
            ))}
        </section>
    );
}
