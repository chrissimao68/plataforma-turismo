import { prisma } from "@/lib/prisma";
import { editarPonto } from "@/app/actions/pontos";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  MapPin,
  Save,
} from "lucide-react";

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
    <main className="p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm">
              <MapPin size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-zinc-900">
                Editar ponto turístico
              </h1>

              <p className="text-zinc-500">
                Atualize as informações do ponto cadastrado.
              </p>
            </div>
          </div>

          <Link
            href="/admin/pontos"
            className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-green-700 hover:bg-green-50 hover:text-green-700"
          >
            <ArrowLeft size={16} />
            Voltar
          </Link>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <form action={atualizarPonto} className="space-y-6">
            <div>
              <label className="mb-2 block font-semibold text-zinc-700">
                Título
              </label>

              <input
                name="titulo"
                defaultValue={ponto.titulo}
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-zinc-700">
                Descrição
              </label>

              <textarea
                name="descricao"
                defaultValue={ponto.descricao}
                required
                rows={4}
                className="w-full rounded-xl border border-zinc-300 p-4 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold text-zinc-700">
                <FileText size={18} />
                Conteúdo
              </label>

              <textarea
                name="conteudo"
                defaultValue={ponto.conteudo}
                required
                rows={8}
                className="w-full rounded-xl border border-zinc-300 p-4 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold text-zinc-700">
                <ImageIcon size={18} />
                URL da imagem
              </label>

              <input
                name="imagem"
                defaultValue={ponto.imagem || ""}
                placeholder="https://..."
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-zinc-700">
                  Endereço
                </label>

                <input
                  name="endereco"
                  defaultValue={ponto.endereco || ""}
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-zinc-700">
                  Categoria
                </label>

                <select
                  name="categoria"
                  defaultValue={ponto.categoria}
                  required
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                >
                  <option value="NATUREZA">Natureza</option>
                  <option value="CULTURA">Cultura</option>
                  <option value="GASTRONOMIA">
                    Gastronomia
                  </option>
                  <option value="HOSPEDAGEM">Hospedagem</option>
                  <option value="EVENTOS">Eventos</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-semibold text-zinc-700">
              <input
                type="checkbox"
                name="publicado"
                defaultChecked={ponto.publicado}
                className="h-5 w-5 accent-green-700"
              />
              Publicado
            </label>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800 hover:shadow-md"
            >
              <Save size={18} />
              Salvar alterações
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}