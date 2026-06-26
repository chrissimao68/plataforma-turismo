import Link from "next/link";
import { MapPin, Star } from "lucide-react";

export default function CardPonto({ ponto }) {
  const totalComentarios = ponto.comentarios?.length || 0;

  const media =
    totalComentarios > 0
      ? (
          ponto.comentarios.reduce(
            (acc, comentario) => acc + comentario.nota,
            0
          ) / totalComentarios
        ).toFixed(1)
      : null;

  return (
    <Link
      href={`/pontos/${ponto.id}`}
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-zinc-300
        bg-zinc-100
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-emerald-500/40
        hover:bg-white
        hover:shadow-2xl

        dark:border-zinc-700
        dark:bg-zinc-800/90
        dark:backdrop-blur-sm
        dark:hover:border-emerald-500/40
        dark:hover:bg-zinc-800
        dark:hover:shadow-emerald-950/40
      "
    >
      {/* Imagem */}
      {ponto.imagem ? (
        <div className="overflow-hidden">
          <img
            src={ponto.imagem}
            alt={ponto.titulo}
            className="
              h-60
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />
        </div>
      ) : (
        <div
          className="
            flex
            h-60
            items-center
            justify-center
            bg-zinc-100
            text-zinc-500

            dark:bg-zinc-900
            dark:text-zinc-400
          "
        >
          Sem imagem
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-6">
        <span
          className="
            inline-flex
            rounded-full
            bg-emerald-100
            px-4
            py-1.5
            text-xs
            font-bold
            uppercase
            tracking-wide
            text-emerald-700

            dark:bg-emerald-900/40
            dark:text-emerald-300
          "
        >
          {ponto.categoria}
        </span>

        <h2
          className="
            mt-4
            line-clamp-2
            text-2xl
            font-bold
            text-zinc-900
            transition-colors
            group-hover:text-emerald-700

            dark:text-white
            dark:group-hover:text-emerald-400
          "
        >
          {ponto.titulo}
        </h2>

        <p
          className="
            mt-3
            line-clamp-3
            text-sm
            leading-7
            text-zinc-600

            dark:text-zinc-300
          "
        >
          {ponto.descricao}
        </p>

        {ponto.endereco && (
          <p
            className="
              mt-5
              flex
              items-center
              gap-2
              text-sm
              text-zinc-500

              dark:text-zinc-400
            "
          >
            <MapPin
              size={16}
              className="
                text-emerald-600
                dark:text-emerald-400
              "
            />
            {ponto.endereco}
          </p>
        )}

        {media && (
          <div
            className="
              mt-5
              flex
              items-center
              gap-2
            "
          >
            <Star
              size={17}
              className="
                fill-yellow-400
                text-yellow-400
              "
            />

            <span
              className="
                font-bold
                text-zinc-900

                dark:text-white
              "
            >
              {media}
            </span>

            <span
              className="
                text-sm
                text-zinc-500

                dark:text-zinc-400
              "
            >
              ({totalComentarios} avaliações)
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}