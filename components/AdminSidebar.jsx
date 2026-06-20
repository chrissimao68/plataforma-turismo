import Link from "next/link";
import {
  LayoutDashboard,
  MapPin,
  Plus,
  Landmark,
  Utensils,
  CalendarDays,
  Hotel,
  Trees,
  MessageCircle,
  Users,
} from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r bg-white p-5 shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-800">Lavras Turismo</h1>
        <p className="text-sm text-gray-500">Painel administrativo</p>
      </div>

      <nav className="space-y-2">
        <Link href="/admin" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-800">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        

        <Link href="/admin/novo" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-800">
          <Plus size={20} />
          Novo ponto turístico
        </Link>
        <Link href="/admin/administradores" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-800">
  <Users size={18} />
  Administradores
</Link>

        <Link href="/admin/pontos" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-800">
          <MapPin size={20} />
          Pontos turísticos
        </Link>
        <Link
  href="/admin/comentarios"
  className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-800"
>
  <MessageCircle size={20} />
  Comentários
</Link>

       
      </nav>
    </aside>
  );
}