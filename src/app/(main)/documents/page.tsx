"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
    const router = useRouter();
    const { user } = useUser();

    return (
        <div className="flex h-full flex-col items-center justify-center space-y-4">
            <Image
                src="/empty.png"
                height="300"
                width="300"
                alt="Empty"
                className="dark:hidden"
            />
            <Image
                src="/empty-dark.png"
                height="300"
                width="300"
                alt="Empty"
                className="hidden dark:block"
            />
            <h2 className="text-xl font-medium">
                Welcome to {user?.firstName}&apos;s Jotion
            </h2>
            <Button
            // onClick={onCreate}
            >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create a note
            </Button>
        </div>
    );
};

export default DocumentsPage;
