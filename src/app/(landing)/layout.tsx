import React from "react";
import { Navbar } from "./components/navbar";

interface LandingLayoutProps {
    children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
    return (
        <div className="h-full dark:bg-[#1F1F1F]">
            <Navbar />
            <main className="h-full pt-40">{children}</main>
        </div>
    );
};

export default LandingLayout;
