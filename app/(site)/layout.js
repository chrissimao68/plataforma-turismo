import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Catamaran } from "next/font/google"

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

export default function SiteLayout({ children }) {
  return (
    <div
      className={`${catamaran.className} min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100`}
    >
      <Header />

      {children}

      <Footer />
    </div>
  )
}