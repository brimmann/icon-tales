import type React from "react";
import Header from "./componnets/common/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}
function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
