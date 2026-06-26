import Link from "next/link";
import {
  Home,
  CalendarDays,
  Landmark,
  Mail,
  ShieldUser,
} from "lucide-react";

export default function Header() {
  return (
    <header className=" top-0 z-50 border-b  border-zinc-200 bg-white/95 backdrop-blur transition-colors dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logotransparentefundo.png"
            alt="Logo"
            width={64}
            height={64}
            className="object-contain"
          />

          <div>
            <h1 className="text-xl font-bold text-green-800 dark:text-green-400">
              Encantos de Lavras
            </h1>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Plataforma de Turismo
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium text-zinc-700 transition hover:text-green-700 dark:text-zinc-300 dark:hover:text-green-400"
          >
            <Home size={18} />
            Início
          </Link>

          <Link
            href="/eventos"
            className="flex items-center gap-2 font-medium text-zinc-700 transition hover:text-green-700 dark:text-zinc-300 dark:hover:text-green-400"
          >
            <CalendarDays size={18} />
            Eventos
          </Link>

          <Link
            href="/sobre"
            className="flex items-center gap-2 font-medium text-zinc-700 transition hover:text-green-700 dark:text-zinc-300 dark:hover:text-green-400"
          >
            <Landmark size={18} />
            Sobre
          </Link>

          <Link
            href="#contato"
            className="flex items-center gap-2 font-medium text-zinc-700 transition hover:text-green-700 dark:text-zinc-300 dark:hover:text-green-400"
          >
            <Mail size={18} />
            Contato
          </Link>
        </nav>

        <Link
          href="/login"
          className="flex items-center gap-2 rounded-lg border border-green-800 px-10 py-2 font-semibold text-green-800 transition hover:bg-green-800 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-zinc-950"
        >
          <ShieldUser size={18} />
          Login ADM
        </Link>
      </div>
    </header>
  );
}