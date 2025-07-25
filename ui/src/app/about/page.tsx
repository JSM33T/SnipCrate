'use client';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";

const tilt = { rotate: 1, scale: 1.03 };
const lift = { y: -8, scale: 1.05 };

export default function About() {
	const { t } = useLanguage();
	const router = useRouter();

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
			<section className="container mx-auto px-4 py-20">
				<div className="mx-auto max-w-6xl">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
							{t('aboutUs')}
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							{t('aboutDescription')}
						</p>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								title: "Dynamic Snippet Sharing",
								desc: "Share, fork, and collaborate on code snippets with real-time variable editing and instant updates.Build, reuse, and evolve code together.",
								features: [
									"FOrk & collaborate",
									"Dynamic snippets with custom variables",
									"Analytics & insights",
								],
								link: "/about/faq",
							},
							{
								title: "Collaboration & Community",
								desc: "Rate, comment, and contribute. Follow creators, see trending snippets, and build your dev circle.",
								features: [
									"Rating & feedback system",
									"Comment threads and replies",
									"Follow developers & discover teams",
								],
								button: <Button variant="outline">Explore Community</Button>,
							},
							{
								title: "Easy Integration & Analytics",
								desc: "Integrate snippets into your projects with a click. Get usage analytics for your shared snippets.",
								features: [
									"Personal usage analytics",
									"Public stats for every snippet",
								],
								button: <Button variant="link">View Integrations</Button>,
							},
							{
								title: "Security & Privacy",
								desc: "Snippets are protected by user authentication. You control who can view or fork your work.",
								features: [
									"OAuth & SSO support",
									"Granular access controls",
									"Data encrypted at rest",
								],
								button: <Button variant="outline">Security Details</Button>,
							},
						].map((item, i) => (
							<motion.div
								key={i}
								whileHover={tilt}
								transition={{ type: "spring", stiffness: 200, damping: 10 }}
								className="w-full max-w-sm mx-auto"
							>
								<Card>
									<CardHeader>
										<CardTitle>{item.title}</CardTitle>
										<CardDescription>{item.desc}</CardDescription>
									</CardHeader>
									<CardContent>
										<ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
											{item.features.map((f, idx) => (
												<li key={idx}>• {f}</li>
											))}
										</ul>
									</CardContent>
									<CardFooter>
										<motion.div whileHover={lift} className="w-full">
											{/* FAQ card: show link or button based on link value */}
											{i === 0
												? (typeof item.link === 'string' && item.link.startsWith('https')
													? <a href={item.link} className="ml-2 text-blue-600 underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">Learn more</a>
													: typeof item.link === 'string'
														? <Button variant="outline" onClick={() => router.push(item.link)}>View Docs</Button>
														: null)
												: item.button}
										</motion.div>
									</CardFooter>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
