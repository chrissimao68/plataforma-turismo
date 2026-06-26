import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CardPonto from "@/components/CardPonto";
import ModeloModal from "@/components/conhecamodal";
import {
  Trees,
  Landmark,
  Utensils,
  CalendarDays,
  Hotel,
  ArrowRight,
} from "lucide-react";

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
  });

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
  ];

  return (
    <main className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      {/* HERO */}
      <section
        className="
          relative flex min-h-[720px] items-center overflow-hidden
          bg-[url('/fotocapaescura.png')]
          bg-cover bg-center
          text-white
          dark:bg-[url('/fotodecapadark.png')]
        "
      >
       
       

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-8">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-green-200">
                Turismo Em Lavras - Minas Gerais
              </p>

              <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
                Conheça Lavras
              </h1>

              <h3 className="mt-4 text-2xl font-bold text-green-100 md:text-3xl">
                Entre serras, sabores e letras.
              </h3>

              <p className="mt-6 max-w-xl text-lg leading-8 text-green-50">
                Explore pontos turísticos, natureza, cultura, gastronomia,
                eventos e hospedagens em uma plataforma feita para valorizar
                Lavras.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/natureza"
                className="rounded-xl bg-white px-6 py-3 font-bold text-green-800 shadow-lg transition hover:bg-green-100 dark:bg-zinc-100 dark:text-green-900 dark:hover:bg-white"
              >
                Planeje sua viagem
              </Link>

              <ModeloModal />
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="h-[560px] w-full max-w-lg bg-[url('/logotransparentefundo2.png')] bg-contain bg-center bg-no-repeat" />
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Explore por categoria
          </h2>

          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Escolha o tipo de experiência que combina com sua viagem.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {categorias.map((item) => {
            const Icon = item.Icon;

            return (
              <Link key={item.titulo} href={item.href} className="group">
                <div className="relative h-[330px] overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={item.imagem}
                    alt={item.titulo}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />

                  <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                    <div
                      className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 backdrop-blur-md ${item.corIcone}`}
                    >
                      <Icon size={30} />
                    </div>

                    <h3 className="mb-3 text-3xl font-bold">
                      {item.titulo}
                    </h3>

                    <p className="leading-relaxed text-white/90">
                      {item.descricao}
                    </p>

                    <span
                      className={`mt-3 text-lg font-semibold ${item.corLink}`}
                    >
                      Explorar →
                    </span>
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 h-2 w-full ${item.cor}`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* PONTOS RECENTES */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-green-900 dark:text-green-400">
              Pontos turísticos recentes
            </h2>

            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Lugares cadastrados recentemente no portal.
            </p>
          </div>

          <Link
            href="/natureza"
            className="hidden items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 md:flex"
          >
            Ver mais
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pontos.map((ponto) => (
            <CardPonto key={ponto.id} ponto={ponto} />
          ))}
        </div>

        {pontos.length === 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            Nenhum ponto turístico publicado ainda.
          </div>
        )}
      </section>
    </main>
  );
}