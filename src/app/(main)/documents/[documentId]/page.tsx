"use client";
import { Toolbar } from "@/components/toolbar";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { CoverImage } from "@/components/cover-image";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    };
}
const DocumentIdPage: React.FC<DocumentIdPageProps> = ({ params }) => {
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId,
    });

    return (
        <>
            <div>DocumentIdPage - {JSON.stringify(params)}</div>
            <CoverImage url={document?.coverImage} />
            <div className="mx-auto mt-5 md:max-w-3xl lg:max-w-4xl">
                {document && <Toolbar initialData={document!} />}
                {/* <Editor
          onChange={onChange}
          initialContent={document.content}
        /> */}
            </div>
        </>
    );
};

export default DocumentIdPage;
