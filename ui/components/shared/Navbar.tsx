// 'use client';

// import * as React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { cn } from '@/lib/utils';
// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger,
//     navigationMenuTriggerStyle,
// } from '@/components/ui/navigation-menu';
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from '@/components/ui/accordion';
// import { Button } from '@/components/ui/button';
// import { Menu } from 'lucide-react';
// import { ThemeToggle } from '@/components/theme-toggle';
// import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { AnimatedLogo } from '@/components/shared/AnimatedLogo';

// // Define the shape of a navigation item
// interface NavItem {
//     label: string;
//     href?: string;
//     children?: NavItem[];
//     description?: string;
//     enabled?: boolean;
// }

// // Define your navigation structure
// const navItems: NavItem[] = [
//     { label: 'Home', href: '/', enabled: true },
//     {
//         label: 'About',
//         enabled: true,
//         children: [
//             {
//                 label: 'About Us',
//                 href: '/about',
//                 description: 'Learn about our mission and the team behind SnipCrate.',
//                 enabled: true,
//             },
//             {
//                 label: 'Our Services',
//                 href: '/about/services',
//                 description: 'Discover the services we offer to help your business grow.',
//                 enabled: false,
//             },
//             {
//                 label: 'Contact Us',
//                 href: '/about/contact',
//                 description: 'Get in touch with our team for support and inquiries.',
//                 enabled: false,
//             }
//         ],
//     },
// ];

// const Logo = () => (
//     <Link
//         href="/"
//         className="flex items-center gap-2"
//         prefetch={false}
//         passHref>
//         <AnimatedLogo className="h-6 w-auto" aria-label="SnipCrate Logo" />
//     </Link>
// );

// const ListItem = React.forwardRef<
//     React.ElementRef<'a'>,
//     React.ComponentPropsWithoutRef<'a'> & { disabled?: boolean }
// >(({ className, title, children, href, disabled = false, ...props }, ref) => {
//     const baseClasses = cn(
//         'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
//         disabled
//             ? 'opacity-50 cursor-not-allowed'
//             : 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
//         className
//     );

//     return (
//         <li>
//             <NavigationMenuLink asChild>
//                 {href && !disabled ? (
//                     <Link
//                         href={href}
//                         ref={ref}
//                         className={baseClasses}
//                         {...props}
//                     >
//                         <div className="text-sm font-medium leading-none">{title}</div>
//                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                             {children}
//                         </p>
//                     </Link>
//                 ) : (
//                     <span
//                         className={baseClasses}
//                         {...props}
//                     >
//                         <div className="text-sm font-medium leading-none">{title}</div>
//                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                             {children}
//                         </p>
//                     </span>
//                 )}
//             </NavigationMenuLink>
//         </li>
//     );
// });
// ListItem.displayName = 'ListItem';

// const DesktopNav = () => {
//     const pathname = usePathname();
//     return (
//         <div className="hidden md:flex">
//             <NavigationMenu className="hidden md:flex">
//                 <NavigationMenuList>
//                     {navItems.map((item) =>
//                         item.children ? (
//                             <NavigationMenuItem key={item.label}>
//                                 <NavigationMenuTrigger className="flex items-center gap-1 group data-[state=open]:bg-accent/50">
//                                     <span>{item.label}</span>
//                                 </NavigationMenuTrigger>
//                                 <NavigationMenuContent>
//                                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//                                         {item.children.map((child) => (
//                                             <ListItem
//                                                 key={child.label}
//                                                 href={child.href}
//                                                 title={child.label}
//                                                 disabled={child.enabled === false}
//                                             >
//                                                 {child.description}
//                                             </ListItem>
//                                         ))}
//                                     </ul>
//                                 </NavigationMenuContent>
//                             </NavigationMenuItem>
//                         ) : (
//                             <NavigationMenuItem key={item.label}>
//                                 {/* Only render Link if href exists and item is enabled, otherwise render disabled text */}
//                                 {item.href && item.enabled !== false ? (
//                                     <Link href={item.href} passHref>
//                                         <NavigationMenuLink
//                                             className={navigationMenuTriggerStyle()}
//                                             active={pathname === item.href}
//                                         >
//                                             {item.label}
//                                         </NavigationMenuLink>
//                                     </Link>
//                                 ) : (
//                                     <span className={cn(
//                                         navigationMenuTriggerStyle(),
//                                         item.enabled === false && "opacity-50 cursor-not-allowed"
//                                     )}>
//                                         {item.label}
//                                     </span>
//                                 )}
//                             </NavigationMenuItem>
//                         )
//                     )}
//                 </NavigationMenuList>
//             </NavigationMenu>
//         </div>
//     );
// };

