'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser, useUserData, useAuth } from '@/lib/stores/userStore';
import { useState } from 'react';

export default function UserStoreDemoPage() {
    const { login, logout, updateProfile } = useUser();
    const user = useUserData();
    const { isAuthenticated, isLoading, error } = useAuth();

    const [formData, setFormData] = useState({
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        designation: 'Product Manager',
        avatar: '/api/placeholder/40/40'
    });

    const handleLogin = () => {
        login({
            id: '2',
            name: formData.name,
            email: formData.email,
            designation: formData.designation,
            avatar: formData.avatar,
            isAuthenticated: true,
        });
    };

    const handleUpdateProfile = () => {
        updateProfile({
            name: 'Updated Name',
            designation: 'Senior Product Manager'
        });
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold">User Store Demo</h1>
                <p className="text-muted-foreground mt-2">
                    Control user authentication and profile from anywhere in the app
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Current User Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Current User Status</CardTitle>
                        <CardDescription>
                            Real-time user state from the store
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : isAuthenticated && user ? (
                            <div className="space-y-2">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Designation:</strong> {user.designation}</p>
                                <p><strong>Status:</strong> ✅ Authenticated</p>
                                {user.avatar && (
                                    <p><strong>Avatar:</strong> {user.avatar}</p>
                                )}
                            </div>
                        ) : (
                            <p>❌ Not authenticated</p>
                        )}
                        {error && (
                            <p className="text-red-600 mt-2">Error: {error}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Login Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Login Form</CardTitle>
                        <CardDescription>
                            Test logging in with different user data
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="designation">Designation</Label>
                            <Input
                                id="designation"
                                value={formData.designation}
                                onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="avatar">Avatar URL</Label>
                            <Input
                                id="avatar"
                                value={formData.avatar}
                                onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                            />
                        </div>
                        <Button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Actions */}
            {isAuthenticated && (
                <Card>
                    <CardHeader>
                        <CardTitle>User Actions</CardTitle>
                        <CardDescription>
                            Test various user operations
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-2 flex-wrap">
                        <Button onClick={handleUpdateProfile} variant="outline">
                            Update Profile
                        </Button>
                        <Button onClick={logout} variant="destructive">
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Usage Example */}
            <Card>
                <CardHeader>
                    <CardTitle>Usage Example</CardTitle>
                    <CardDescription>
                        How to use the user store in any component
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                        {`import { useUser, useUserData, useAuth } from '@/lib/stores/userStore';

function MyComponent() {
  const { login, logout, updateProfile } = useUser();
  const user = useUserData();
  const { isAuthenticated, isLoading, error } = useAuth();

  // Login a user
  const handleLogin = () => {
    login({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      designation: 'Developer',
      avatar: '/avatar.jpg',
      isAuthenticated: true
    });
  };

  // Update user profile
  const handleUpdate = () => {
    updateProfile({
      name: 'Updated Name',
      designation: 'Senior Developer'
    });
  };

  // Logout user
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>Welcome {user?.name}!</div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}`}
                    </pre>
                </CardContent>
            </Card>
        </div>
    );
}
