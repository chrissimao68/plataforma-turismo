import { prisma } from "@/lib/prisma"
import {
  Star,
  MessageCircle,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react"
import ComentarioActions from "@/components/ComentarioActions"

export default async function ComentariosAdminPage() {
  const comentarios = await prisma.comentario.findMany({
    orderBy: {
      criadoEm: "desc",
    },
    include: {
      pontoTuristico: {
        select: {
          titulo: true,
          id: true,
        },
      },
    },
  })

  const publicados = comentarios.filter((item) => item.aprovado).length
  const pendentes = comentarios.length - publicados

  return (
    <main className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex items-center gap-4 sm:mb-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 sm:h-14 sm:w-14">
            <MessageCircle size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              Comentários
            </h1>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
              Aprove ou exclua avaliações enviadas pelos visitantes.
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ResumoCard
            icon={<MessageCircle />}
            label="Total"
            value={comentarios.length}
            color="green"
          />

          <ResumoCard
            icon={<CheckCircle />}
            label="Publicados"
            value={publicados}
            color="green"
          />

          <ResumoCard
            icon={<Clock />}
            label="Pendentes"
            value={pendentes}
            color="yellow"
          />
        </div>

        {/* MOBILE / TABLET */}
        <div className="grid gap-4 lg:hidden">
          {comentarios.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar nome={item.nome} />

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.nome}
                    </p>

                    <p className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
                      <MapPin size={14} className="shrink-0" />
                      <span className="truncate">{item.cidade}</span>
                    </p>
                  </div>
                </div>

                <StatusBadge aprovado={item.aprovado} />
              </div>

              <div className="mt-4 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-950">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Ponto turístico
                </p>

                <p className="mt-1 font-medium text-zinc-800 dark:text-zinc-200">
                  {item.pontoTuristico?.titulo || "Ponto removido"}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Stars nota={item.nota} />

                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  {item.nota}/5
                </span>
              </div>

              <p className="mt-4 rounded-2xl bg-zinc-50 px-4 py-3 text-sm leading-7 text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300">
                {item.comentario}
              </p>

              <div className="mt-4 flex justify-end">
                <ComentarioActions id={item.id} aprovado={item.aprovado} />
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
                  <th className="px-6 py-4">Visitante</th>
                  <th className="px-6 py-4">Ponto turístico</th>
                  <th className="px-6 py-4">Nota</th>
                  <th className="px-6 py-4">Comentário</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {comentarios.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-zinc-50 dark:hover:bg-zinc-950"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Avatar nome={item.nome} />

                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {item.nome}
                          </p>

                          <p className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
                            <MapPin size={14} />
                            {item.cidade}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-medium text-zinc-800 dark:text-zinc-200">
                        {item.pontoTuristico?.titulo || "Ponto removido"}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Stars nota={item.nota} />

                        <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                          {item.nota}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="max-w-sm rounded-2xl bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300">
                        {item.comentario}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge aprovado={item.aprovado} />
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end">
                        <ComentarioActions
                          id={item.id}
                          aprovado={item.aprovado}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {comentarios.length === 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <MessageCircle className="text-zinc-400 dark:text-zinc-500" />
            </div>

            <p className="font-semibold text-zinc-700 dark:text-zinc-300">
              Nenhum comentário enviado ainda.
            </p>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              As avaliações dos visitantes aparecerão aqui.
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
    yellow: "text-yellow-600 dark:text-yellow-400",
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

function Avatar({ nome }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-700 font-bold text-white">
      {nome?.charAt(0).toUpperCase()}
    </div>
  )
}

function Stars({ nota }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((estrela) => (
        <Star
          key={estrela}
          size={16}
          className={
            estrela <= nota
              ? "fill-yellow-400 text-yellow-400"
              : "text-zinc-300 dark:text-zinc-700"
          }
        />
      ))}
    </div>
  )
}

function StatusBadge({ aprovado }) {
  return aprovado ? (
    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
      <span className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
      Publicado
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
      <span className="h-2 w-2 rounded-full bg-yellow-500 dark:bg-yellow-400" />
      Pendente
    </span>
  )
}