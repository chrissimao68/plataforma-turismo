import { prisma } from "@/lib/prisma";
import CardPonto from "@/components/CardPonto";
import Link from "next/link";
import {
  CalendarDays,
  Camera,
  Star,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default async function EventosPage() {
  const pontos = await prisma.pontoTuristico.findMany({
    where: {
      categoria: "EVENTOS",
      publicado: true,
    },
    orderBy: {
      criadoEm: "desc",
    },
    include: {
      fotos: true,
      comentarios: {
        where: {
          aprovado: true,
        },
      },
    },
  });

  const totalFotos = pontos.reduce(
    (acc, ponto) => acc + ponto.fotos.length,
    0
  );

  const totalAvaliacoes = pontos.reduce(
    (acc, ponto) => acc + ponto.comentarios.length,
    0
  );

  const somaNotas = pontos.reduce(
    (acc, ponto) =>
      acc + ponto.comentarios.reduce((soma, c) => soma + c.nota, 0),
    0
  );

  const media =
    totalAvaliacoes > 0
      ? (somaNotas / totalAvaliacoes).toFixed(1)
      : "0.0";

  const destaque = pontos[0];

  const fotosRecentes = pontos
    .flatMap((ponto) => ponto.fotos)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <section className="relative h-[460px] overflow-hidden bg-[url('/evencapa.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 text-white">
          <span className="mb-4 w-fit rounded-full bg-rose-600/90 px-4 py-2 text-sm font-bold tracking-wide shadow dark:bg-rose-500/90">
            EVENTOS
          </span>

          <h1 className="text-5xl font-extrabold md:text-6xl">
            Eventos
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-8 text-white/90">
            Descubra festas, encontros, atividades culturais e experiências que
            movimentam Lavras.
          </p>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-14 max-w-7xl px-6">
        <div className="grid gap-4 rounded-3xl border border-zinc-200 bg-white py-6 justify-items-center shadow-xl transition-colors dark:border-zinc-800 dark:bg-zinc-900 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              <CalendarDays size={24} />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {pontos.length}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Locais de eventos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <Camera size={24} />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {totalFotos}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Fotos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
              <MessageCircle size={24} />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {totalAvaliacoes}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Avaliações
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <Star
                size={24}
                className="fill-emerald-700 dark:fill-emerald-300"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {media}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Média geral
              </p>
            </div>
          </div>
        </div>
      </section>

      {destaque && (
        <section className="mx-auto mt-12 max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900 md:grid md:grid-cols-3">
            <div className="p-8">
              <p className="text-sm font-bold tracking-wide text-rose-700 dark:text-rose-400">
                DESTAQUE DA CATEGORIA
              </p>

              <h2 className="mt-3 text-3xl font-bold text-rose-900 dark:text-rose-300">
                {destaque.titulo}
              </h2>

              <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">
                {destaque.descricao}
              </p>

              <Link
                href={`/pontos/${destaque.id}`}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400"
              >
                Ver detalhes
                <ArrowRight size={18} />
              </Link>
            </div>

            {destaque.imagem ? (
              <img
                src={destaque.imagem}
                alt={destaque.titulo}
                className="h-full min-h-[300px] w-full object-cover md:col-span-2"
              />
            ) : (
              <div className="flex min-h-[300px] items-center justify-center bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 md:col-span-2">
                Sem imagem
              </div>
            )}
          </div>
        </section>
      )}

      <section className="mx-auto mt-14 max-w-7xl px-6">
        <h2 className="text-3xl font-bold text-rose-900 dark:text-rose-300">
          Locais de eventos
        </h2>

        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Explore os pontos de eventos cadastrados em Lavras.
        </p>

        {pontos.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pontos.map((ponto) => (
              <CardPonto key={ponto.id} ponto={ponto} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-10 text-center text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            Nenhum evento publicado ainda.
          </div>
        )}
      </section>

      {fotosRecentes.length > 0 && (
        <section className="mx-auto mt-14 max-w-7xl px-6 pb-20">
          <h2 className="text-3xl font-bold text-rose-900 dark:text-rose-300">
            Fotos recentes de eventos
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {fotosRecentes.map((foto) => (
              <img
                key={foto.id}
                src={foto.url}
                alt="Foto de evento"
                className="h-36 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02] dark:ring-1 dark:ring-zinc-700"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}