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

  const aprovados = administradores.filter((admin) => admin.aprovado).length;

  const pendentes = administradores.length - aprovados;

  return (
    <section className="mt-2" id="administradores">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <Users size={24} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-zinc-900">
              Administradores
            </h2>

            <p className="text-zinc-500">
              Gerencie os acessos ao painel administrativo.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Resumo */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <div className="flex items-center gap-3">
            <Shield className="text-blue-600" />
            <span className="font-medium text-zinc-600">Total</span>
          </div>

          <p className="mt-3 text-3xl font-bold">{administradores.length}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <div className="flex items-center gap-3">
            <UserCheck className="text-green-600" />
            <span className="font-medium text-zinc-600">Aprovados</span>
          </div>

          <p className="mt-3 text-3xl font-bold">{aprovados}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <div className="flex items-center gap-3">
            <Clock className="text-yellow-600" />
            <span className="font-medium text-zinc-600">Pendentes</span>
          </div>

          <p className="mt-3 text-3xl font-bold">{pendentes}</p>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr className="text-left text-sm uppercase tracking-wide text-zinc-500">
              <th className="px-6 py-4">Usuário</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Criado em</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {administradores.map((admin) => (
              <tr key={admin.id} className="transition hover:bg-zinc-50">
                {/* Usuário */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-600 font-bold text-white">
                      {admin.usuario?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-zinc-900">
                        {admin.usuario}
                      </p>

                      <p className="text-sm text-zinc-500">Administrador</p>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  {admin.aprovado ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      <span className="h-2 w-2 rounded-full bg-green-600" />
                      Aceito
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                      <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      Pendente
                    </span>
                  )}
                </td>

                {/* Data */}
                <td className="px-6 py-5 text-zinc-500">
                  {admin.criadoEm
                    ? new Date(admin.criadoEm).toLocaleDateString("pt-BR")
                    : "-"}
                </td>

                {/* Ações */}
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    {!admin.aprovado && (
                      <form action={aprovarAdmin.bind(null, admin.id)}>
                        <button className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700">
                          <CheckCircle size={16} />
                          Aceitar
                        </button>
                      </form>
                    )}

                    <form action={excluirAdmin.bind(null, admin.id)}>
                      <button className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white">
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

        {administradores.length === 0 && (
          <div className="p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
              <Users className="text-zinc-400" />
            </div>

            <p className="font-semibold text-zinc-700">
              Nenhum administrador cadastrado.
            </p>

            <p className="text-sm text-zinc-500">
              Novas solicitações aparecerão aqui.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
