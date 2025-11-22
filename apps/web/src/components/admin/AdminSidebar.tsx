// apps/web/src/components/admin/AdminSidebar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Admin } from "@/types"; // Import your local Admin type

export default function AdminSidebar() {
  const { logout, admin } = useAdminAuth();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Exams", href: "/admin/exams" },
    { name: "Subjects", href: "/admin/subjects" },
    { name: "Questions", href: "/admin/questions" },
    // Conditionally add link based on role
    // We compare against the string value from your Admin type
    ...(admin?.role === "SUPER_ADMIN"
      ? [{ name: "Manage Admins", href: "/admin/manage-admins" }]
      : []),
  ];

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-900 text-gray-200">
      <h2 className="text-3xl font-semibold text-center text-white">
        BCS Admin
      </h2>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded transition-colors
                    ${
                      pathname === item.href
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-700 hover:text-white"
                    }
                  `}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={logout}
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}