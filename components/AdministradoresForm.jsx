import { prisma } from "@/lib/prisma";
import { aprovarAdmin, excluirAdmin } from "@/app/actions/auth";
import {
  CheckCircle,
  Trash2,
  Users,
  UserCheck,
  Clock,
  Shield,
} from "lucide-react";

export default async function AdministradoresForm() {
  const administradores = await prisma.administrador.findMany({
    orderBy: {
      id: "desc",
    },
  });

  const aprovados = administradores.filter(
    (admin) => admin.aprovado
  ).length;

  const pendentes = administradores.length - aprovados;

  return (
    <section className="mt-2" id="administradores">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div
            className="
              flex h-14 w-14 items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-blue-500
              to-indigo-600
              text-white
              shadow-md
            "
          >
            <Users size={26} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Administradores
            </h2>

            <p className="text-zinc-500 dark:text-zinc-400">
              Gerencie os acessos ao painel administrativo.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Resumo */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div
          className="
            rounded-2xl
            border border-zinc-200 dark:border-zinc-800
            bg-white dark:bg-zinc-900
            p-5
            shadow-sm
            transition
            hover:shadow-md
          "
        >
          <div className="flex items-center gap-3">
            <Shield className="text-blue-600 dark:text-blue-400" />

            <span className="font-medium text-zinc-600 dark:text-zinc-400">
              Total
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {administradores.length}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border border-zinc-200 dark:border-zinc-800
            bg-white dark:bg-zinc-900
            p-5
            shadow-sm
            transition
            hover:shadow-md
          "
        >
          <div className="flex items-center gap-3">
            <UserCheck className="text-green-600 dark:text-green-400" />

            <span className="font-medium text-zinc-600 dark:text-zinc-400">
              Aprovados
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {aprovados}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border border-zinc-200 dark:border-zinc-800
            bg-white dark:bg-zinc-900
            p-5
            shadow-sm
            transition
            hover:shadow-md
          "
        >
          <div className="flex items-center gap-3">
            <Clock className="text-yellow-600 dark:text-yellow-400" />

            <span className="font-medium text-zinc-600 dark:text-zinc-400">
              Pendentes
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {pendentes}
          </p>
        </div>
      </div>

      {/* Tabela */}
      <div
        className="
          overflow-hidden
          rounded-3xl
          border border-zinc-200 dark:border-zinc-800
          bg-white dark:bg-zinc-900
          shadow-sm
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="bg-zinc-50 dark:bg-zinc-950">
              <tr
                className="
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-zinc-500 dark:text-zinc-400
                "
              >
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Criado em</th>
                <th className="px-6 py-4 text-right">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {administradores.map((admin) => (
                <tr
                  key={admin.id}
                  className="
                    transition
                    hover:bg-zinc-50 dark:hover:bg-zinc-950
                  "
                >
                  {/* Usuário */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex h-11 w-11 items-center justify-center
                          rounded-full
                          bg-gradient-to-br
                          from-blue-600
                          to-emerald-600
                          font-bold
                          text-white
                        "
                      >
                        {admin.usuario?.charAt(0).toUpperCase()}
                      </div>

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

                  {/* Status */}
                  <td className="px-6 py-5">
                    {admin.aprovado ? (
                      <span
                        className="
                          inline-flex items-center gap-2
                          rounded-full
                          bg-green-100 dark:bg-green-950
                          px-3 py-1
                          text-sm
                          font-medium
                          text-green-700 dark:text-green-300
                        "
                      >
                        <span className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
                        Aceito
                      </span>
                    ) : (
                      <span
                        className="
                          inline-flex items-center gap-2
                          rounded-full
                          bg-yellow-100 dark:bg-yellow-950
                          px-3 py-1
                          text-sm
                          font-medium
                          text-yellow-700 dark:text-yellow-300
                        "
                      >
                        <span className="h-2 w-2 rounded-full bg-yellow-500 dark:bg-yellow-400" />
                        Pendente
                      </span>
                    )}
                  </td>

                  {/* Data */}
                  <td className="px-6 py-5 text-zinc-500 dark:text-zinc-400">
                    {admin.criadoEm
                      ? new Date(admin.criadoEm).toLocaleDateString("pt-BR")
                      : "-"}
                  </td>

                  {/* Ações */}
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      {!admin.aprovado && (
                        <form action={aprovarAdmin.bind(null, admin.id)}>
                          <button
                            className="
                              flex items-center gap-2
                              rounded-xl
                              bg-green-600
                              px-4 py-2
                              text-sm
                              font-semibold
                              text-white
                              transition-all
                              hover:bg-green-700
                              hover:shadow-md
                              dark:bg-green-600
                              dark:hover:bg-green-500
                            "
                          >
                            <CheckCircle size={16} />
                            Aceitar
                          </button>
                        </form>
                      )}

                      <form action={excluirAdmin.bind(null, admin.id)}>
                        <button
                          className="
                            flex items-center gap-2
                            rounded-xl
                            bg-red-50 dark:bg-red-950
                            px-4 py-2
                            text-sm
                            font-semibold
                            text-red-600 dark:text-red-300
                            transition-all
                            hover:bg-red-600
                            hover:text-white
                            hover:shadow-md
                            dark:hover:bg-red-600
                            dark:hover:text-white
                          "
                        >
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

        {administradores.length === 0 && (
          <div className="p-12 text-center">
            <div
              className="
                mx-auto mb-4
                flex h-16 w-16 items-center justify-center
                rounded-full
                bg-zinc-100 dark:bg-zinc-800
              "
            >
              <Users
                size={28}
                className="text-zinc-400 dark:text-zinc-500"
              />
            </div>

            <p className="font-semibold text-zinc-700 dark:text-zinc-300">
              Nenhum administrador cadastrado.
            </p>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Novas solicitações aparecerão aqui.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}