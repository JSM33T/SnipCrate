"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const tilt = { rotate: 1, scale: 1.03 };
const lift = { y: -6, scale: 1.05 };

export interface AboutCardProps {
    title: string;
    buttonLabel: string;
    desc: string;
    features: string[];
    link?: string;
    button?: React.ReactNode;
}

export default function AboutCard(props: AboutCardProps) {
    const router = useRouter();
    const { title, desc, features, link, button, buttonLabel } = props;
    return (
        <motion.div
            whileHover={tilt}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="w-full max-w-sm mx-auto"
        >
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{desc}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        {features.map((f, idx) => (
                            <li key={idx}>• {f}</li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <motion.div whileHover={lift} className="w-full">
                        {link ? (
                            typeof link === "string" && link.startsWith("https") ? (
                                <a
                                    href={link}
                                    className="ml-2 text-blue-600 underline dark:text-blue-400"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {buttonLabel}
                                </a>
                            ) : (
                                <Button variant="outline" onClick={() => router.push(link!)}>{buttonLabel}</Button>
                            )
                        ) : (
                            button
                        )}
                    </motion.div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
