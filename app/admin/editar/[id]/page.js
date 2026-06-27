import { prisma } from "@/lib/prisma"
import { editarPonto } from "@/app/actions/pontos"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  MapPin,
  Save,
} from "lucide-react"

export default async function EditarPontoPage({ params }) {
  const { id } = await params
  const pontoId = Number(id)

  if (Number.isNaN(pontoId)) {
    notFound()
  }

  const ponto = await prisma.pontoTuristico.findUnique({
    where: {
      id: pontoId,
    },
  })

  if (!ponto) {
    notFound()
  }

  async function atualizarPonto(formData) {
    "use server"
    await editarPonto(pontoId, formData)
  }

  return (
    <main className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 sm:h-14 sm:w-14">
              <MapPin size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
                Editar ponto turístico
              </h1>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
                Atualize as informações do ponto cadastrado.
              </p>
            </div>
          </div>

          <Link
            href="/admin/pontos"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-green-700 hover:bg-green-50 hover:text-green-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-green-500 dark:hover:bg-green-950 dark:hover:text-green-400 sm:w-auto"
          >
            <ArrowLeft size={16} />
            Voltar
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-3xl sm:p-8">
          <form action={atualizarPonto} className="space-y-5 sm:space-y-6">
            <FormField label="Título">
              <input
                name="titulo"
                defaultValue={ponto.titulo}
                required
                className={inputClass}
              />
            </FormField>

            <FormField label="Descrição">
              <textarea
                name="descricao"
                defaultValue={ponto.descricao}
                required
                rows={4}
                className={`${inputClass} min-h-28 resize-none p-4`}
              />
            </FormField>

            <FormField
              label={
                <span className="flex items-center gap-2">
                  <FileText size={18} />
                  Conteúdo
                </span>
              }
            >
              <textarea
                name="conteudo"
                defaultValue={ponto.conteudo}
                required
                rows={8}
                className={`${inputClass} min-h-44 resize-y p-4`}
              />
            </FormField>

            <FormField
              label={
                <span className="flex items-center gap-2">
                  <ImageIcon size={18} />
                  URL da imagem
                </span>
              }
            >
              <input
                name="imagem"
                defaultValue={ponto.imagem || ""}
                placeholder="https://..."
                className={inputClass}
              />
            </FormField>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField label="Endereço">
                <input
                  name="endereco"
                  defaultValue={ponto.endereco || ""}
                  className={inputClass}
                />
              </FormField>

              <FormField label="Categoria">
                <select
                  name="categoria"
                  defaultValue={ponto.categoria}
                  required
                  className={inputClass}
                >
                  <option value="NATUREZA">Natureza</option>
                  <option value="CULTURA">Cultura</option>
                  <option value="GASTRONOMIA">Gastronomia</option>
                  <option value="HOSPEDAGEM">Hospedagem</option>
                  <option value="EVENTOS">Eventos</option>
                </select>
              </FormField>
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <input
                type="checkbox"
                name="publicado"
                defaultChecked={ponto.publicado}
                className="h-5 w-5 accent-green-700 dark:accent-green-500"
              />
              Publicado
            </label>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800 hover:shadow-md active:scale-[0.98] dark:bg-green-600 dark:hover:bg-green-500"
            >
              <Save size={18} />
              Salvar alterações
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
        {label}
      </label>

      {children}
    </div>
  )
}

const inputClass = `
  w-full rounded-xl border border-zinc-300 bg-white
  px-4 py-3 text-zinc-900 outline-none transition
  placeholder:text-zinc-400
  focus:border-green-700 focus:ring-2 focus:ring-green-100
  dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100
  dark:placeholder:text-zinc-500
  dark:focus:border-green-500 dark:focus:ring-green-950
`