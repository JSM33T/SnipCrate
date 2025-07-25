'use client';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DomainStatusChecker from "./sidepanel/DomainStatusChecker";
import { Card } from "../ui/card";

export default function OffcanvasSidebar() {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Floating Button */}
			<button
				className="fixed right-6 bottom-6 z-50 rounded-full shadow-lg p-4 transition bg-primary text-primary-foreground hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
				onClick={() => setOpen(true)}
				aria-label="Open sidebar"
			>
				&#9776;
			</button>

			{/* Offcanvas Sidebar with Animation */}
			<AnimatePresence>
				{open && (
					<>
						<motion.div
							key="sidebar"
							initial={{ x: 320 }}
							animate={{ x: 0 }}
							exit={{ x: 320 }}
							transition={{ type: "tween", duration: 0.3 }}
							className="fixed top-0 right-0 h-full w-80 bg-background shadow-xl z-[100]"
							role="dialog"
							aria-modal="true"
						>
							<div className="flex justify-between items-center p-4 border-b">
								<h2 className="text-lg font-semibold">Sidebar</h2>
								<button
									className="text-xl font-bold hover:text-primary"
									onClick={() => setOpen(false)}
									aria-label="Close sidebar"
								>
									&times;
								</button>
							</div>
							<div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-56px)]">
								{/* Static Card 1: Domain Status Checker */}
								<Card className="p-4 flex items-center justify-between">
									<div className="flex-1">
										<h3 className="font-bold text-base mb-2">Domain Status</h3>
										<p className="text-sm text-muted-foreground mb-2">Checking servers</p>
										<DomainStatusChecker />
									</div>
								</Card>
							</div>
						</motion.div>
						{/* Overlay with fade animation */}
						<motion.div
							key="overlay"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 bg-black/30 z-[99]"
							onClick={() => setOpen(false)}
							aria-label="Close sidebar overlay"
						/>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
