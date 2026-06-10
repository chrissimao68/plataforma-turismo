import Link from "next/link";
import { MapPin } from "lucide-react";

export default function CardPonto({ ponto }) {
  return (
    <Link
      href={`/pontos/${ponto.id}`}
      className="group overflow-hidden rounded-xl bg-white shadow hover:shadow-lg transition"
    >
      {ponto.imagem ? (
        <img
          src={ponto.imagem}
          alt={ponto.titulo}
          className="h-52 w-full object-cover transition group-hover:scale-105"
        />
      ) : (
        <div className="flex h-52 w-full items-center justify-center bg-gray-200 text-gray-500">
          sem imagem
        </div>
      )}

      <div className="p-5">
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {ponto.categoria}
        </span>

        <h2 className="mt-3 text-xl font-bold text-gray-900">
          {ponto.titulo}
        </h2>

        <p className="mt-2 line-clamp-3 text-sm text-gray-600">
          {ponto.descricao}
        </p>

        {ponto.endereco && (
          <p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={16} />
            {ponto.endereco}
          </p>
        )}
      </div>
    </Link>
  );
}