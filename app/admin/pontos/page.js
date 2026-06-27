import Link from "next/link"
import { prisma } from "@/lib/prisma"
import {
  Pencil,
  Eye,
  MapPin,
  Image,
  CheckCircle,
  XCircle,
  Camera,
} from "lucide-react"
import DeletePontoButton from "@/components/DeletePontoButton"

export default async function PontosPage() {
  const pontos = await prisma.pontoTuristico.findMany({
    orderBy: {
      criadoEm: "desc",
    },
    include: {
      fotos: true,
    },
  })

  const publicados = pontos.filter((ponto) => ponto.publicado).length
  const rascunhos = pontos.length - publicados

  const totalFotos = pontos.reduce(
    (acc, ponto) => acc + ponto.fotos.length,
    0
  )

  return (
    <main className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex items-center gap-4 sm:mb-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 sm:h-14 sm:w-14">
            <MapPin size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              Pontos turísticos
            </h1>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
              Gerencie locais, categorias, imagens e publicação.
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ResumoCard
            icon={<MapPin />}
            label="Total"
            value={pontos.length}
            color="green"
          />

          <ResumoCard
            icon={<CheckCircle />}
            label="Publicados"
            value={publicados}
            color="green"
          />

          <ResumoCard
            icon={<XCircle />}
            label="Rascunhos"
            value={rascunhos}
            color="red"
          />

          <ResumoCard
            icon={<Camera />}
            label="Fotos"
            value={totalFotos}
            color="blue"
          />
        </div>

        {/* MOBILE / TABLET */}
        <div className="grid gap-4 lg:hidden">
          {pontos.map((ponto) => (
            <article
              key={ponto.id}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              {ponto.imagem ? (
                <img
                  src={ponto.imagem}
                  alt={ponto.titulo}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="flex h-44 w-full items-center justify-center bg-zinc-100 text-zinc-400 dark:bg-zinc-950 dark:text-zinc-500">
                  <Image size={28} />
                </div>
              )}

              <div className="p-4">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <CategoriaBadge categoria={ponto.categoria} />
                  <PublicadoBadge publicado={ponto.publicado} />
                  <FotosBadge total={ponto.fotos.length} />
                </div>

                <h2 className="line-clamp-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {ponto.titulo}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  {ponto.descricao || "Sem descrição"}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Link
                    href={`/pontos/${ponto.id}`}
                    target="_blank"
                    className="flex items-center justify-center gap-1 rounded-xl bg-zinc-100 px-3 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-700 hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
                    title="Ver ponto"
                  >
                    <Eye size={16} />
                    Ver
                  </Link>

                  <Link
                    href={`/admin/editar/${ponto.id}`}
                    className="flex items-center justify-center gap-1 rounded-xl bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
                    title="Editar ponto"
                  >
                    <Pencil size={16} />
                    Editar
                  </Link>

                  <div className="flex justify-center">
                    <DeletePontoButton id={ponto.id} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* DESKTOP */}
        <div className="hidden overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:block">
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
                      <CategoriaBadge categoria={ponto.categoria} />
                    </td>

                    <td className="px-6 py-5">
                      <PublicadoBadge publicado={ponto.publicado} />
                    </td>

                    <td className="px-6 py-5">
                      <FotosBadge total={ponto.fotos.length} />
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
        </div>

        {pontos.length === 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-12">
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
    </main>
  )
}

function ResumoCard({ icon, label, value, color }) {
  const colors = {
    green: "text-green-600 dark:text-green-400",
    red: "text-red-600 dark:text-red-400",
    blue: "text-blue-600 dark:text-blue-400",
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <div className={colors[color]}>{icon}</div>

        <span className="font-medium text-zinc-600 dark:text-zinc-400">
          {label}
        </span>
      </div>

      <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {value}
      </p>
    </div>
  )
}

function CategoriaBadge({ categoria }) {
  return (
    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-300">
      {categoria}
    </span>
  )
}

function PublicadoBadge({ publicado }) {
  return publicado ? (
    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
      <span className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
      Sim
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-950 dark:text-red-300">
      <span className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-400" />
      Não
    </span>
  )
}

function FotosBadge({ total }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
      <Camera size={15} />
      {total}
    </span>
  )
}