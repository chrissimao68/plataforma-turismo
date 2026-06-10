import { prisma } from "@/lib/prisma";
import CardPonto from "@/components/CardPonto";

export default async function NaturezaPage() {
  const pontos = await prisma.pontoTuristico.findMany({
    where: {
      categoria: "natureza",
      publicado: true,
    },
    orderBy: {
      criadoEm: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-green-800">Natureza</h1>
        <p className="mt-2 text-gray-600">
          Cachoeiras, trilhas, paisagens e experiências ao ar livre em Lavras.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pontos.map((ponto) => (
            <CardPonto key={ponto.id} ponto={ponto} />
          ))}
        </div>
      </section>
    </main>
  );
}