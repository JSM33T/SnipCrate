'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"



// Accordion context for managing open state
type AccordionType = 'single' | 'multiple';
interface AccordionContextProps {
	type: AccordionType;
	value: string[];
	toggleItem: (val: string) => void;
}

const AccordionContext = React.createContext<AccordionContextProps | undefined>(undefined);

interface AccordionRootProps {
	type?: AccordionType;
	value?: string[];
	defaultValue?: string[];
	onValueChange?: (value: string[]) => void;
	children: React.ReactNode;
	className?: string;
}

export function Accordion({
	type = 'single',
	value: controlledValue,
	defaultValue = [],
	onValueChange,
	children,
	className = '',
}: AccordionRootProps) {
	const isControlled = controlledValue !== undefined;
	const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(defaultValue);
	const value = isControlled ? controlledValue : uncontrolledValue;

	const toggleItem = (val: string) => {
		let newValue: string[];
		if (type === 'single') {
			newValue = value[0] === val ? [] : [val];
		} else {
			newValue = value.includes(val)
				? value.filter((v) => v !== val)
				: [...value, val];
		}
		if (!isControlled) setUncontrolledValue(newValue);
		onValueChange?.(newValue);
	};

	return (
		<AccordionContext.Provider value={{ type, value, toggleItem }}>
			<div className={`space-y-2 ${className}`}>{children}</div>
		</AccordionContext.Provider>
	);
}

interface AccordionItemProps {
	value: string;
	children: React.ReactNode;
	className?: string;
}

export function AccordionItem({ value, children, className = '' }: AccordionItemProps) {
	return (
		<div className={`border rounded-md bg-white dark:bg-gray-900 overflow-hidden ${className}`} data-accordion-item={value}>
			{children}
		</div>
	);
}

interface AccordionTriggerProps {
	children: React.ReactNode;
	className?: string;
	value: string;
}

export function AccordionTrigger({ children, className = '', value }: AccordionTriggerProps) {
	const ctx = React.useContext(AccordionContext);
	if (!ctx) throw new Error('AccordionTrigger must be used within Accordion');
	const isOpen = ctx.value.includes(value);
	return (
		<button
			className={`w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-900 dark:text-white focus:outline-none ${className}`}
			onClick={() => ctx.toggleItem(value)}
			aria-expanded={isOpen}
			aria-controls={`accordion-content-${value}`}
			id={`accordion-trigger-${value}`}
			type="button"
		>
			<span>{children}</span>
			<motion.span
				className="ml-2 inline-block"
				initial={false}
				animate={{ rotate: isOpen ? 0 : 90 }}
				transition={{ type: "spring", stiffness: 400, damping: 30 }}
				style={{ display: 'inline-block' }}
			>
				{/* Plus icon (rotates to minus on open) */}
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="9" y="4" width="2" height="12" rx="1" fill="currentColor" style={{ opacity: isOpen ? 0 : 1, transition: 'opacity 0.18s' }} />
					<rect x="4" y="9" width="12" height="2" rx="1" fill="currentColor" />
				</svg>
			</motion.span>
		</button>
	);
}

interface AccordionContentProps {
	children: React.ReactNode;
	value: string;
	className?: string;
}

export function AccordionContent({ children, value, className = '' }: AccordionContentProps) {
	const ctx = React.useContext(AccordionContext);
	if (!ctx) throw new Error('AccordionContent must be used within Accordion');
	const isOpen = ctx.value.includes(value);
	return (
		<AnimatePresence initial={false}>
			{isOpen && (
				<motion.div
					key="content"
					id={`accordion-content-${value}`}
					aria-labelledby={`accordion-trigger-${value}`}
					initial={{ maxHeight: 0, opacity: 0 }}
					animate={{ maxHeight: 500, opacity: 1 }}
					exit={{ maxHeight: 0, opacity: 0 }}
					transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
					style={{ overflow: 'hidden' }}
					className={`px-4 pb-4 text-gray-700 dark:text-gray-300 will-change-transform ${className}`}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}


