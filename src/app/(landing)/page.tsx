import React from "react";
import { Heading } from "./components/heading";
import { Heroes } from "./components/heroes";
import { Footer } from "./components/footer";

const LandingPage = () => {
    return (
        <div className="flex min-h-full flex-col dark:bg-[#1F1F1F]">
            <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-start">
                <Heading />
                <Heroes />
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
