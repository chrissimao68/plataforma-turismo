import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ComentarioForm from "@/components/ComentarioForm"
import { MapPin, ImageIcon, MessageCircle } from "lucide-react"

export default async function PontoPage({ params }) {
  const { id } = await params

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
  })

  if (!ponto || !ponto.publicado) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-3xl">
          {ponto.imagem ? (
            <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[520px]">
              <Image
                src={ponto.imagem}
                alt={ponto.titulo}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-5 text-white sm:p-8">
                <span className="inline-flex rounded-full bg-green-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide dark:bg-green-500 sm:px-4 sm:py-2 sm:text-sm">
                  {ponto.categoria}
                </span>

                <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight drop-shadow-lg sm:text-4xl lg:text-5xl">
                  {ponto.titulo}
                </h1>

                {ponto.endereco && (
                  <p className="mt-3 flex max-w-3xl items-start gap-2 text-sm leading-6 text-green-100 sm:text-base">
                    <MapPin size={18} className="mt-0.5 shrink-0" />
                    <span>{ponto.endereco}</span>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 bg-zinc-100 text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400 sm:min-h-[360px]">
              <ImageIcon size={34} />
              Sem imagem principal
            </div>
          )}

          <div className="p-5 sm:p-8 text-justify">
            <p className="text-base leading-8 text-zinc-600 dark:text-zinc-300 sm:text-lg">
              {ponto.descricao}
            </p>

            {ponto.conteudo && (
              <div className="mt-6 whitespace-pre-line text-sm leading-8 text-zinc-700 dark:text-zinc-300 sm:mt-8 sm:text-base">
                {ponto.conteudo}
              </div>
            )}
          </div>
        </section>

        {ponto.fotos.length > 0 && (
          <section className="mt-10 sm:mt-12">
            <SectionHeader icon={<ImageIcon />} title="Galeria" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {ponto.fotos.map((foto) => (
                <div
                  key={foto.id}
                  className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="relative h-52 w-full overflow-hidden sm:h-64 lg:h-72">
                    <Image
                      src={foto.url}
                      alt={foto.legenda || ponto.titulo}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {foto.legenda && (
                    <div className="bg-white p-4 dark:bg-zinc-900">
                      <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                        {foto.legenda}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 sm:mt-14">
          <SectionHeader
            icon={<MessageCircle />}
            title="Avaliações dos visitantes"
          />

          {ponto.comentarios.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
                Nenhum comentário aprovado ainda.
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {ponto.comentarios.map((comentario) => (
                <div
                  key={comentario.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                        {comentario.nome}
                      </h3>

                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {comentario.cidade}
                      </p>
                    </div>

                    <span className="whitespace-nowrap text-base text-yellow-500 sm:text-lg">
                      {"★".repeat(comentario.nota)}
                      {"☆".repeat(5 - comentario.nota)}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-base">
                    {comentario.comentario}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12 sm:mt-14">
          <ComentarioForm pontoId={ponto.id} />
        </section>
      </div>
    </main>
  )
}

function SectionHeader({ icon, title }) {
  return (
    <div className="mb-5 flex items-center gap-3 sm:mb-6">
      <div className="text-green-700 dark:text-green-400">{icon}</div>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
        {title}
      </h2>
    </div>
  )
}