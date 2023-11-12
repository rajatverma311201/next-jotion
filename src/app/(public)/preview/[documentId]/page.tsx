"use client";
import { Toolbar } from "@/components/toolbar";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { CoverImage } from "@/components/cover-image";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { ThemeToggle } from "@/components/theme-toggle";
import NoteEditor from "@/components/note-editor";
import { Spinner } from "@/components/spinner";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    };
}
const DocumentIdPage: React.FC<DocumentIdPageProps> = ({ params }) => {
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId,
    });

    const update = useMutation(api.documents.update);

    const onChange = (content: string) => {
        update({
            id: params.documentId,
            content,
        });
    };

    if (document === undefined) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Spinner size={"lg"} />
            </div>
        );
    }

    return (
        <>
            <div className="absolute z-50 ">
                <ThemeToggle />
            </div>
            <div className="pb-40">
                <CoverImage preview url={document?.coverImage} />
                <div className="mx-auto mt-5 md:max-w-3xl lg:max-w-4xl">
                    {document && <Toolbar preview initialData={document!} />}
                    {document && (
                        <NoteEditor
                            editable={false}
                            onChange={onChange}
                            initialContent={document?.content}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default DocumentIdPage;
