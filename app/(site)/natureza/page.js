import { prisma } from "@/lib/prisma";
import CardPonto from "@/components/CardPonto";
import Link from "next/link";
import { Landmark, Camera, Star, MessageCircle } from "lucide-react";

export default async function NaturezaPage() {
  const pontos = await prisma.pontoTuristico.findMany({
    where: {
      categoria: "NATUREZA",
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

  const totalFotos = pontos.reduce((acc, ponto) => acc + ponto.fotos.length, 0);
  const totalAvaliacoes = pontos.reduce(
    (acc, ponto) => acc + ponto.comentarios.length,
    0
  );

  const somaNotas = pontos.reduce(
    (acc, ponto) =>
      acc + ponto.comentarios.reduce((soma, c) => soma + c.nota, 0),
    0
  );

  const media = totalAvaliacoes > 0 ? (somaNotas / totalAvaliacoes).toFixed(1) : "0.0";

  const destaque = pontos[0];

  const fotosRecentes = pontos
    .flatMap((ponto) => ponto.fotos)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative h-[460px] bg-[url('/natucapa.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6 text-white">
          <span className="mb-4 w-fit rounded-full bg-green-700/80 px-4 py-2 text-sm font-bold">
            NATUREZA
          </span>

          <h1 className="text-5xl font-extrabold">
            Natureza
          </h1>

          <p className="mt-4 max-w-xl text-lg">
            Descubra a beleza da natureza em Lavras.
          </p>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-14  max-w-6xl px-6">
        <div className="grid grid-cols-4 justify-items-center rounded-2xl bg-white p-6 shadow md:grid-cols-4">
          <div className="flex items-center gap-4">
            <Landmark className="text-green-700" />
            <div>
              <h3 className="text-2xl font-bold">{pontos.length}</h3>
              <p className="text-sm text-gray-500">Locais de natureza</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Camera className="text-green-700" />
            <div>
              <h3 className="text-2xl font-bold">{totalFotos}</h3>
              <p className="text-sm text-gray-500">Fotos</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MessageCircle className="text-green-700" />
            <div>
              <h3 className="text-2xl font-bold">{totalAvaliacoes}</h3>
              <p className="text-sm text-gray-500">Avaliações</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Star className="fill-green-700 text-green-700" />
            <div>
              <h3 className="text-2xl font-bold">{media}</h3>
              <p className="text-sm text-gray-500">Média geral</p>
            </div>
          </div>
        </div>
      </section>

      {destaque && (
        <section className="mx-auto mt-10 max-w-6xl px-6">
          <div className="overflow-hidden rounded-2xl bg-white shadow md:grid md:grid-cols-3">
            <div className="p-8">
              <p className="text-sm font-bold text-green-700">
                DESTAQUE DA CATEGORIA
              </p>

              <h2 className="mt-3 text-3xl font-bold text-green-900">
                {destaque.titulo}
              </h2>

              <p className="mt-4 text-gray-600">
                {destaque.descricao}
              </p>

              <Link
                href={`/pontos/${destaque.id}`}
                className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
              >
                Ver detalhes
              </Link>
            </div>

            <img
              src={destaque.imagem}
              alt={destaque.titulo}
              className="h-full min-h-[280px] w-full object-cover md:col-span-2"
            />
          </div>
        </section>
      )}

      <section className="mx-auto mt-12 max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-green-900">
          Locais de natureza
        </h2>

        <p className="mt-2 text-gray-600">
          Explore os pontos de natureza cadastrados em Lavras.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pontos.map((ponto) => (
            <CardPonto key={ponto.id} ponto={ponto} />
          ))}
        </div>
      </section>

      {fotosRecentes.length > 0 && (
        <section className="mx-auto mt-14 max-w-6xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-green-900">
            Fotos recentes de natureza
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-6">
            {fotosRecentes.map((foto) => (
              <img
                key={foto.id}
                src={foto.url}
                alt="Foto de natureza"
                className="h-32 w-full rounded-xl object-cover shadow"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}