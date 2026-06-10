import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="ml-72">
        <AdminTopbar />
        {children}
      </div>
    </div>
  );
}