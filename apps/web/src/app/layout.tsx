// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "../components/ThemeRegistry";
import { AuthProvider } from "@/contexts/AuthContext";
import { ResultProvider } from "@/contexts/ResultContext";
import { Toaster } from "react-hot-toast";

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
        <AuthProvider>
          <ResultProvider>
            <ThemeRegistry>
              {children}
              <Toaster position="bottom-center" />
            </ThemeRegistry>
          </ResultProvider>
        </AuthProvider>
      </body>
    </html>
  );
}