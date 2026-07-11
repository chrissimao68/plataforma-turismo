import { prisma } from "@/lib/prisma"
import CardPonto from "@/components/CardPonto"
import Link from "next/link"
import {
  Landmark,
  Camera,
  Star,
  MessageCircle,
  ArrowRight,
} from "lucide-react"

export default async function CulturaPage() {
  const pontos = await prisma.pontoTuristico.findMany({
    where: {
      categoria: "CULTURA",
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
  })

  const totalFotos = pontos.reduce((acc, ponto) => acc + ponto.fotos.length, 0)

  const totalAvaliacoes = pontos.reduce(
    (acc, ponto) => acc + ponto.comentarios.length,
    0
  )

  const somaNotas = pontos.reduce(
    (acc, ponto) =>
      acc + ponto.comentarios.reduce((soma, c) => soma + c.nota, 0),
    0
  )

  const media =
    totalAvaliacoes > 0 ? (somaNotas / totalAvaliacoes).toFixed(1) : "0.0"

  const destaque = pontos[0]
  const fotosRecentes = pontos.flatMap((ponto) => ponto.fotos).slice(0, 6)

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <section className="relative min-h-[380px] overflow-hidden bg-[url('/culturacapa.png')] bg-cover bg-center sm:min-h-[430px] lg:min-h-[460px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[380px] w-full max-w-7xl flex-col justify-center px-4 py-12 text-white sm:min-h-[430px] sm:px-6 lg:min-h-[460px] lg:px-8">
          <span className="mb-4 w-fit rounded-full bg-purple-700/90 px-4 py-2 text-xs font-bold uppercase tracking-wide shadow dark:bg-purple-600/90 sm:text-sm">
            Cultura
          </span>

          <h1 className="text-4xl font-extrabold leading-tight drop-shadow-lg sm:text-5xl md:text-6xl">
            Cultura
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
            História, tradições, museus e experiências culturais em Lavras.
          </p>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-xl transition-colors dark:border-zinc-800 dark:bg-zinc-900 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
          <MetricCard
            icon={<Landmark size={24} />}
            value={pontos.length}
            label="Locais culturais"
            color="purple"
          />

          <MetricCard
            icon={<Camera size={24} />}
            value={totalFotos}
            label="Fotos"
            color="blue"
          />

          <MetricCard
            icon={<MessageCircle size={24} />}
            value={totalAvaliacoes}
            label="Avaliações"
            color="yellow"
          />

          <MetricCard
            icon={
              <Star
                size={24}
                className="fill-emerald-700 dark:fill-emerald-300"
              />
            }
            value={media}
            label="Média geral"
            color="emerald"
          />
        </div>
      </section>

      {destaque && (
        <section className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:mt-12 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900 lg:grid lg:grid-cols-3">
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wide text-purple-700 dark:text-purple-400 sm:text-sm">
                Destaque da categoria
              </p>

              <h2 className="mt-3 text-2xl font-bold text-purple-900 dark:text-purple-300 sm:text-3xl">
                {destaque.titulo}
              </h2>

              <p className="mt-4 line-clamp-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base">
                {destaque.descricao}
              </p>

              <Link
                href={`/pontos/${destaque.id}`}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white transition hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500"
              >
                Ver detalhes
                <ArrowRight size={18} />
              </Link>
            </div>

            {destaque.imagem ? (
              <img
                src={destaque.imagem}
                alt={destaque.titulo}
                className="h-64 w-full object-cover sm:h-80 lg:col-span-2 lg:h-full lg:min-h-[320px]"
              />
            ) : (
              <div className="flex h-64 items-center justify-center bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 sm:h-80 lg:col-span-2 lg:h-full lg:min-h-[320px]">
                Sem imagem
              </div>
            )}
          </div>
        </section>
      )}

      <section className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:mt-14 lg:px-8">
        <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-300 sm:text-3xl">
          Locais de cultura
        </h2>

        <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
          Explore os pontos culturais cadastrados em Lavras.
        </p>

        {pontos.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pontos.map((ponto) => (
              <CardPonto key={ponto.id} ponto={ponto} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 sm:p-10 sm:text-base">
            Nenhum local cultural publicado ainda.
          </div>
        )}
      </section>

      {fotosRecentes.length > 0 && (
        <section className="mx-auto mt-12 w-full max-w-7xl px-4 pb-16 sm:px-6 lg:mt-14 lg:px-8 lg:pb-20">
          <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-300 sm:text-3xl">
            Fotos recentes de cultura
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {fotosRecentes.map((foto) => (
              <img
                key={foto.id}
                src={foto.url}
                alt="Foto cultural"
                className="h-32 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02] dark:ring-1 dark:ring-zinc-700 sm:h-36"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

function MetricCard({ icon, value, label, color }) {
  const colors = {
    purple:
      "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    yellow:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    emerald:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${colors[color]}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {value}
        </h3>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      </div>
    </div>
  )
}