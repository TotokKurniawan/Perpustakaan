"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const publicRoutes = [
      "/",
      "/login",
      "/forgotPassword",
      "/register",
      "/home",
    ];

    if (!token && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }

    if (token && publicRoutes.includes(pathname)) {
      router.push("/dashboard");
    }
  }, [pathname, router]);

  const noSidebar =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/forgotPassword" ||
    pathname === "/register" ||
    pathname === "/home";

  return (
    <>
      {!noSidebar && <Sidebar />}

      <main className={`min-h-screen ${noSidebar ? "" : "ml-64"}`}>
        {children}
      </main>
    </>
  );
}
