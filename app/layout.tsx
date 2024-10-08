import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import "./globals.css";
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
        <ScrollArea className="w-screen h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MobileNotSupportedPage>
              {true ? (
                <div className="grid lg:grid-cols-[230px_1fr] xl:grid-cols-[280px_1fr] h-screen">
                  <div>
                    <Sidebar />
                  </div>
                  <div className="h-screen max-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-1 overflow-hidden">{children}</main>
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
        </ScrollArea>
      </body>
    </html>
  );
}
