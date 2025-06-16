import type React from "react";
import Header from "./componnets/common/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}
function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <main className="min-h-0 flex-1">{children}</main>
    </div>
  );
}

export default MainLayout;
