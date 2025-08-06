'use client';

import * as React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetClose } from '@/components/ui/sheet';
import { User, Settings, LogOut, CreditCard, Users, LogIn } from 'lucide-react';
import { useUser, useUserData, useAuth } from '@/lib/stores/userStore';
import { cn } from '@/lib/utils';

interface UserProfileProps {
    className?: string;
    showFullProfile?: boolean;
    variant?: 'desktop' | 'mobile';
}

export function UserProfile({
    className,
    showFullProfile = true,
    variant = 'desktop'
}: UserProfileProps) {
    const { logout } = useUser();
    const user = useUserData();
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className={cn("flex items-center gap-2", className)}>
                <div className="animate-pulse">
                    <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                </div>
                {showFullProfile && variant === 'desktop' && (
                    <div className="hidden md:block animate-pulse">
                        <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>
                        <div className="h-3 w-16 bg-gray-300 rounded"></div>
                    </div>
                )}
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className={cn("relative h-10 w-auto px-2", className)}
                    >
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                    G
                                </AvatarFallback>
                            </Avatar>
                            {showFullProfile && variant === 'desktop' && (
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium leading-none">Guest</p>
                                    <p className="text-xs text-muted-foreground">Not signed in</p>
                                </div>
                            )}
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">Guest User</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                Sign in to access your account
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/account/login">
                            <LogIn className="mr-2 h-4 w-4" />
                            <span>Sign In</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/account/signup">
                            <User className="mr-2 h-4 w-4" />
                            <span>Sign Up</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    if (variant === 'mobile') {
        if (!isAuthenticated || !user) {
            return (
                <div className={cn("flex items-center gap-3 p-3 rounded-md bg-accent/50", className)}>
                    <Avatar className="h-10 w-10">
                        <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="text-sm font-medium">Guest</p>
                        <p className="text-xs text-muted-foreground">Not signed in</p>
                    </div>
                </div>
            );
        }

        return (
            <div className={cn("flex items-center gap-3 p-3 rounded-md bg-accent/50", className)}>
                <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.designation}</p>
                </div>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn("relative h-10 w-auto px-2", className)}>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-xs">
                                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        {showFullProfile && (
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.designation}</p>
                            </div>
                        )}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.designation}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Team</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// Additional component for mobile profile actions
export function MobileProfileActions({ className }: { className?: string }) {
    const { logout } = useUser();
    const { isAuthenticated } = useAuth();

    return (
        <div className={cn("pt-4 border-t space-y-1", className)}>
            {isAuthenticated ? (
                <>
                    <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-600"
                            onClick={logout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </SheetClose>
                </>
            ) : (
                <>
                    <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                            <Link href="/account/login">
                                <LogIn className="mr-2 h-4 w-4" />
                                Sign In
                            </Link>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                            <Link href="/account/signup">
                                <User className="mr-2 h-4 w-4" />
                                Sign Up
                            </Link>
                        </Button>
                    </SheetClose>
                </>
            )}
        </div>
    );
}
