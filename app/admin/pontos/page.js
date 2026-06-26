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
    <main className="w-full p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400">
            <MapPin size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Pontos turísticos
            </h1>

            <p className="text-zinc-500 dark:text-zinc-400">
              Gerencie locais, categorias, imagens e publicação.
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <MapPin className="text-green-600 dark:text-green-400" />
              <span className="font-medium text-zinc-600 dark:text-zinc-400">
                Total
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {pontos.length}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600 dark:text-green-400" />
              <span className="font-medium text-zinc-600 dark:text-zinc-400">
                Publicados
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {publicados}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <XCircle className="text-red-600 dark:text-red-400" />
              <span className="font-medium text-zinc-600 dark:text-zinc-400">
                Rascunhos
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {rascunhos}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <Camera className="text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-zinc-600 dark:text-zinc-400">
                Fotos
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {totalFotos}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead className="bg-zinc-50 dark:bg-zinc-950">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <th className="px-6 py-4">Ponto turístico</th>
                  <th className="px-6 py-4">Categoria</th>
                  <th className="px-6 py-4">Publicado</th>
                  <th className="px-6 py-4">Fotos</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {pontos.map((ponto) => (
                  <tr
                    key={ponto.id}
                    className="transition hover:bg-zinc-50 dark:hover:bg-zinc-950"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {ponto.imagem ? (
                          <img
                            src={ponto.imagem}
                            alt={ponto.titulo}
                            className="h-16 w-24 rounded-2xl object-cover shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800"
                          />
                        ) : (
                          <div className="flex h-16 w-24 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-500 dark:ring-zinc-700">
                            <Image size={22} />
                          </div>
                        )}

                        <div>
                          <p className="font-bold text-zinc-900 dark:text-zinc-100">
                            {ponto.titulo}
                          </p>

                          <p className="mt-1 max-w-xs truncate text-sm text-zinc-500 dark:text-zinc-400">
                            {ponto.descricao || "Sem descrição"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-300">
                        {ponto.categoria}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {ponto.publicado ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
                          <span className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
                          Sim
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-950 dark:text-red-300">
                          <span className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-400" />
                          Não
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        <Camera size={15} />
                        {ponto.fotos.length}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/pontos/${ponto.id}`}
                          target="_blank"
                          className="flex items-center gap-1 rounded-xl bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-700 hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
                          title="Ver ponto"
                        >
                          <Eye size={16} />
                        </Link>

                        <Link
                          href={`/admin/editar/${ponto.id}`}
                          className="flex items-center gap-1 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
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
          </div>

          {pontos.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <MapPin className="text-zinc-400 dark:text-zinc-500" />
              </div>

              <p className="font-semibold text-zinc-700 dark:text-zinc-300">
                Nenhum ponto turístico cadastrado ainda.
              </p>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Cadastre o primeiro local para começar.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}