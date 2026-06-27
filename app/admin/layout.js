import AdminSidebar from "@/components/AdminSidebar"
import AdminTopbar from "@/components/AdminTopbar"
import { Catamaran } from "next/font/google"

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

export default function AdminLayout({ children }) {
  return (
    <div
      className={`${catamaran.className} min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100`}
    >
      <AdminSidebar />

      <div className="min-h-screen lg:ml-72">
        <AdminTopbar />

        <main className="min-h-[calc(100vh-73px)] overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}