import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guzars CMS",
  description: "A minimal, Vercel/Obsidian styled personal CMS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full flex text-zinc-900 bg-white dark:bg-zinc-950 dark:text-zinc-50 selection:bg-zinc-200 selection:text-zinc-900 dark:selection:bg-zinc-800 dark:selection:text-zinc-50">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {session ? (
              <div className="flex w-full h-full overflow-hidden">
                <Sidebar />
                <main className="flex-grow flex flex-col h-full overflow-hidden relative">
                  <TopNav />
                  <div className="flex-grow overflow-y-auto w-full">
                    {children}
                  </div>
                </main>
              </div>
            ) : (
              <div className="flex w-full h-full overflow-hidden">
                <main className="flex-grow flex flex-col h-full overflow-y-auto">
                  {children}
                </main>
              </div>
            )}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
