import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/lib/stores/userStore";
import Loader from "@/components/shared/Loader";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SnipCrate",
    description: "A snippet repository for the developers by the developers",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Analytics />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <UserProvider>
                        <Loader />
                        <Navbar />
                        <div>{/* Offset for fixed navbar */}
                            {children}
                        </div>
                    </UserProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
