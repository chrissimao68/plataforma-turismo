import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CardPonto from "@/components/CardPonto";
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
    corIcone: "text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 ",
    corLink: "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent",
    Icon: Trees,
  },
  {
    titulo: "Cultura",
    descricao: "História, museus e patrimônio cultural.",
    href: "/cultura",
    imagem: "/cultucapa.jpg",
    cor: "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700",
    corIcone: "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700",
    corLink: "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent",
    Icon: Landmark,
  },
  {
    titulo: "Gastronomia",
    descricao: "Sabores e experiências locais.",
    href: "/gastronomia",
    imagem: "/gastrocapa.jpg",
    cor: "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700",
    corIcone: "text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700",
    corLink: "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700 bg-clip-text text-transparent",
    Icon: Utensils,
  },
  {
    titulo: "Eventos",
    descricao: "Festas e encontros da cidade.",
    href: "/eventos",
    imagem: "/evencapa.jpg",
    cor: "bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700",
    corIcone: "text-white bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700",
    corLink: "bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 bg-clip-text text-transparent",
    Icon: CalendarDays,
  },
  {
    titulo: "Hospedagem",
    descricao: "Hotéis, pousadas, conforto e outros.",
    href: "/hospecapa.jpg",
    imagem: "/hospecapa.jpg",
    cor: "bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700",
    corIcone: "text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700",
    corLink: "bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 bg-clip-text text-transparent",
    Icon: Hotel,
  },
];

  return (
    <main className="bg-white">
      <section className="  text-white h-178 flex flex-col items-center  bg-[url('/fotocapaescura.png')] bg-cover bg-center">
        

        <div className=" grid w-[80%]   pl-36    lg:grid-cols-2 lg:items-center">
          <div className="  w-full flex flex-col gap-10 ">
            

            <h1 className="mt-6 text-6xl font-extrabold  md:text-7xl">
              Conheça Lavras além do caminho comum.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-7 text-green-100">
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

          <div className="rounded-full w-full h-full ">
            <div className="h-150 bg-contain bg-center bg-no-repeat bg-[url('/logotransparentefundo2.png')] " />
           
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
  <div className="mb-10">
    <h2 className="text-4xl font-bold text-zinc-900">
      Explore por categoria
    </h2>

    <p className="mt-3 text-zinc-600">
      Escolha o tipo de experiência que combina com sua viagem.
    </p>
  </div>

  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
    {categorias.map((item) => {
      const Icon = item.Icon;

      return (
        <Link
          key={item.titulo}
          href={item.href}
          className="group"
        >
          <div className="relative h-[330px] overflow-hidden rounded-[15px] shadow-xl">
            
            {/* imagem */}

            <img
              src={item.imagem}
              alt={item.titulo}
              className="
                absolute inset-0
                w-full h-full
                object-cover
                transition duration-700
                group-hover:scale-120
              "
            />

            {/* overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />

            {/* conteúdo */}

            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">

              <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 ${item.corIcone}`}>
                <Icon size={30} />
              </div>

              <h3 className="text-3xl font-bold mb-3">
                {item.titulo}
              </h3>

              <p className="text-white/90 leading-relaxed">
                {item.descricao}
              </p>

              <span className={`mt-3 font-semibold text-lg ${item.corLink}`}>
                Explorar →
              </span>
            </div>

            {/* faixa inferior */}

            <div
              className={`
                absolute
                bottom-0
                left-0
                h-[8px]
                w-full
                ${item.cor}
              `}
            />
          </div>
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