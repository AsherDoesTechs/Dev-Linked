import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import ThemeToggle from "@/app/components/ThemeToggle";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Dev-Linked",
  description: "A Developer Social Hub to Share, Follow and Grow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/img/Logo.png" type="image/png" sizes="32x32" />
      </head>
      <body
        className={`${inter.variable} antialiased bg-white text-black dark:bg-neutral-950 dark:text-white transition-colors duration-300`}
      >
        <UserProvider>
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>

          {children}
        </UserProvider>
      </body>
    </html>
  );
}
