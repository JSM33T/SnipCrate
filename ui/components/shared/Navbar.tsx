'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AnimatedLogo } from '@/components/shared/AnimatedLogo';
import { UserProfile, MobileProfileActions } from '@/components/shared/UserProfile';
import { motion, AnimatePresence } from 'framer-motion';

// Define the shape of a navigation item
interface NavItem {
    label: string;
    href?: string;
    children?: NavItem[];
    description?: string;
    enabled?: boolean;
}

// Define your navigation structure
const navItems: NavItem[] = [
    { label: 'Home', href: '/', enabled: true },
    { label: 'About', href: '/about', enabled: true },
];

const Logo = () => (
    <Link
        href="/"
        className="flex items-center gap-2"
        prefetch={false}
        passHref>
        <AnimatedLogo className="h-6 w-auto" aria-label="SnipCrate Logo" />
    </Link>
);

const DesktopNav = () => {
    const pathname = usePathname();
    const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

    return (
        <div className="hidden md:flex">
            <div className="flex items-center space-x-1 relative">
                {navItems.map((item) => (
                    <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={() => setHoveredItem(item.label)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        {item.href && item.enabled !== false ? (
                            <Link
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200 z-10",
                                    pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {item.label}

                                {/* Active state bubble */}
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-accent rounded-full"
                                        style={{ zIndex: -1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30
                                        }}
                                    />
                                )}

                                {/* Hover state bubble */}
                                <AnimatePresence>
                                    {hoveredItem === item.label && pathname !== item.href && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="absolute inset-0 bg-accent/50 rounded-full"
                                            style={{ zIndex: -1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 30
                                            }}
                                        />
                                    )}
                                </AnimatePresence>
                            </Link>
                        ) : (
                            <span className={cn(
                                "px-4 py-2 text-sm font-medium rounded-full",
                                item.enabled === false && "opacity-50 cursor-not-allowed"
                            )}>
                                {item.label}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="w-full max-w-xs pr-0 bg-background/80 backdrop-blur-md border"
                >
                    <div className="p-6 pt-0">
                        <div className="flex items-center justify-between py-4 border-b mb-4">
                            <Logo />
                        </div>

                        {/* Mobile Profile Section */}
                        <UserProfile variant="mobile" className="mb-4" />

                        <nav className="flex flex-col space-y-1">
                            {navItems.map((item) => (
                                <SheetClose asChild key={item.label}>
                                    {item.href && item.enabled !== false ? (
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'relative block rounded-md px-3 py-3 text-base font-medium transition-colors',
                                                pathname === item.href
                                                    ? 'bg-accent text-accent-foreground'
                                                    : 'hover:bg-accent hover:text-accent-foreground'
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className={cn(
                                            'block rounded-md px-3 py-3 text-base font-medium',
                                            item.enabled === false && 'opacity-50 cursor-not-allowed'
                                        )}>
                                            {item.label}
                                        </span>
                                    )}
                                </SheetClose>
                            ))}

                            {/* Mobile Profile Actions */}
                            <MobileProfileActions />
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
            {/* Floating Container */}
            <div className="flex justify-center pt-4">
                <div className="flex items-center justify-between bg-background/80 backdrop-blur-md border rounded-full shadow-lg px-4 py-2 mx-4 max-w-6xl w-full pointer-events-auto">
                    {/* Left Aligned Logo */}
                    <div className="flex items-center">
                        <Logo />
                    </div>

                    {/* Centered Desktop Navigation */}
                    <div className="flex-1 justify-center hidden md:flex">
                        <DesktopNav />
                    </div>

                    {/* Right Aligned Controls */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="hidden md:inline-flex rounded-full">
                            Log in
                        </Button>
                        <Button size="sm" className="hidden md:inline-flex rounded-full bg-foreground text-background hover:bg-foreground/90">
                            Download
                        </Button>
                        <ThemeToggle />
                        {/* Desktop Profile Dropdown */}
                        <div className="hidden md:block">
                            <UserProfile />
                        </div>
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
}
