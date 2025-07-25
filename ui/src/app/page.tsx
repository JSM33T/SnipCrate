"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DateRange } from "react-day-picker";

export default function Home() {
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(),
		to: undefined,
	});
	const [displayedText, setDisplayedText] = useState("");
	const [showCursor, setShowCursor] = useState(true);
	const { t } = useLanguage();

	const welcomeText = t('welcome');

	useEffect(() => {
		let index = 0;
		const timer = setInterval(() => {
			if (index <= welcomeText.length) {
				setDisplayedText(welcomeText.slice(0, index));
				index++;
			} else {
				clearInterval(timer);
				// Blink cursor for a bit then hide it
				setTimeout(() => setShowCursor(false), 2000);
			}
		}, 100);

		return () => clearInterval(timer);
	}, [welcomeText]);

	// Cursor blinking effect
	useEffect(() => {
		const cursorTimer = setInterval(() => {
			setShowCursor(prev => !prev);
		}, 500);

		return () => clearInterval(cursorTimer);
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
			{/* Hero Section */}
			<section className="container mx-auto py-20 text-center">
				<div className="mx-auto max-w-4xl">
					<Badge className="mb-6" variant="secondary">
						SnipCrate
					</Badge>
					<motion.div
						className="mb-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
							<span className="relative inline-block">
								<span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent font-mono">
									{displayedText}
								</span>
								{showCursor && (
									<span className="inline-block w-0.5 h-8 sm:h-12 bg-primary ml-1 animate-pulse" />
								)}
							</span>
						</h1>
					</motion.div>
					<p className="mb-8 text-xl text-gray-600 dark:text-gray-300 sm:text-2xl">
						{t('description')}
					</p>

					{/* Date Range Picker */}
					<div className="mb-8 flex justify-center">
						<DatePickerWithRange
							date={date}
							onDateChange={setDate}
							placeholder="Select date range for events"
						/>
					</div>

					<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
						<Button size="lg" className="text-md">
							Get Started Free
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>

						<Link href="/about">
							<Button size="lg" variant="outline" className="text-md">
								{t('about')}
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
