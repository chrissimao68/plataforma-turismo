import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ComentarioForm from "@/components/ComentarioForm";


export default async function PontoPage({ params }) {
  const { id } = await params;

  const ponto = await prisma.pontoTuristico.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      fotos: true,
      comentarios: {
        where: {
          aprovado: true,
        },
        orderBy: {
          id: "desc",
        },
      },
    },
  });

  if (!ponto || !ponto.publicado) {
    notFound();
  }

 

  return (
    <main className="mx-auto max-w-6xl py-10">
      <section className="overflow-hidden rounded-2xl bg-white shadow">
        {ponto.imagem && (
          <img
            src={ponto.imagem}
            alt={ponto.titulo}
            className="h-96 w-full object-cover"
          />
        )}

        <div className="py-10">
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            {ponto.categoria}
          </span>

          <h1 className="mt-4 text-4xl font-bold text-green-800">
            {ponto.titulo}
          </h1>

          {ponto.endereco && (
            <p className="mt-3 text-gray-500">
              📍 {ponto.endereco}
            </p>
          )}

          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            {ponto.descricao}
          </p>

          <div className="mt-8 whitespace-pre-line text-gray-700">
            {ponto.conteudo}
          </div>
        </div>
      </section>

      {ponto.fotos.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Galeria
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {ponto.fotos.map((foto) => (
              <div key={foto.id}>
                <img
                  src={foto.url}
                  alt={foto.legenda || ponto.titulo}
                  className="h-64 w-full rounded-xl object-cover"
                />

                {foto.legenda && (
                  <p className="mt-2 text-sm text-gray-500">
                    {foto.legenda}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Comentários
        </h2>

        {ponto.comentarios.length === 0 ? (
          <p className="text-gray-500">
            Nenhum comentário aprovado ainda.
          </p>
        ) : (
          <div className="space-y-4">
            {ponto.comentarios.map((comentario) => (
              <div
                key={comentario.id}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <strong>{comentario.nome}</strong>
                    <p className="text-sm text-gray-500">
                      {comentario.cidade}
                    </p>
                  </div>

                  <span className="text-yellow-500">
                    {"★".repeat(comentario.nota)}
                    {"☆".repeat(5 - comentario.nota)}
                  </span>
                </div>

                <p className="mt-3 text-gray-700">
                  {comentario.comentario}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
     <section>
    <ComentarioForm pontoId={ponto.id} />
     </section>
    </main>
  );
}