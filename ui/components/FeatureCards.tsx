"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, HelpCircle } from 'lucide-react';

const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -8,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 20
        }
    }
};

const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
        scale: 1.1,
        rotate: 5,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 10
        }
    }
};

const buttonVariants = {
    initial: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 25
        }
    }
};

const cards = [
    {
        icon: Search,
        title: "Browse Snippets",
        description: "Discover and explore thousands of code snippets from the community",
        buttonText: "Start Browsing",
        iconBg: "bg-blue-100 dark:bg-blue-900/30",
        iconBgHover: "group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50",
        iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
        icon: Plus,
        title: "Create",
        description: "Share your own snippets, prompts, and templates with the community",
        buttonText: "Create New",
        iconBg: "bg-green-100 dark:bg-green-900/30",
        iconBgHover: "group-hover:bg-green-200 dark:group-hover:bg-green-900/50",
        iconColor: "text-green-600 dark:text-green-400",
    },
    {
        icon: HelpCircle,
        title: "Help",
        description: "Get support, documentation, and learn how to make the most of SnipCrate",
        buttonText: "Get Help",
        iconBg: "bg-purple-100 dark:bg-purple-900/30",
        iconBgHover: "group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50",
        iconColor: "text-purple-600 dark:text-purple-400",
    }
];

export default function FeatureCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {cards.map((card) => (
                <motion.div
                    key={card.title}
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    className="group cursor-pointer"
                >
                    <Card className="h-full min-w-[320px] px-6 border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                        <CardHeader className="text-center pb-4">
                            <motion.div
                                className={`mx-auto w-12 h-12 ${card.iconBg} ${card.iconBgHover} rounded-lg flex items-center justify-center mb-4 transition-colors duration-300`}
                                variants={iconVariants}
                            >
                                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                            </motion.div>
                            <CardTitle className="text-xl font-semibold">{card.title}</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                {card.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <motion.div variants={buttonVariants}>
                                <Button className="w-full cursor-pointer" variant="outline">
                                    {card.buttonText}
                                </Button>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
