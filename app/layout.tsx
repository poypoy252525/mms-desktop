import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import MobileNotSupportedPage from "./MobileNotSupportedPage";
import ThemeProvider from "./ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memorial Management System",
  description: "System use for Southville 8B cemetery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-muted/40"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MobileNotSupportedPage>
            {true ? (
              <div className="grid lg:grid-cols-[280px_1fr]">
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <div className="h-[60px] w-full"></div>
                  <main className="flex-1 p-6">
                    <div className="container max-w-screen-lg">{children}</div>
                  </main>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-screen">
                {children}
              </div>
            )}
            <Toaster />
          </MobileNotSupportedPage>
        </ThemeProvider>
      </body>
    </html>
  );
}
