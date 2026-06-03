"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/login") return null;

  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Books",
      href: "/books",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Borrowers",
      href: "/borrower",
      icon: <Users size={20} />,
    },
    {
      name: "Loans",
      href: "/loan",
      icon: <ClipboardList size={20} />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b">
        <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
          P
        </div>

        <div className="ml-3">
          <h1 className="font-bold text-gray-800">Perpustakaan</h1>

          <p className="text-xs text-gray-500">Management System</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menus.map((menu) => {
            const active =
              pathname === menu.href || pathname.startsWith(menu.href);

            return (
              <li key={menu.href}>
                <Link
                  href={menu.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? "bg-indigo-100 text-indigo-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {menu.icon}
                  {menu.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-4 left-4 right-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-lg hover:bg-red-100 transition"
        >
          <LogOut size={18} />
          Logout
        </Link>
      </div>
    </aside>
  );
}
