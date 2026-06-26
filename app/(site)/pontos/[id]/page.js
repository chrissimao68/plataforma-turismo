import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ComentarioForm from "@/components/ComentarioForm";
import {
  MapPin,
  ImageIcon,
  MessageCircle,
} from "lucide-react";

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
    <main className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl">
        {/* CAPA */}
        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900">
          {ponto.imagem && (
            <div className="relative">
              <img
                src={ponto.imagem}
                alt={ponto.titulo}
                className="h-[500px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold dark:bg-green-500">
                  {ponto.categoria}
                </span>

                <h1 className="mt-4 text-4xl font-bold md:text-5xl">
                  {ponto.titulo}
                </h1>

                {ponto.endereco && (
                  <p className="mt-3 flex items-center gap-2 text-green-100">
                    <MapPin size={18} />
                    {ponto.endereco}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="p-8">
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              {ponto.descricao}
            </p>

            <div className="mt-8 whitespace-pre-line leading-8 text-zinc-700 dark:text-zinc-300">
              {ponto.conteudo}
            </div>
          </div>
        </section>

        {/* GALERIA */}
        {ponto.fotos.length > 0 && (
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-3">
              <ImageIcon className="text-green-700 dark:text-green-400" />

              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Galeria
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {ponto.fotos.map((foto) => (
                <div
                  key={foto.id}
                  className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <img
                    src={foto.url}
                    alt={foto.legenda || ponto.titulo}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {foto.legenda && (
                    <div className="bg-white p-4 dark:bg-zinc-900">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {foto.legenda}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* COMENTÁRIOS */}
        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <MessageCircle className="text-green-700 dark:text-green-400" />

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Avaliações dos visitantes
            </h2>
          </div>

          {ponto.comentarios.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-zinc-500 dark:text-zinc-400">
                Nenhum comentário aprovado ainda.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {ponto.comentarios.map((comentario) => (
                <div
                  key={comentario.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white">
                        {comentario.nome}
                      </h3>

                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {comentario.cidade}
                      </p>
                    </div>

                    <span className="whitespace-nowrap text-lg text-yellow-500">
                      {"★".repeat(comentario.nota)}
                      {"☆".repeat(5 - comentario.nota)}
                    </span>
                  </div>

                  <p className="mt-4 leading-7 text-zinc-700 dark:text-zinc-300">
                    {comentario.comentario}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FORMULÁRIO */}
        <section className="mt-14">
          <ComentarioForm pontoId={ponto.id} />
        </section>
      </div>
    </main>
  );
}