// const MobileNav = () => {
//     const pathname = usePathname();
//     return (
//         <div className="md:hidden">
//             <Sheet>
//                 <SheetTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                         <Menu className="h-6 w-6" />
//                         <span className="sr-only">Toggle Menu</span>
//                     </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="w-full max-w-xs pr-0">
//                     <div className="p-6 pt-0">
//                         <div className="flex items-center justify-between py-4 border-b mb-4">
//                             <Logo />
//                         </div>
//                         <nav className="flex flex-col space-y-1">
//                             {navItems.map((item) =>
//                                 item.children ? (
//                                     <Accordion key={item.label} type="single" collapsible>
//                                         <AccordionItem value={item.label} className="border-b-0">
//                                             <AccordionTrigger className="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors [&[data-state=open]>svg]:rotate-180">
//                                                 <span>{item.label}</span>
//                                             </AccordionTrigger>
//                                             <AccordionContent className="pl-4 pb-0">
//                                                 <div className="flex flex-col space-y-1">
//                                                     {item.children.map((child) => (
//                                                         <SheetClose asChild key={child.label}>
//                                                             {child.href && child.enabled !== false ? (
//                                                                 <Link
//                                                                     href={child.href}
//                                                                     className={cn(
//                                                                         'block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
//                                                                     )}
//                                                                 >
//                                                                     {child.label}
//                                                                 </Link>
//                                                             ) : (
//                                                                 <span className={cn(
//                                                                     'block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground',
//                                                                     child.enabled === false && 'opacity-50 cursor-not-allowed'
//                                                                 )}>
//                                                                     {child.label}
//                                                                 </span>
//                                                             )}
//                                                         </SheetClose>
//                                                     ))}
//                                                 </div>
//                                             </AccordionContent>
//                                         </AccordionItem>
//                                     </Accordion>
//                                 ) : (
//                                     <SheetClose asChild key={item.label}>
//                                         {item.href && item.enabled !== false ? (
//                                             <Link
//                                                 href={item.href}
//                                                 className={cn(
//                                                     'block rounded-md px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground'
//                                                 )}
//                                             >
//                                                 {item.label}
//                                             </Link>
//                                         ) : (
//                                             <span className={cn(
//                                                 'block rounded-md px-3 py-3 text-base font-medium',
//                                                 item.enabled === false && 'opacity-50 cursor-not-allowed'
//                                             )}>
//                                                 {item.label}
//                                             </span>
//                                         )}
//                                     </SheetClose>
//                                 )
//                             )}
//                         </nav>
//                     </div>
//                 </SheetContent>
//             </Sheet>
//         </div>
//     );
// };

// export function Navbar() {
//     // Offcanvas Sidepanel State
//     const [openPanel, setOpenPanel] = React.useState(false);
//     const [showChat, setShowChat] = React.useState(false);

//     return (
//         <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//             <div className="container flex h-14 items-center justify-between px-4 md:px-6">
//                 {/* Left Aligned Logo */}
//                 <div className="flex items-center">
//                     <Logo />
//                 </div>

//                 {/* Centered Desktop Navigation */}
//                 <div className="hidden flex-1 justify-center md:flex">
//                     <DesktopNav />
//                 </div>

//                 {/* Right Aligned Controls */}
//                 <div className="flex items-center gap-2">
//                     <ThemeToggle />
//                     <MobileNav />
//                 </div>
//             </div>
//         </header>
//     );
// }

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, User, Settings, LogOut, CreditCard, Users } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AnimatedLogo } from '@/components/shared/AnimatedLogo';

// Define the shape of a navigation item
interface NavItem {
    label: string;
    href?: string;
    children?: NavItem[];
    description?: string;
    enabled?: boolean;
}

// Define the shape of user data
interface UserProfile {
    name: string;
    email: string;
    designation: string;
    avatar?: string;
}

// Define your navigation structure
const navItems: NavItem[] = [
    { label: 'Home', href: '/', enabled: true },
    {
        label: 'About',
        enabled: true,
        children: [
            {
                label: 'About Us',
                href: '/about',
                description: 'Learn about our mission and the team behind SnipCrate.',
                enabled: true,
            },
            {
                label: 'Our Services',
                href: '/about/services',
                description: 'Discover the services we offer to help your business grow.',
                enabled: false,
            },
            {
                label: 'Contact Us',
                href: '/about/contact',
                description: 'Get in touch with our team for support and inquiries.',
                enabled: false,
            }
        ],
    },
];

// Mock user data - replace with your actual user data
const mockUser: UserProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    designation: "Senior Developer",
    avatar: "/api/placeholder/32/32" // Replace with actual avatar URL
};

