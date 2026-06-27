import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header
      className="
        sticky top-0 z-30
        border-b border-zinc-200
        bg-white/90
        backdrop-blur-md
        shadow-sm

        dark:border-zinc-800
        dark:bg-zinc-950/90
      "
    >
      <div
  className="
    flex h-20 items-center justify-between
    px-4
    lg:px-8
  "
>
  {/* ESQUERDA */}
  <div className="flex items-center gap-4">
    {/* espaço para o botão do menu no mobile */}
    <div className="w-14 lg:hidden" />

    <div>
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
        Dashboard
      </h2>

      <p className="hidden text-sm text-zinc-500 dark:text-zinc-400 md:block">
        Gerencie o portal turístico.
      </p>
    </div>
  </div>

  {/* DIREITA */}
  <Link
    href="/"
    target="_blank"
    className="
      inline-flex
      items-center
      gap-2
      rounded-xl
      border
      border-zinc-300
      bg-white
      px-4
      py-2.5
      text-sm
      font-semibold
      text-zinc-700
      shadow-sm
      transition-all

      hover:-translate-y-0.5
      hover:border-green-600
      hover:bg-green-50
      hover:text-green-700

      dark:border-zinc-700
      dark:bg-zinc-900
      dark:text-zinc-200
      dark:hover:border-green-500
      dark:hover:bg-green-950
      dark:hover:text-green-400
    "
  >
    <ExternalLink size={17} />

    <span className="hidden sm:block">
      Visitar site
    </span>
  </Link>
</div>
    </header>
  );
}