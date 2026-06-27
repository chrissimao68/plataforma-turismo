import { prisma } from "@/lib/prisma"
import { aprovarAdmin, excluirAdmin } from "@/app/actions/auth"
import {
  CheckCircle,
  Trash2,
  Users,
  UserCheck,
  Clock,
  Shield,
} from "lucide-react"

export default async function AdministradoresForm() {
  const administradores = await prisma.administrador.findMany({
    orderBy: {
      id: "desc",
    },
  })

  const aprovados = administradores.filter((admin) => admin.aprovado).length
  const pendentes = administradores.length - aprovados

  return (
    <section className="mt-2" id="administradores">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md sm:h-14 sm:w-14">
            <Users size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              Administradores
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
              Gerencie os acessos ao painel administrativo.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ResumoCard
          icon={<Shield />}
          label="Total"
          value={administradores.length}
          color="blue"
        />

        <ResumoCard
          icon={<UserCheck />}
          label="Aprovados"
          value={aprovados}
          color="green"
        />

        <ResumoCard
          icon={<Clock />}
          label="Pendentes"
          value={pendentes}
          color="yellow"
        />
      </div>

      {/* MOBILE CARDS */}
      <div className="grid gap-4 md:hidden">
        {administradores.map((admin) => (
          <div
            key={admin.id}
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar usuario={admin.usuario} />

                <div className="min-w-0">
                  <p className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
                    {admin.usuario}
                  </p>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Administrador
                  </p>
                </div>
              </div>

              <StatusBadge aprovado={admin.aprovado} />
            </div>

            <div className="mt-4 rounded-xl bg-zinc-50 p-3 text-sm text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
              Criado em:{" "}
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {admin.criadoEm
                  ? new Date(admin.criadoEm).toLocaleDateString("pt-BR")
                  : "-"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {!admin.aprovado && (
                <form action={aprovarAdmin.bind(null, admin.id)}>
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500">
                    <CheckCircle size={16} />
                    Aceitar
                  </button>
                </form>
              )}

              <form
                action={excluirAdmin.bind(null, admin.id)}
                className={!admin.aprovado ? "" : "col-span-2"}
              >
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-600 dark:hover:text-white">
                  <Trash2 size={16} />
                  Excluir
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABELA */}
      <div className="hidden overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="bg-zinc-50 dark:bg-zinc-950">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Criado em</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {administradores.map((admin) => (
                <tr
                  key={admin.id}
                  className="transition hover:bg-zinc-50 dark:hover:bg-zinc-950"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <Avatar usuario={admin.usuario} />

                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {admin.usuario}
                        </p>

                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Administrador
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge aprovado={admin.aprovado} />
                  </td>

                  <td className="px-6 py-5 text-zinc-500 dark:text-zinc-400">
                    {admin.criadoEm
                      ? new Date(admin.criadoEm).toLocaleDateString("pt-BR")
                      : "-"}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      {!admin.aprovado && (
                        <form action={aprovarAdmin.bind(null, admin.id)}>
                          <button className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-green-700 hover:shadow-md dark:bg-green-600 dark:hover:bg-green-500">
                            <CheckCircle size={16} />
                            Aceitar
                          </button>
                        </form>
                      )}

                      <form action={excluirAdmin.bind(null, admin.id)}>
                        <button className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-600 dark:hover:text-white">
                          <Trash2 size={16} />
                          Excluir
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {administradores.length === 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-12">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <Users size={28} className="text-zinc-400 dark:text-zinc-500" />
          </div>

          <p className="font-semibold text-zinc-700 dark:text-zinc-300">
            Nenhum administrador cadastrado.
          </p>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Novas solicitações aparecerão aqui.
          </p>
        </div>
      )}
    </section>
  )
}

function ResumoCard({ icon, label, value, color }) {
  const colors = {
    blue: "text-blue-600 dark:text-blue-400",
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

function Avatar({ usuario }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-600 font-bold text-white">
      {usuario?.charAt(0).toUpperCase()}
    </div>
  )
}

function StatusBadge({ aprovado }) {
  return aprovado ? (
    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
      <span className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
      Aceito
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
      <span className="h-2 w-2 rounded-full bg-yellow-500 dark:bg-yellow-400" />
      Pendente
    </span>
  )
}