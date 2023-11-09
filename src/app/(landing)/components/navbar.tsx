"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";
import { useScrollToPosition } from "@/hooks/use-scroll-to-position";
import { ThemeToggle } from "@/components/theme-toggle";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollToPosition(25);

    return (
        <div
            className={cn(
                "fixed top-0 z-50 flex w-full items-center bg-background p-6 transition-all dark:bg-[#1F1F1F]",
                scrolled && "border-b shadow-sm dark:border-b-2 dark:shadow-md",
            )}
        >
            <Logo />
            <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
                {isLoading && <Spinner />}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">
                                Log in
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm">Get Jotion free</Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/documents">Enter Jotion</Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ThemeToggle />
            </div>
        </div>
    );
};
