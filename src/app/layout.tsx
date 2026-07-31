import type { Metadata } from "next"
import "@/app/globals.css"
import { TopNav } from "@/components/layout/TopNav"

export const metadata: Metadata = {
  title: "Restaurant Franchise Executive Dashboard",
  description: "Insight-led dashboard prototype for multi-state Taco Bell and Pizza Hut operations.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body bg-slate-50">
        <div className="flex flex-col min-h-screen">

          {/* Full-width header */}
          <header className="w-full border-b border-slate-200 bg-white">
            <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 py-5">
              <TopNav />
            </div>
          </header>

          {/* Centered, responsive main content */}
          <main className="flex-1 w-full">
            <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 py-8">
              {children}
            </div>
          </main>

          {/* Full-width footer */}
          <footer className="w-full bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 mt-[200px]">
            <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 h-[50px] flex items-center justify-center">
              <span className="text-white text-sm font-medium tracking-wide">
                Taco Hut Enterprises &copy; 2026
              </span>
            </div>
          </footer>

        </div>
      </body>
    </html>
  )
}
