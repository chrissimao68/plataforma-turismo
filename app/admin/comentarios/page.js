import { prisma } from "@/lib/prisma";
import { Star, MessageCircle, CheckCircle, Clock, MapPin } from "lucide-react";
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

  const publicados = comentarios.filter((item) => item.aprovado).length;
  const pendentes = comentarios.length - publicados;

  return (
    <main className="w-full">
      <div className="mx-auto w-[90%] py-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <MessageCircle size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              Comentários
            </h1>

            <p className="text-zinc-500">
              Aprove ou exclua avaliações enviadas pelos visitantes.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3 w-[90%] mx-auto">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <div className="flex items-center gap-3">
            <MessageCircle className="text-green-600" />
            <span className="font-medium text-zinc-600">Total</span>
          </div>

          <p className="mt-3 text-3xl font-bold">
            {comentarios.length}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" />
            <span className="font-medium text-zinc-600">Publicados</span>
          </div>

          <p className="mt-3 text-3xl font-bold">
            {publicados}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <div className="flex items-center gap-3">
            <Clock className="text-yellow-600" />
            <span className="font-medium text-zinc-600">Pendentes</span>
          </div>

          <p className="mt-3 text-3xl font-bold">
            {pendentes}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200 w-[90%] mx-auto">
        <table className="w-full mx-auto">
          <thead className="bg-zinc-50">
            <tr className="text-left text-sm uppercase tracking-wide text-zinc-500">
              <th className="px-6 py-4">Visitante</th>
              <th className="px-6 py-4">Ponto turístico</th>
              <th className="px-6 py-4">Nota</th>
              <th className="px-6 py-4">Comentário</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {comentarios.map((item) => (
              <tr key={item.id} className="transition hover:bg-zinc-50">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-700 font-bold text-white">
                      {item.nome?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-zinc-900">
                        {item.nome}
                      </p>

                      <p className="flex items-center gap-1 text-sm text-zinc-500">
                        <MapPin size={14} />
                        {item.cidade}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <p className="font-medium text-zinc-800">
                    {item.pontoTuristico?.titulo || "Ponto removido"}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((estrela) => (
                        <Star
                          key={estrela}
                          size={16}
                          className={
                            estrela <= item.nota
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-zinc-300"
                          }
                        />
                      ))}
                    </div>

                    <span className="text-sm font-semibold text-zinc-600">
                      {item.nota}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <p className="max-w-sm rounded-2xl bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-600">
                    {item.comentario}
                  </p>
                </td>

                <td className="px-6 py-5">
                  {item.aprovado ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      <span className="h-2 w-2 rounded-full bg-green-600" />
                      Publicado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                      <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      Pendente
                    </span>
                  )}
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

        {comentarios.length === 0 && (
          <div className="p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
              <MessageCircle className="text-zinc-400" />
            </div>

            <p className="font-semibold text-zinc-700">
              Nenhum comentário enviado ainda.
            </p>

            <p className="text-sm text-zinc-500">
              As avaliações dos visitantes aparecerão aqui.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}