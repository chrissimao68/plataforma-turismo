import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header
      className="
        sticky top-0 z-30
        border-b border-zinc-200 dark:border-zinc-800
        bg-white/90 dark:bg-zinc-950/90
        px-8 py-4
        backdrop-blur-md
        shadow-sm
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Dashboard
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Gerencie o portal turístico.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="
              flex items-center gap-2
              rounded-xl
              border border-zinc-300 dark:border-zinc-700
              bg-white dark:bg-zinc-900
              px-4 py-2
              text-sm font-semibold
              text-zinc-700 dark:text-zinc-200
              shadow-sm
              transition-all
              hover:border-green-700 dark:hover:border-green-500
              hover:bg-green-50 dark:hover:bg-green-950
              hover:text-green-700 dark:hover:text-green-400
              hover:shadow-md
            "
          >
            <ExternalLink size={16} />
            Ver site
          </Link>
        </div>
      </div>
    </header>
  );
}