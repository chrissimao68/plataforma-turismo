import { prisma } from "@/lib/prisma";
import { aprovarAdmin, excluirAdmin } from "@/app/actions/auth";
import { CheckCircle, Trash2, Users } from "lucide-react";

export default async function AdministradoresForm() {
  const administradores = await prisma.administrador.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="mt-10 " id="administradores">
      <div className="mb-4 flex items-center gap-2">
        <Users className="text-blue-600" />
        <h2 className="text-2xl font-bold">Administradores</h2>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Usuário</th>
              <th className="p-4">Status</th>
              <th className="p-4">Criado em</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>

          <tbody>
            {administradores.map((admin) => (
              <tr key={admin.id} className="border-t">
                <td className="p-4 font-medium">{admin.usuario}</td>

                <td className="p-4">
                  {admin.aprovado ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Aceito
                    </span>
                  ) : (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                      Pendente
                    </span>
                  )}
                </td>

                <td className="p-4 text-gray-500">
                  {new Date(admin.createdAt).toLocaleDateString("pt-BR")}
                </td>

                <td className="flex gap-2 p-4">
                  {!admin.aprovado && (
                    <form action={aprovarAdmin.bind(null, admin.id)}>
                      <button className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-white">
                        <CheckCircle size={16} />
                        Aceitar
                      </button>
                    </form>
                  )}

                  <form action={excluirAdmin.bind(null, admin.id)}>
                    <button className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-white">
                      <Trash2 size={16} />
                      Excluir
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {administradores.length === 0 && (
          <p className="p-6 text-gray-500">
            Nenhum administrador cadastrado.
          </p>
        )}
      </div>
    </section>
  );
}