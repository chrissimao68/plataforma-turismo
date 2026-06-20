import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Pencil, Eye } from "lucide-react";
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

  return (
    // resto da página aqui
  

    <div className="flex flex-col w-[80%] mx-auto mt-8 ">
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
  );
}