"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // hide header on the landing page and login page
  if (pathname === "/" || pathname === "" || pathname === "/login") return null;

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/books", label: "Books" },
    { href: "/borrower", label: "Borrowers" },
    { href: "/loan", label: "Loans" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-md shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 justify-between">
          {/* left: logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold shadow-sm">
                P
              </div>
              <div className="leading-tight">
                <div className="font-semibold text-gray-900">Perpustakaan</div>
                <div className="text-xs text-gray-500">Manajemen Koleksi</div>
              </div>
            </Link>
          </div>

          {/* center: nav */}
          <div className="flex-1 flex justify-center">
            <nav className="hidden md:flex items-center gap-6">
              {links.map((l) => {
                const active =
                  pathname === l.href ||
                  (l.href !== "/" && pathname?.startsWith(l.href));
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`relative px-3 py-1 text-sm ${
                      active
                        ? "text-indigo-600 font-semibold"
                        : "text-gray-700 hover:text-indigo-600"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute left-0 right-0 -bottom-3 mx-auto h-0.5 w-0.5 rounded-full ${active ? "bg-indigo-600" : "bg-transparent"}`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* right: actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M21 3v18" />
              </svg>
              Keluar
            </Link>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-sm"
              aria-label="Toggle menu"
              onClick={() => setOpen((current) => !current)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <>
                    <path d="M3 12h18" />
                    <path d="M3 6h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>

            <Link
              href="/"
              className="md:hidden inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
            >
              Keluar
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white/95">
          <div className="px-4 py-3 flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-2 py-2 rounded-md ${
                  pathname === l.href
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
