"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  MapPin,
  Plus,
  MessageCircle,
  Users,
  Menu,
  X,
} from "lucide-react";

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      href: "/admin",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      href: "/admin/novo",
      icon: Plus,
      label: "Novo ponto turístico",
    },
    {
      href: "/admin/administradores",
      icon: Users,
      label: "Administradores",
    },
    {
      href: "/admin/pontos",
      icon: MapPin,
      label: "Pontos turísticos",
    },
    {
      href: "/admin/comentarios",
      icon: MessageCircle,
      label: "Comentários",
    },
  ];

  return (
    <>
      {/* BOTÃO MOBILE */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed
          left-4
          top-4
          z-50
          rounded-xl
          bg-white
          p-3
          shadow-lg
          lg:hidden
          dark:bg-zinc-900
        "
      >
        <Menu size={22} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-72
          border-r
          border-zinc-200
          bg-white
          p-6
          shadow-xl
          transition-transform
          duration-300

          dark:border-zinc-800
          dark:bg-zinc-950

          ${
            open ? "translate-x-0" : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* Cabeçalho */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-800 dark:text-green-400">
              Encantos de Lavras
            </h1>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Painel administrativo
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navegação */}
        <nav className="space-y-2">
          {links.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                font-medium
                text-zinc-700
                transition-all
                hover:bg-green-50
                hover:text-green-800

                dark:text-zinc-300
                dark:hover:bg-zinc-900
                dark:hover:text-green-400
              "
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Rodapé */}
        <div className="absolute bottom-6 left-6 right-6">
          <div
            className="
              rounded-2xl
              border
              border-green-100
              bg-green-50
              p-4

              dark:border-zinc-800
              dark:bg-zinc-900
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
    </>
  );
}