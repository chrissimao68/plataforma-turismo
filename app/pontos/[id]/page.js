import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ComentarioForm from "@/components/ComentarioForm";
import ComentariosLista from "@/components/ComentariosLista";


export default async function PontoPage({ params }) {
  const { id } = await params;
  const pontoId = Number(id);

  if (Number.isNaN(pontoId)) {
    notFound();
  }

  const ponto = await prisma.pontoTuristico.findUnique({
    where: {
      id: pontoId,
    },
    include: {
      fotos: true,
      comentarios: {
    where: {
      aprovado: true,
    },
    orderBy: {
      criadoEm: "desc",
    },
  },
    },
  });

  if (!ponto || !ponto.publicado) {
    notFound();
  }

  return (
    <div className="w-full ">
      
      <main className="min-h-screen bg-gray-50">
        {ponto.imagem && (
          <img
            src={ponto.imagem}
            alt={ponto.titulo}
            className="h-[420px] w-full object-cover"
        />
      )}

      <section className="mx-auto max-w-5xl px-6 py-10">
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          {ponto.categoria}
        </span>

        <h1 className="mt-4 text-4xl font-bold text-green-900">
          {ponto.titulo}
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          {ponto.descricao}
        </p>

        {ponto.endereco && (
          <p className="mt-4 font-semibold text-gray-700">
            📍 {ponto.endereco}
          </p>
        )}

        <div className="mt-8 whitespace-pre-line text-gray-800 leading-8">
          {ponto.conteudo}
        </div>

        {ponto.fotos.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-bold text-green-900">
              Galeria
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              {ponto.fotos.map((foto) => (
                <img
                  key={foto.id}
                  src={foto.url}
                  alt={foto.legenda || ponto.titulo}
                  className="h-56 w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </section>
      <ComentariosLista comentarios={ponto.comentarios} />
<ComentarioForm pontoId={ponto.id} />
    </main>
      
    </div>
  );
}