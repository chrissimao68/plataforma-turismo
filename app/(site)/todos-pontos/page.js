import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CardPonto from "@/components/CardPonto";

const categorias = [
  { nome: "Todos", valor: "" },
  { nome: "Natureza", valor: "NATUREZA" },
  { nome: "Cultura", valor: "CULTURA" },
  { nome: "Gastronomia", valor: "GASTRONOMIA" },
  { nome: "Eventos", valor: "EVENTOS" },
  { nome: "Hospedagem", valor: "HOSPEDAGEM" },
];

export default async function PontosPage({ searchParams }) {
  const params = await searchParams;
  const categoria = params?.categoria;

  const pontos = await prisma.pontoTuristico.findMany({
    where: {
      publicado: true,
      ...(categoria ? { categoria } : {}),
    },
    include: {
      comentarios: {
        where: {
          aprovado: true,
        },
      },
    },
    orderBy: {
      criadoEm: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
        >
          ← Voltar para início
        </Link>

        <h1 className="mt-4 text-3xl font-black text-emerald-600 sm:text-4xl">
          Todos os pontos turísticos
        </h1>

        <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-400">
          Explore os atrativos turísticos, eventos, restaurantes, hospedagens e
          demais locais de interesse cadastrados na Plataforma Turismo Lavras.
        </p>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {pontos.length}{" "}
          {pontos.length === 1 ? "local encontrado" : "locais encontrados"}
        </p>

        {/* Categorias */}
        <div className="mt-8 flex flex-wrap gap-3">
          {categorias.map((item) => (
            <Link
              key={item.nome}
              href={
                item.valor
                  ? `/todos-pontos?categoria=${item.valor}`
                  : "/todos-pontos"
              }
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                categoria === item.valor || (!categoria && item.valor === "")
                  ? "bg-emerald-600 text-white"
                  : "border border-zinc-300 bg-white hover:border-emerald-600 hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900"
              }`}
            >
              {item.nome}
            </Link>
          ))}
        </div>

        {pontos.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-500 dark:text-zinc-400">
              Nenhum ponto turístico encontrado nesta categoria.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pontos.map((ponto) => (
              <CardPonto key={ponto.id} ponto={ponto} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
