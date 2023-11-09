"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const handleChangeTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <>
            <Button variant="secondary" size="icon" onClick={handleChangeTheme}>
                <Sun
                    id="icon-sun-mode-toggle"
                    className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0 "
                />
                <Moon
                    id="icon-moon-mode-toggle"
                    className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100 "
                />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </>
    );
}
