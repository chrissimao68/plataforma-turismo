import Link from "next/link"
import { MapPin, Star, ImageIcon, ChevronRight } from "lucide-react"

const categoriaStyles = {
  NATUREZA: {
    badge: "from-emerald-500 to-green-700",
    text: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    icon: "text-emerald-600 dark:text-emerald-400",
    border: "hover:border-emerald-500/50 dark:hover:border-emerald-500/50",
    shadow: "dark:hover:shadow-emerald-950/40",
  },
  CULTURA: {
    badge: "from-violet-500 to-purple-700",
    text: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    icon: "text-violet-600 dark:text-violet-400",
    border: "hover:border-violet-500/50 dark:hover:border-violet-500/50",
    shadow: "dark:hover:shadow-violet-950/40",
  },
  GASTRONOMIA: {
    badge: "from-orange-400 to-amber-700",
    text: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
    icon: "text-orange-600 dark:text-orange-400",
    border: "hover:border-orange-500/50 dark:hover:border-orange-500/50",
    shadow: "dark:hover:shadow-orange-950/40",
  },
  EVENTOS: {
    badge: "from-rose-500 to-pink-700",
    text: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    icon: "text-rose-600 dark:text-rose-400",
    border: "hover:border-rose-500/50 dark:hover:border-rose-500/50",
    shadow: "dark:hover:shadow-rose-950/40",
  },
  HOSPEDAGEM: {
    badge: "from-sky-500 to-blue-700",
    text: "group-hover:text-sky-600 dark:group-hover:text-sky-400",
    icon: "text-sky-600 dark:text-sky-400",
    border: "hover:border-sky-500/50 dark:hover:border-sky-500/50",
    shadow: "dark:hover:shadow-sky-950/40",
  },
}

function getCategoriaStyle(categoria) {
  return (
    categoriaStyles[categoria] || {
      badge: "from-zinc-500 to-zinc-700",
      text: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
      icon: "text-emerald-600 dark:text-emerald-400",
      border: "hover:border-emerald-500/50 dark:hover:border-emerald-500/50",
      shadow: "dark:hover:shadow-emerald-950/40",
    }
  )
}

export default function CardPonto({ ponto }) {
  const totalComentarios = ponto.comentarios?.length || 0
  const style = getCategoriaStyle(ponto.categoria)

  const media =
    totalComentarios > 0
      ? (
          ponto.comentarios.reduce(
            (acc, comentario) => acc + comentario.nota,
            0
          ) / totalComentarios
        ).toFixed(1)
      : null

  return (
    <Link
      href={`/pontos/${ponto.id}`}
      className={`
        group block overflow-hidden rounded-2xl border border-zinc-200
        bg-white shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        dark:border-zinc-800 dark:bg-zinc-900
        ${style.border} ${style.shadow}
        sm:rounded-3xl
      `}
    >
      <div className="grid grid-cols-[96px_1fr_24px] items-center gap-3 p-3 sm:hidden">
        {ponto.imagem ? (
          <img
            src={ponto.imagem}
            alt={ponto.titulo}
            className="h-24 w-24 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
            <ImageIcon size={22} />
          </div>
        )}

        <div className="min-w-0 self-center">
          <span
            className={`inline-flex rounded-full bg-gradient-to-r ${style.badge} px-2.5 py-1 text-[10px] font-bold uppercase leading-none tracking-wide text-white shadow-md`}
          >
            {ponto.categoria}
          </span>

          <h2
            className={`mt-2 line-clamp-1 text-base font-bold leading-tight text-zinc-900 transition-colors dark:text-zinc-100 ${style.text}`}
          >
            {ponto.titulo}
          </h2>

          <p className="mt-1 line-clamp-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
            {ponto.descricao}
          </p>

          {ponto.endereco && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
              <MapPin size={13} className={`shrink-0 ${style.icon}`} />
              <span className="line-clamp-1">{ponto.endereco}</span>
            </p>
          )}
        </div>

        <ChevronRight
          size={22}
          className={`justify-self-end text-zinc-400 transition dark:text-zinc-500 ${style.icon}`}
        />
      </div>

      <div className="hidden sm:block">
        {ponto.imagem ? (
          <div className="relative h-56 overflow-hidden lg:h-60">
            <img
              src={ponto.imagem}
              alt={ponto.titulo}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          </div>
        ) : (
          <div className="flex h-56 flex-col items-center justify-center gap-2 bg-zinc-100 text-sm text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400 lg:h-60">
            <ImageIcon size={28} />
            Sem imagem
          </div>
        )}

        <div className="p-6">
          <span
            className={`inline-flex rounded-full bg-gradient-to-r ${style.badge} px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md`}
          >
            {ponto.categoria}
          </span>

          <h2
            className={`mt-4 line-clamp-2 text-2xl font-bold text-zinc-900 transition-colors dark:text-zinc-100 ${style.text}`}
          >
            {ponto.titulo}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {ponto.descricao}
          </p>

          <div className="mt-5 flex flex-col gap-3">
            {ponto.endereco && (
              <p className="flex items-start gap-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                <MapPin size={16} className={`mt-1 shrink-0 ${style.icon}`} />
                <span className="line-clamp-2">{ponto.endereco}</span>
              </p>
            )}

            {media && (
              <div className="flex items-center gap-2">
                <Star size={17} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {media}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  ({totalComentarios} avaliações)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}