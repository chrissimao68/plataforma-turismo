import Link from "next/link"
import { prisma } from "@/lib/prisma"
import CardPonto from "@/components/CardPonto"
import ModeloModal from "@/components/conhecamodal"
import {
  Trees,
  Landmark,
  Utensils,
  CalendarDays,
  Hotel,
  ArrowRight,
} from "lucide-react"

export default async function HomePage() {
  const pontos = await prisma.pontoTuristico.findMany({
    where: {
      publicado: true,
    },
    orderBy: {
      criadoEm: "desc",
    },
    take: 3,
    include: {
      comentarios: {
        where: {
          aprovado: true,
        },
      },
    },
  })

  const categorias = [
    {
      titulo: "Natureza",
      descricao: "Cachoeiras, trilhas e paisagens naturais.",
      href: "/natureza",
      imagem: "/natucapa.jpg",
      cor: "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600",
      corIcone:
        "text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600",
      corLink:
        "bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent",
      Icon: Trees,
    },
    {
      titulo: "Cultura",
      descricao: "História, museus e patrimônio cultural.",
      href: "/cultura",
      imagem: "/cultucapa.jpg",
      cor: "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700",
      corIcone:
        "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700",
      corLink:
        "bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent",
      Icon: Landmark,
    },
    {
      titulo: "Gastronomia",
      descricao: "Sabores e experiências locais.",
      href: "/gastronomia",
      imagem: "/gastrocapa.jpg",
      cor: "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700",
      corIcone:
        "text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700",
      corLink:
        "bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent",
      Icon: Utensils,
    },
    {
      titulo: "Eventos",
      descricao: "Festas e encontros da cidade.",
      href: "/eventos",
      imagem: "/evencapa.jpg",
      cor: "bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700",
      corIcone:
        "text-white bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700",
      corLink:
        "bg-gradient-to-r from-rose-300 via-rose-400 to-rose-500 bg-clip-text text-transparent",
      Icon: CalendarDays,
    },
    {
      titulo: "Hospedagem",
      descricao: "Hotéis, pousadas, conforto e outros.",
      href: "/hospedagem",
      imagem: "/hospecapa.jpg",
      cor: "bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700",
      corIcone:
        "text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700",
      corLink:
        "bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 bg-clip-text text-transparent",
      Icon: Hotel,
    },
  ]

  return (
    <main className="overflow-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* HERO */}
     {/* HERO */}
<section
  className="
    relative flex min-h-[560px] items-center overflow-hidden
    bg-[url('/novo.png')]
    bg-cover bg-center
    text-white
    dark:bg-[url('/novo.png')]
    sm:min-h-[640px]
    lg:min-h-[720px]
  "
>
  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/25 to-black/40" />
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

  <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-8">
    <div className="flex max-w-2xl flex-col gap-6 sm:gap-8">
      <div>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-green-200 sm:mb-4 sm:text-sm sm:tracking-[0.35em]">
          Turismo em Lavras - Minas Gerais
        </p>

        <h1 className="text-4xl font-extrabold leading-[1.05] drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
          Conheça Lavras
        </h1>

        <h3 className="mt-4 max-w-md text-xl font-bold leading-snug text-green-100 sm:text-2xl md:text-3xl">
          Entre serras, sabores e letras.
        </h3>

        <p className="mt-5 max-w-xl text-base leading-7 text-green-50 sm:text-lg sm:leading-8">
          Explore pontos turísticos, natureza, cultura, gastronomia, eventos e
          hospedagens em uma plataforma feita para valorizar Lavras.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/natureza"
          className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-green-800 shadow-lg transition hover:bg-green-100 sm:px-6 sm:text-base dark:bg-zinc-100 dark:text-green-900 dark:hover:bg-white"
        >
          Planeje sua viagem
        </Link>

        <ModeloModal />
      </div>
    </div>

    <div className="hidden lg:flex lg:justify-end">
      <div className="h-[420px] w-full max-w-md bg-[url('/logotransparentefundo2.png')] bg-contain bg-center bg-no-repeat xl:h-[560px] xl:max-w-lg" />
    </div>
  </div>
</section>

    {/* CATEGORIAS */}
<section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
  <div className="mb-8 text-center sm:mb-10">
    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
      Explore por categoria
    </h2>

    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
      Escolha o tipo de experiência que combina com sua viagem.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
    {categorias.map((item) => {
      const Icon = item.Icon

      return (
        <Link key={item.titulo} href={item.href} className="group block">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:h-64 lg:h-[330px]">
            <img
              src={item.imagem}
              alt={item.titulo}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
            <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />

            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white sm:p-5">
              <div
                className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 shadow-lg backdrop-blur-md sm:h-13 sm:w-13 lg:h-14 lg:w-14 ${item.corIcone}`}
              >
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>

              <h3 className="mb-2 text-2xl font-bold leading-tight sm:text-3xl">
                {item.titulo}
              </h3>

              <p className="line-clamp-2 text-sm leading-6 text-white/90 sm:text-base">
                {item.descricao}
              </p>

              <span
                className={`mt-3 inline-flex text-sm font-bold sm:text-base lg:text-lg ${item.corLink}`}
              >
                Explorar →
              </span>
            </div>

            <div
              className={`absolute bottom-0 left-0 h-1.5 w-full sm:h-2 ${item.cor}`}
            />
          </div>
        </Link>
      )
    })}
  </div>
</section>

      {/* PONTOS RECENTES */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-400 sm:text-3xl">
              Pontos turísticos recentes
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              Lugares cadastrados recentemente no portal.
            </p>
          </div>

          <Link
            href="/natureza"
            className="inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
          >
            Ver mais
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pontos.map((ponto) => (
            <CardPonto key={ponto.id} ponto={ponto} />
          ))}
        </div>

        {pontos.length === 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 sm:p-10 sm:text-base">
            Nenhum ponto turístico publicado ainda.
          </div>
        )}
      </section>
    </main>
  )
}