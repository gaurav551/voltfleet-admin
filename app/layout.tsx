import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { MainContent } from "@/components/main-content";
import { SidebarProvider } from "@/components/sidebar-context";
import 'leaflet/dist/leaflet.css';  // ✅ add here

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
        <ThemeProvider defaultTheme="dark">
          <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content Area — margin handled by client component */}
              <MainContent>
                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
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