const Logo = () => (
    <Link
        href="/"
        className="flex items-center gap-2"
        prefetch={false}
        passHref>
        <AnimatedLogo className="h-6 w-auto" aria-label="SnipCrate Logo" />
    </Link>
);

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'> & { disabled?: boolean }
>(({ className, title, children, href, disabled = false, ...props }, ref) => {
    const baseClasses = cn(
        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
        disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        className
    );

    return (
        <li>
            <NavigationMenuLink asChild>
                {href && !disabled ? (
                    <Link
                        href={href}
                        ref={ref}
                        className={baseClasses}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </Link>
                ) : (
                    <span
                        className={baseClasses}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </span>
                )}
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';

const ProfileDropdown = ({ user }: { user: UserProfile }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-auto px-2">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-xs">
                                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.designation}</p>
                        </div>
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
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const DesktopNav = () => {
    const pathname = usePathname();
    return (
        <div className="hidden md:flex">
            <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                    {navItems.map((item) =>
                        item.children ? (
                            <NavigationMenuItem key={item.label}>
                                <NavigationMenuTrigger className="flex items-center gap-1 group data-[state=open]:bg-accent/50">
                                    <span>{item.label}</span>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {item.children.map((child) => (
                                            <ListItem
                                                key={child.label}
                                                href={child.href}
                                                title={child.label}
                                                disabled={child.enabled === false}
                                            >
                                                {child.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ) : (
                            <NavigationMenuItem key={item.label}>
                                {item.href && item.enabled !== false ? (
                                    <Link href={item.href} passHref>
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                            active={pathname === item.href}
                                        >
                                            {item.label}
                                        </NavigationMenuLink>
                                    </Link>
                                ) : (
                                    <span className={cn(
                                        navigationMenuTriggerStyle(),
                                        item.enabled === false && "opacity-50 cursor-not-allowed"
                                    )}>
                                        {item.label}
                                    </span>
                                )}
                            </NavigationMenuItem>
                        )
                    )}
                </NavigationMenuList>
            </NavigationMenu>
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
                <SheetContent side="left" className="w-full max-w-xs pr-0">
                    <div className="p-6 pt-0">
                        <div className="flex items-center justify-between py-4 border-b mb-4">
                            <Logo />
                        </div>

                        {/* Mobile Profile Section */}
                        <div className="flex items-center gap-3 p-3 mb-4 rounded-md bg-accent/50">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                                <AvatarFallback>
                                    {mockUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{mockUser.name}</p>
                                <p className="text-xs text-muted-foreground">{mockUser.designation}</p>
                            </div>
                        </div>

                        <nav className="flex flex-col space-y-1">
                            {navItems.map((item) =>
                                item.children ? (
                                    <Accordion key={item.label} type="single" collapsible>
                                        <AccordionItem value={item.label} className="border-b-0">
                                            <AccordionTrigger className="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors [&[data-state=open]>svg]:rotate-180">
                                                <span>{item.label}</span>
                                            </AccordionTrigger>
                                            <AccordionContent className="pl-4 pb-0">
                                                <div className="flex flex-col space-y-1">
                                                    {item.children.map((child) => (
                                                        <SheetClose asChild key={child.label}>
                                                            {child.href && child.enabled !== false ? (
                                                                <Link
                                                                    href={child.href}
                                                                    className={cn(
                                                                        'block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
                                                                    )}
                                                                >
                                                                    {child.label}
                                                                </Link>
                                                            ) : (
                                                                <span className={cn(
                                                                    'block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground',
                                                                    child.enabled === false && 'opacity-50 cursor-not-allowed'
                                                                )}>
                                                                    {child.label}
                                                                </span>
                                                            )}
                                                        </SheetClose>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ) : (
                                    <SheetClose asChild key={item.label}>
                                        {item.href && item.enabled !== false ? (
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    'block rounded-md px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground'
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
                                )
                            )}

                            {/* Mobile Profile Actions */}
                            <div className="pt-4 border-t space-y-1">
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
                                    <Button variant="ghost" className="w-full justify-start text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </Button>
                                </SheetClose>
                            </div>
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export function Navbar() {
    const [openPanel, setOpenPanel] = React.useState(false);
    const [showChat, setShowChat] = React.useState(false);

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4 md:px-6">
                {/* Left Aligned Logo */}
                <div className="flex items-center">
                    <Logo />
                </div>

                {/* Centered Desktop Navigation */}
                <div className="hidden flex-1 justify-center md:flex">
                    <DesktopNav />
                </div>

                {/* Right Aligned Controls */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    {/* Desktop Profile Dropdown */}
                    <div className="hidden md:block">
                        <ProfileDropdown user={mockUser} />
                    </div>
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
