// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "../components/ThemeRegistry";
import { AuthProvider } from "@/contexts/AuthContext";
import { ResultProvider } from "@/contexts/ResultContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { Toaster } from "react-hot-toast"; // Add Toaster for notifications

export const metadata: Metadata = {
  title: "BCS Questions",
  description: "BCS Question Bank and Exam Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap all providers at the root */}
        <AuthProvider>
          <AdminAuthProvider>
            <ResultProvider>
              <ThemeRegistry>
                {children}
                <Toaster position="bottom-center" />
              </ThemeRegistry>
            </ResultProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}