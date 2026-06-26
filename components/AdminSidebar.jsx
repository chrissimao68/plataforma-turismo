import Link from "next/link";
import {
  LayoutDashboard,
  MapPin,
  Plus,
  MessageCircle,
  Users,
} from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside
      className="
        fixed left-0 top-0
        h-screen w-72
        border-r border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-950
        p-6
        shadow-sm
      "
    >
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-green-800 dark:text-green-400">
          Encantos de Lavras
        </h1>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Painel administrativo
        </p>
      </div>

      {/* Navegação */}
      <nav className="space-y-2">
        <Link
          href="/admin"
          className="
            flex items-center gap-3
            rounded-xl
            px-4 py-3
            font-medium
            text-zinc-700 dark:text-zinc-300
            transition-all
            hover:bg-green-50 dark:hover:bg-zinc-900
            hover:text-green-800 dark:hover:text-green-400
          "
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/admin/novo"
          className="
            flex items-center gap-3
            rounded-xl
            px-4 py-3
            font-medium
            text-zinc-700 dark:text-zinc-300
            transition-all
            hover:bg-green-50 dark:hover:bg-zinc-900
            hover:text-green-800 dark:hover:text-green-400
          "
        >
          <Plus size={20} />
          Novo ponto turístico
        </Link>

        <Link
          href="/admin/administradores"
          className="
            flex items-center gap-3
            rounded-xl
            px-4 py-3
            font-medium
            text-zinc-700 dark:text-zinc-300
            transition-all
            hover:bg-green-50 dark:hover:bg-zinc-900
            hover:text-green-800 dark:hover:text-green-400
          "
        >
          <Users size={20} />
          Administradores
        </Link>

        <Link
          href="/admin/pontos"
          className="
            flex items-center gap-3
            rounded-xl
            px-4 py-3
            font-medium
            text-zinc-700 dark:text-zinc-300
            transition-all
            hover:bg-green-50 dark:hover:bg-zinc-900
            hover:text-green-800 dark:hover:text-green-400
          "
        >
          <MapPin size={20} />
          Pontos turísticos
        </Link>

        <Link
          href="/admin/comentarios"
          className="
            flex items-center gap-3
            rounded-xl
            px-4 py-3
            font-medium
            text-zinc-700 dark:text-zinc-300
            transition-all
            hover:bg-green-50 dark:hover:bg-zinc-900
            hover:text-green-800 dark:hover:text-green-400
          "
        >
          <MessageCircle size={20} />
          Comentários
        </Link>
      </nav>

      {/* Rodapé */}
      <div className="absolute bottom-6 left-6 right-6">
        <div
          className="
            rounded-2xl
            border border-green-100 dark:border-zinc-800
            bg-green-50 dark:bg-zinc-900
            p-4
          "
        >
          <p className="text-sm font-semibold text-green-800 dark:text-green-400">
            Encantos de Lavras
          </p>

          <p className="mt-1 text-xs text-green-700 dark:text-zinc-400">
            Plataforma de Turismo
          </p>
        </div>
      </div>
    </aside>
  );
}