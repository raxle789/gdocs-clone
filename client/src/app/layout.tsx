import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/error-boundary";
import ErrorPage from "./error";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SyncWrite",
  description: "Collaboration Docs Workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-coolGray antialiased`}
      >
        <ErrorBoundary fallback={<ErrorPage />}>
          {children}
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}
