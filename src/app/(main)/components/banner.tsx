"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Id } from "@/../convex/_generated/dataModel";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
    documentId: Id<"documents">;
}

export const Banner: React.FC<BannerProps> = ({ documentId }) => {
    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note.",
        });

        router.push("/documents");
    };

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note.",
        });
    };

    return (
        <div className="flex w-full items-center justify-center gap-x-2 bg-destructive p-2 text-center text-sm text-white">
            <p>This page is in the Trash.</p>
            <Button
                size="sm"
                onClick={onRestore}
                variant="outline"
                className="h-auto border-white bg-transparent px-4 py-2 font-medium text-white hover:bg-white hover:text-destructive"
            >
                Restore page
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size="sm"
                    variant="outline"
                    className="h-auto border-white bg-transparent px-4 py-2 font-medium text-white hover:bg-white hover:text-destructive"
                >
                    Delete forever
                </Button>
            </ConfirmModal>
        </div>
    );
};
