import type React from "react";
import Header from "./componnets/common/Header";
import { useDataStore } from "./store/dataStore";
import { useEffect } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}
function MainLayout({ children }: MainLayoutProps) {
  const loadTalesMetaData = useDataStore((state) => state.loadTalesMetaData);
  useEffect(() => {
    loadTalesMetaData();
  }, []);

  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <main className="min-h-0 flex-1">{children}</main>
    </div>
  );
}

export default MainLayout;
