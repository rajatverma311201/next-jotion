import React from "react";

interface AuthRootLayoutProps {
    children: React.ReactNode;
}
const AuthRootLayout: React.FC<AuthRootLayoutProps> = ({ children }) => {
    return <div className="">{children}</div>;
};

export default AuthRootLayout;
