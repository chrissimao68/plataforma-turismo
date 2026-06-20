import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Pencil,
  Eye,
  MapPin,
  Image,
  CheckCircle,
  XCircle,
  Camera,
} from "lucide-react";
import DeletePontoButton from "@/components/DeletePontoButton";

export default async function PontosPage() {
  const pontos = await prisma.pontoTuristico.findMany({
    orderBy: {
      criadoEm: "desc",
    },
    include: {
      fotos: true,
    },
  });

  const publicados = pontos.filter((ponto) => ponto.publicado).length;
  const rascunhos = pontos.length - publicados;
  const totalFotos = pontos.reduce(
    (acc, ponto) => acc + ponto.fotos.length,
    0
  );

  return (
    <main className="w-full">
      <div className="mx-auto w-[90%] py-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <MapPin size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              Pontos turísticos
            </h1>

            <p className="text-zinc-500">
              Gerencie locais, categorias, imagens e publicação.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4 w-[90%] mx-auto">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <div className="flex items-center gap-3">
            <MapPin className="text-green-600" />
            <span className="font-medium text-zinc-600">Total</span>
          </div>

          <p className="mt-3 text-3xl font-bold">{pontos.length}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" />
            <span className="font-medium text-zinc-600">Publicados</span>
          </div>

          <p className="mt-3 text-3xl font-bold">{publicados}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <div className="flex items-center gap-3">
            <XCircle className="text-red-600" />
            <span className="font-medium text-zinc-600">Rascunhos</span>
          </div>

          <p className="mt-3 text-3xl font-bold">{rascunhos}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <div className="flex items-center gap-3">
            <Camera className="text-blue-600" />
            <span className="font-medium text-zinc-600">Fotos</span>
          </div>

          <p className="mt-3 text-3xl font-bold">{totalFotos}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200 w-[90%] mx-auto">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr className="text-left text-sm uppercase tracking-wide text-zinc-500">
              <th className="px-6 py-4">Ponto turístico</th>
              <th className="px-6 py-4">Categoria</th>
              <th className="px-6 py-4">Publicado</th>
              <th className="px-6 py-4">Fotos</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {pontos.map((ponto) => (
              <tr key={ponto.id} className="transition hover:bg-zinc-50">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    {ponto.imagem ? (
                      <img
                        src={ponto.imagem}
                        alt={ponto.titulo}
                        className="h-16 w-24 rounded-2xl object-cover shadow-sm ring-1 ring-zinc-200"
                      />
                    ) : (
                      <div className="flex h-16 w-24 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 ring-1 ring-zinc-200">
                        <Image size={22} />
                      </div>
                    )}

                    <div>
                      <p className="font-bold text-zinc-900">
                        {ponto.titulo}
                      </p>

                      <p className="mt-1 max-w-xs truncate text-sm text-zinc-500">
                        {ponto.descricao || "Sem descrição"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {ponto.categoria}
                  </span>
                </td>

                <td className="px-6 py-5">
                  {ponto.publicado ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      <span className="h-2 w-2 rounded-full bg-green-600" />
                      Sim
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                      <span className="h-2 w-2 rounded-full bg-red-600" />
                      Não
                    </span>
                  )}
                </td>

                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    <Camera size={15} />
                    {ponto.fotos.length}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/pontos/${ponto.id}`}
                      target="_blank"
                      className="flex items-center gap-1 rounded-xl bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-700 hover:text-white"
                      title="Ver ponto"
                    >
                      <Eye size={16} />
                    </Link>

                    <Link
                      href={`/admin/editar/${ponto.id}`}
                      className="flex items-center gap-1 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                      title="Editar ponto"
                    >
                      <Pencil size={16} />
                    </Link>

                    <DeletePontoButton id={ponto.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pontos.length === 0 && (
          <div className="p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
              <MapPin className="text-zinc-400" />
            </div>

            <p className="font-semibold text-zinc-700">
              Nenhum ponto turístico cadastrado ainda.
            </p>

            <p className="text-sm text-zinc-500">
              Cadastre o primeiro local para começar.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}