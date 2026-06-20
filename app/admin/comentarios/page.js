import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";
import ComentarioActions from "@/components/ComentarioActions";

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
  });

  return (
    <main className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-800">
          Comentários
        </h1>
        <p className="text-gray-600">
          Aprove ou exclua avaliações enviadas pelos visitantes.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full border-collapse">
          <thead className="bg-green-800 text-left text-white">
            <tr>
              <th className="p-4">Visitante</th>
              <th className="p-4">Cidade</th>
              <th className="p-4">Ponto turístico</th>
              <th className="p-4">Nota</th>
              <th className="p-4">Comentário</th>
              <th className="p-4">Status</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>

          <tbody>
            {comentarios.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">{item.nome}</td>
                <td className="p-4">{item.cidade}</td>
                <td className="p-4">{item.pontoTuristico.titulo}</td>

                <td className="p-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((estrela) => (
                      <Star
                        key={estrela}
                        size={16}
                        className={
                          estrela <= item.nota
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </td>

                <td className="max-w-sm p-4 text-sm text-gray-700">
                  {item.comentario}
                </td>

                <td className="p-4">
                  {item.aprovado ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Publicado
                    </span>
                  ) : (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                      Pendente
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <ComentarioActions
                    id={item.id}
                    aprovado={item.aprovado}
                  />
                </td>
              </tr>
            ))}

            {comentarios.length === 0 && (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  Nenhum comentário enviado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}