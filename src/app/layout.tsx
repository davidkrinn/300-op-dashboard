import type { Metadata } from "next"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "Restaurant Franchise Executive Dashboard",
  description: "Insight-led dashboard prototype for multi-state Taco Bell and Pizza Hut operations.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">
        <main className="mx-auto w-full max-w-[1300px] px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  )
}
