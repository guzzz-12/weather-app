import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import GlobalContextProvider from "@/context/GlobalContext";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeatherMate | Your Weather Companion",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("flex flex-col h-screen overflow-hidden dark:bg-neutral-900", inter.className)}>
        <GlobalContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableColorScheme
          >
            <NavBar />
            {children}
          </ThemeProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}