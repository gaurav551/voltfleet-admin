import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { MainContent } from "@/components/main-content";
import { SidebarProvider } from "@/components/sidebar-context";
import 'leaflet/dist/leaflet.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoltFleet - EV Fleet Management Dashboard",
  description: "Premium EV Fleet Management Operations Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = window.__theme || 'dark';
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>

        {/* Contact / Purchase Banner */}
        <div className="w-full bg-gray-950 border-b border-emerald-500/20 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono z-50">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-emerald-400 border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest">
              Template for Sale
            </span>
            <span className="text-slate-200 font-semibold">Gaurav A</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap text-slate-400">
            <a href="mailto:gauravacharya197@gmail.com" className="hover:text-emerald-400 transition-colors">
              gauravacharya197@gmail.com
            </a>
            <span className="text-slate-700">|</span>
            <a href="tel:+9779814913728" className="hover:text-emerald-400 transition-colors">
              +977 9814913728
            </a>
            <span className="text-slate-700">|</span>
            <a href="https://gauravacharya.com.np" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              gauravacharya.com.np
            </a>
          </div>

          <a
            href="mailto:gauravacharya197@gmail.com?subject=VoltFleet%20Template%20Purchase&body=Hi%20Gaurav%2C%20I%27m%20interested%20in%20purchasing%20the%20VoltFleet%20template."
            className="bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded transition-colors"
          >
            Contact to Buy
          </a>
        </div>

        {/* App Shell */}
        <ThemeProvider defaultTheme="dark">
          <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <MainContent>
                <Navbar />
                <main className="flex-1 overflow-y-auto cyber-grid">
                  <div className="p-6">{children}</div>
                </main>
              </MainContent>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}