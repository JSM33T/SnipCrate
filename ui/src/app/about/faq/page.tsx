
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { cookies } from "next/headers";

// Server component for FAQ page
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "SnipCrate – Effortless Code Snippet Management",
	description: "SnipCrate helps you organize, search, and share code snippets with ease. Boost your productivity and never lose a snippet again.",
	openGraph: {
		title: "SnipCrate – Effortless Code Snippet Management",
		description: "SnipCrate helps you organize, search, and share code snippets with ease. Boost your productivity and never lose a snippet again.",
		type: "website",
		url: "https://snipcrate.com/",
		images: ["/public/file.svg"],
	},
	twitter: {
		card: "summary_large_image",
		title: "SnipCrate – Effortless Code Snippet Management",
		description: "SnipCrate helps you organize, search, and share code snippets with ease. Boost your productivity and never lose a snippet again.",
		images: ["/public/file.svg"],
	},
};

type FaqItem = typeof import("@/lib/translations/en").default.faqItems extends Array<infer T> ? T : never;

async function getLangFromCookie(): Promise<string> {
	const cookieStore = cookies();
	const lang = (await cookieStore).get("lang")?.value;
	return lang || "en";
}

async function getTranslations(language: string) {
	try {
		const translations = (await import(`@/lib/translations/${language}`)).default;
		return translations;
	} catch {
		const translations = (await import("@/lib/translations/en")).default;
		return translations;
	}
}

export default async function FaqPage() {
	const language = getLangFromCookie();
	const translations = await getTranslations(await language);
	const faqItems: FaqItem[] = translations.faqItems || [];
	const t = (key: string) => translations[key] || key;

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
			<section className="container mx-auto px-4 py-20">
				<div className="mx-auto max-w-6xl">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
							{t("frequentlyAskedQuestions")}
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							{t("faqDescription")}
						</p>
					</div>
					{/* Search is not available in server components without client interactivity */}
					<div className="max-w-xl mx-auto mb-8">
						<Input
							placeholder={t("searchFaqPlaceholder")}
							value={""}
							readOnly
							className="bg-white dark:bg-gray-900 opacity-60 cursor-not-allowed"
						/>
					</div>
					<Accordion type="multiple" defaultValue={[]}>
						{faqItems.map((item, idx) => (
							<AccordionItem value={String(idx)} key={idx}>
								<AccordionTrigger value={String(idx)}>
									{item.question}
								</AccordionTrigger>
								<AccordionContent value={String(idx)}>
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>
		</div>
	);
}