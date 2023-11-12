import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster } from "sonner";
import { SearchCommand } from "@/components/search-command";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Jotion",
    description: "The connected workspace where better, faster work happens.",
    icons: {
        icon: [
            {
                media: "(prefers-color-scheme: light)",
                url: "/logo.svg",
                href: "/logo.svg",
            },
            {
                media: "(prefers-color-scheme: dark)",
                url: "/logo-dark.svg",
                href: "/logo-dark.svg",
            },
        ],
    },
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    // defaultTheme="light"
                    enableSystem
                >
                    <ConvexClientProvider>
                        <EdgeStoreProvider>
                            <ModalProvider />

                            <SearchCommand />

                            <Toaster
                                richColors={true}
                                position="top-center"
                                theme="dark"
                            />

                            {children}
                        </EdgeStoreProvider>
                    </ConvexClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
