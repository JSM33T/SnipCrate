'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" disabled>
                <Sun className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="relative flex items-center justify-center"
        >
            {/* Sun Icon */}
            <motion.span
                key="sun"
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                    rotate: theme === 'light' ? 0 : -90,
                    opacity: theme === 'light' ? 1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <Sun className="h-5 w-5" />
            </motion.span>
            {/* Moon Icon */}
            <motion.span
                key="moon"
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                    rotate: theme === 'dark' ? 0 : 90,
                    opacity: theme === 'dark' ? 1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <Moon className="h-5 w-5" />
            </motion.span>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
