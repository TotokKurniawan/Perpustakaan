"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noSidebar = pathname === "/" || pathname === "/login";

  return (
    <>
      {!noSidebar && <Sidebar />}

      <main className={`min-h-screen ${noSidebar ? "" : "ml-64"}`}>
        {children}
      </main>
    </>
  );
}
