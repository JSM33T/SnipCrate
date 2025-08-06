import { Button } from '@/components/ui/button';
import AboutCards from '@/components/AboutCards';

export default function AboutPage() {
    return (
        <main className="bg-background">
            {/* Hero Section */}
            <section className="w-full pt-16 pb-16 flex flex-col items-center justify-center text-center bg-gradient-to-br from-accent to-background">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">About SnipCrate</h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-6">
                        SnipCrate is a collaborative snippet repository for developers. Share, discover, and use code snippets, AI chat prompts, and ready-to-use script templates. Work together, learn from others, and accelerate your development workflow by leveraging a growing library of community-driven solutions and customizable resources.
                    </p>
                    <Button size="lg" className="mt-2">Explore Snippets</Button>
                </div>
            </section>

            <AboutCards />
        </main>
    );
}
