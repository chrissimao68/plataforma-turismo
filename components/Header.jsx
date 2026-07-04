"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  CalendarDays,
  Landmark,
  MapPinned,
  ShieldUser,
  Menu,
  X,
} from "lucide-react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: "/", label: "Início", icon: Home },
    { href: "/eventos", label: "Eventos", icon: CalendarDays },
    { href: "/sobre", label: "Sobre", icon: Landmark },
    { href: "/todos-pontos", label: "Pontos turísticos", icon: MapPinned },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 shadow-lg shadow-zinc-900/5 backdrop-blur-xl transition-colors dark:border-zinc-800 dark:bg-zinc-950/95 dark:shadow-black/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <img
            src="/logotransparentefundo.png"
            alt="Logo"
            width={56}
            height={56}
            className="h-12 w-12 object-contain drop-shadow-md transition-all duration-300 group-hover:scale-105 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          />

          <div className="min-w-0">
            <h1 className="truncate text-base font-extrabold text-green-800 dark:text-green-400 sm:text-xl">
              Encantos de Lavras
            </h1>

            <p className="hidden text-xs font-medium text-zinc-500 dark:text-zinc-400 sm:block">
              Plataforma de Turismo
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-zinc-700 transition-all duration-300 hover:bg-emerald-50 hover:text-green-700 hover:shadow-md hover:shadow-emerald-900/10 dark:text-zinc-300 dark:hover:bg-emerald-950/30 dark:hover:text-green-400"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <Link href="/login" onClick={() => setMenuOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-green-800 px-7 py-2 font-semibold text-green-800 transition hover:bg-green-800 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-zinc-950" > <ShieldUser size={18} /> Login ADM </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 bg-white text-green-800 shadow-sm transition hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-green-400 dark:hover:bg-zinc-800 lg:hidden"
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 font-semibold text-zinc-700 transition hover:bg-emerald-50 hover:text-green-700 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-green-400"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}

           <Link href="/login" onClick={() => setMenuOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-green-800 px-4 py-3 font-semibold text-green-800 transition hover:bg-green-800 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-zinc-950" > <ShieldUser size={18} /> Login ADM </Link>
          </nav>
        </div>
      )}

      <div className="h-[2px] w-full bg-gradient-to-r from-green-700 via-emerald-500 to-green-700" />
    </header>
  )
}