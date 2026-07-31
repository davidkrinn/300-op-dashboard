import type { Metadata } from "next"
import "@/app/globals.css"
import Footer from "@/components/Footer"
import { TopNav } from "@/components/layout/TopNav"

export const metadata: Metadata = {
  title: "Restaurant Franchise Executive Dashboard",
  description: "Insight-led dashboard prototype for multi-state Taco Bell and Pizza Hut operations.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">
        <div className="flex flex-col min-h-screen">
          <TopNav />
          <main className="flex-1 flex justify-center">
            <div className="w-full max-w-[1280px] px-12 py-12">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
