'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser, useAuth } from '@/lib/stores/userStore';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

// Mock user data for different test scenarios
const mockUsers = [
    {
        id: '1',
        email: 'admin@snipcrate.dev',
        password: 'admin123',
        name: 'John Doe',
        designation: 'Senior Developer',
        avatar: '/api/placeholder/40/40',
        isAuthenticated: true,
    },
    {
        id: '2',
        email: 'user@snipcrate.dev',
        password: 'user123',
        name: 'Jane Smith',
        designation: 'Frontend Developer',
        avatar: '/api/placeholder/40/40',
        isAuthenticated: true,
    },
    {
        id: '3',
        email: 'test@snipcrate.dev',
        password: 'test123',
        name: 'Test User',
        designation: 'QA Engineer',
        avatar: '/api/placeholder/40/40',
        isAuthenticated: true,
    }
];

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { login } = useUser();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Find matching user
            const user = mockUsers.find(u => u.email === email && u.password === password);

            if (user) {
                // Remove password from user object before storing
                const { password: _, ...userProfile } = user;
                login(userProfile);
                router.push('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred during login');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDemoLogin = (userEmail: string, userPassword: string) => {
        setEmail(userEmail);
        setPassword(userPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md space-y-6">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">
                            Sign in to SnipCrate
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isSubmitting}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                        <span className="sr-only">
                                            {showPassword ? 'Hide password' : 'Show password'}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
                                    {error}
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Demo Accounts
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 space-y-2">
                                <p className="text-xs text-muted-foreground text-center">
                                    Click to use demo credentials:
                                </p>
                                <div className="grid grid-cols-1 gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDemoLogin('admin@snipcrate.dev', 'admin123')}
                                        disabled={isSubmitting}
                                    >
                                        Admin Account
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDemoLogin('user@snipcrate.dev', 'user123')}
                                        disabled={isSubmitting}
                                    >
                                        User Account
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-muted-foreground">Don&apos;t have an account? </span>
                            <Link
                                href="/account/signup"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
