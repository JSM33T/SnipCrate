import Head from "next/head";
import Card from "./_client/cards";
import aboutCards from "./_data/aboutCards";


export default function AboutPage() {
	return (
		<>
			<Head>
				<title>SnipCrate – Effortless Code Snippet Management</title>
				<meta name="description" content="SnipCrate helps you organize, search, and share code snippets with ease. Boost your productivity and never lose a snippet again." />
				<meta property="og:title" content="SnipCrate – Effortless Code Snippet Management" />
				<meta property="og:description" content="SnipCrate helps you organize, search, and share code snippets with ease. Boost your productivity and never lose a snippet again." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://snipcrate.com/" />
				<meta property="og:image" content="/public/file.svg" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="SnipCrate – Effortless Code Snippet Management" />
				<meta name="twitter:description" content="SnipCrate helps you organize, search, and share code snippets with ease. Boost your productivity and never lose a snippet again." />
				<meta name="twitter:image" content="/public/file.svg" />
			</Head>
			<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
				<section className="container mx-auto px-4 py-20">
					<div className="mx-auto max-w-6xl">
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
								About Us
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300">
								Learn more about our platform and community features.
							</p>
						</div>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{aboutCards.map((item, i) => (
								<Card key={i} {...item} buttonLabel={item.buttonLabel} />
							))}
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
