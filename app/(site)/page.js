import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CardPonto from "@/components/CardPonto";
import {
  MapPin,
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
      nome: "Natureza",
      href: "/natureza",
      icon: Trees,
      texto: "Cachoeiras, trilhas e paisagens naturais.",
    },
    {
      nome: "Cultura",
      href: "/cultura",
      icon: Landmark,
      texto: "História, museus e patrimônio cultural.",
    },
    {
      nome: "Gastronomia",
      href: "/gastronomia",
      icon: Utensils,
      texto: "Sabores, restaurantes e experiências locais.",
    },
    {
      nome: "Eventos",
      href: "/eventos",
      icon: CalendarDays,
      texto: "Programações, festas e encontros da cidade.",
    },
    {
      nome: "Hospedagem",
      href: "/hospedagem",
      icon: Hotel,
      texto: "Pousadas, hotéis e lugares para descansar.",
    },
  ];

  return (
    <main className="bg-white">
      <section className="  text-white h-178  bg-[url('/capa01.png')] bg-cover bg-center">
        <div className="" />

        <div className=" grid w-[80%]  gap-20 px-6 py-10 mx-auto lg:grid-cols-2 lg:items-center">
          <div className="  w-full flex flex-col gap-10">
            

            <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl">
              Descubra Lavras além do caminho comum.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-green-100">
              Explore pontos turísticos, natureza, cultura, gastronomia,
              eventos e hospedagens em uma plataforma feita para valorizar
              Lavras.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/natureza"
                className="rounded-xl bg-white px-6 py-3 font-bold text-green-800 hover:bg-green-100"
              >
                Explorar agora
              </Link>

              <Link
                href="/cultura"
                className="rounded-xl border border-white/30 px-6 py-3 font-bold text-white hover:bg-white/10"
              >
                Ver cultura
              </Link>
            </div>
          </div>

          <div className="rounded-full bg-white/5 w-full h-full ">
            <div className="h-130 bg-contain bg-center bg-no-repeat bg-[url('/logotransparentefundo2.png')] " />
           
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-green-900">
              Explore por categoria
            </h2>
            <p className="mt-2 text-gray-600">
              Escolha o tipo de experiência que combina com sua viagem.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-5">
          {categorias.map((categoria) => {
            const Icon = categoria.icon;

            return (
              <Link
                key={categoria.nome}
                href={categoria.href}
                className="group rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-xl bg-green-100 p-3 text-green-700 group-hover:bg-green-700 group-hover:text-white">
                  <Icon size={24} />
                </div>

                <h3 className="font-bold text-gray-900">
                  {categoria.nome}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {categoria.texto}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-green-900">
              Pontos turísticos recentes
            </h2>
            <p className="mt-2 text-gray-600">
              Lugares cadastrados recentemente no portal.
            </p>
          </div>

          <Link
            href="/natureza"
            className="hidden items-center gap-2 font-semibold text-green-700 hover:text-green-900 md:flex"
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
          <div className="rounded-2xl bg-white p-10 text-center text-gray-500 shadow">
            Nenhum ponto turístico publicado ainda.
          </div>
        )}
      </section>
    </main>
  );
}