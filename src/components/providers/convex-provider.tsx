"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface ConvexClientProviderProps {
    children: ReactNode;
}

export const ConvexClientProvider: React.FC<ConvexClientProviderProps> = ({
    children,
}) => {
    const { theme } = useTheme();
    let appearanceTheme = {};
    if (theme === "dark") {
        appearanceTheme = { baseTheme: dark };
    }

    return (
        <ClerkProvider
            appearance={appearanceTheme}
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        >
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};
