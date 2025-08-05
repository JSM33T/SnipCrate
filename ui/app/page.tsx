import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export default function Home() {
    // Height of the fixed navbar (from Navbar.tsx: h-14 = 56px)
    // Use min-h-[calc(100vh-56px)] to fill the viewport minus navbar
    return (
        <div
            className="font-sans flex flex-col items-center justify-center min-h-[calc(100vh-56px)] p-8 pb-20 gap-16 sm:p-20"
            style={{ minHeight: 'calc(100vh - 56px)' }}
        >
            {/* Hero Section */}
            <main className="flex flex-col gap-8 items-center text-center sm:items-start sm:text-left w-full">
                <Image
                    className="dark:invert"
                    src="/media/logo.svg"
                    alt="SnipCrate logo"
                    width={580}
                    height={238}
                    priority
                />
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Unlock Your Development Potential
                </h1>
                <p className="text-lg text-muted-foreground">
                    SnipCrate is your collaborative hub for code snippets, AI prompts, and script templates.
                    Share, discover, and accelerate your development workflow.
                </p>
                <Button size="lg">Explore Snippets</Button>
            </main>

        </div>
    );
}