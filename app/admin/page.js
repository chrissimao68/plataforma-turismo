import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Pencil, Plus, Eye } from "lucide-react";
import DeletePontoButton from "@/components/DeletePontoButton";

export default async function AdminPage() {
  const pontos = await prisma.pontoTuristico.findMany({
    orderBy: {
      criadoEm: "desc",
    },
    include: {
      fotos: true,
    },
  });

  return (
    <main className="p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800">
              Dashboard Administrativo
            </h1>
            <p className="text-gray-600">
              Gerencie os pontos turísticos cadastrados.
            </p>
          </div>

          <Link
            href="/admin/novo"
            className="flex items-center gap-2 rounded bg-green-700 px-4 py-3 font-semibold text-white hover:bg-green-800"
          >
            <Plus size={18} />
            Novo ponto
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Total de páginas</p>
            <h2 className="text-3xl font-bold text-green-700">
              {pontos.length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Publicadas</p>
            <h2 className="text-3xl font-bold text-green-700">
              {pontos.filter((p) => p.publicado).length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Com galeria</p>
            <h2 className="text-3xl font-bold text-green-700">
              {pontos.filter((p) => p.fotos.length > 0).length}
            </h2>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">
          <div className="border-b p-5">
            <h2 className="text-xl font-bold text-gray-800">
              Pontos turísticos cadastrados
            </h2>
          </div>

          <table className="w-full border-collapse">
            <thead className="bg-green-800 text-left text-white">
              <tr>
                <th className="p-4">Imagem</th>
                <th className="p-4">Título</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Publicado</th>
                <th className="p-4">Fotos</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>

            <tbody>
              {pontos.map((ponto) => (
                <tr key={ponto.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {ponto.imagem ? (
                      <img
                        src={ponto.imagem}
                        alt={ponto.titulo}
                        className="h-14 w-20 rounded object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-20 items-center justify-center rounded bg-gray-200 text-xs text-gray-500">
                        sem foto
                      </div>
                    )}
                  </td>

                  <td className="p-4 font-semibold">{ponto.titulo}</td>
                  <td className="p-4">{ponto.categoria}</td>

                  <td className="p-4">
                    {ponto.publicado ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Sim
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                        Não
                      </span>
                    )}
                  </td>

                  <td className="p-4">{ponto.fotos.length}</td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link href={`/pontos/${ponto.id}`} target="_blank" className="flex items-center gap-1 rounded bg-gray-600 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-700">
                        <Eye size={16}  />
                      </Link>
                      <Link href={`/admin/editar/${ponto.id}`} className="flex items-center gap-1 rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                        <Pencil size={16} />
                      </Link>

                     <DeletePontoButton id={ponto.id} />
                    </div>
                  </td>
                </tr>
              ))}

              {pontos.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    Nenhum ponto turístico cadastrado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}