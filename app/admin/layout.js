import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";
import { Catamaran } from "next/font/google";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function AdminLayout({ children }) {
  return (
    <div className={catamaran.className + " min-h-screen bg-gray-100"}>
      <AdminSidebar />

      <div className="ml-72">
        <AdminTopbar />
        {children}
      </div>
    </div>
  );
}