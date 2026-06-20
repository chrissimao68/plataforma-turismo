import { prisma } from "@/lib/prisma";
import { editarPonto } from "@/app/actions/pontos";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function EditarPontoPage({ params }) {
  const { id } = await params;
  const pontoId = Number(id);

  if (Number.isNaN(pontoId)) {
    notFound();
  }

  const ponto = await prisma.pontoTuristico.findUnique({
    where: {
      id: pontoId,
    },
  });

  if (!ponto) {
    notFound();
  }

  async function atualizarPonto(formData) {
    "use server";
    await editarPonto(pontoId, formData);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800">
              Editar ponto turístico
            </h1>
            <p className="text-gray-600">
              Atualize as informações do ponto cadastrado.
            </p>
          </div>

          <Link href="/admin" className="text-sm font-semibold text-green-700">
            Voltar
          </Link>
        </div>

        <form action={atualizarPonto} className="space-y-5">
          <div>
            <label className="mb-1 block font-semibold">Título</label>
            <input
              name="titulo"
              defaultValue={ponto.titulo}
              required
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold">Descrição</label>
            <textarea
              name="descricao"
              defaultValue={ponto.descricao}
              required
              className="h-24 w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold">Conteúdo</label>
            <textarea
              name="conteudo"
              defaultValue={ponto.conteudo}
              required
              className="h-40 w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold">URL da imagem</label>
            <input
              name="imagem"
              defaultValue={ponto.imagem || ""}
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold">Endereço</label>
            <input
              name="endereco"
              defaultValue={ponto.endereco || ""}
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold">Categoria</label>
            <select
              name="categoria"
              defaultValue={ponto.categoria}
              required
              className="w-full rounded border p-3"
            >
              <option value="natureza">Natureza</option>
              <option value="cultura">Cultura</option>
              <option value="gastronomia">Gastronomia</option>
              <option value="hospedagem">Hospedagem</option>
              <option value="eventos">Eventos</option>
            </select>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="publicado"
              defaultChecked={ponto.publicado}
            />
            Publicado
          </label>

          <button
            type="submit"
            className="w-full rounded bg-green-700 px-4 py-3 font-semibold text-white hover:bg-green-800"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </main>
  );
}