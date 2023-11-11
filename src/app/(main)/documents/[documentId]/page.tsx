interface DocumentIdPageProps {
    params: {
        documentId: string;
    };
}
const DocumentIdPage: React.FC<DocumentIdPageProps> = ({ params }) => {
    return <div>DocumentIdPage - {JSON.stringify(params)}</div>;
};

export default DocumentIdPage;
