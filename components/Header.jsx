"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  CalendarDays,
  Landmark,
  Mail,
  ShieldUser,
  Menu,
  X,
} from "lucide-react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    {
      href: "/",
      label: "Início",
      icon: Home,
    },
    {
      href: "/eventos",
      label: "Eventos",
      icon: CalendarDays,
    },
    {
      href: "/sobre",
      label: "Sobre",
      icon: Landmark,
    },
    {
      href: "#contato",
      label: "Contato",
      icon: Mail,
    },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur transition-colors dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img
            src="/logotransparentefundo.png"
            alt="Logo"
            width={56}
            height={56}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          />

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-green-800 dark:text-green-400 sm:text-xl">
              Encantos de Lavras
            </h1>

            <p className="hidden text-xs text-zinc-500 dark:text-zinc-400 sm:block">
              Plataforma de Turismo
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 font-medium text-zinc-700 transition hover:text-green-700 dark:text-zinc-300 dark:hover:text-green-400"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-lg border border-green-800 px-6 py-2 font-semibold text-green-800 transition hover:bg-green-800 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-zinc-950"
          >
            <ShieldUser size={18} />
            Login ADM
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900 lg:hidden"
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-green-700 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-green-400"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-green-800 px-4 py-3 font-semibold text-green-800 transition hover:bg-green-800 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-zinc-950"
            >
              <ShieldUser size={18} />
              Login ADM
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}