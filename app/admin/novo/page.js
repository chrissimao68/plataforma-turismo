import { criarPontoTuristico } from "@/app/actions/pontos"
import {
  MapPin,
  Image as ImageIcon,
  FileText,
  Camera,
  Save,
} from "lucide-react"

export default function NovoPontoPage() {
  return (
    <main className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex items-center gap-4 sm:mb-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 sm:h-14 sm:w-14">
            <MapPin size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              Criar Ponto Turístico
            </h1>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
              Adicione um novo local ao portal Encantos de Lavras.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-3xl sm:p-8">
          <form action={criarPontoTuristico} className="space-y-5 sm:space-y-6">
            <FormField label="Título">
              <input
                name="titulo"
                required
                placeholder="Ex: Praça Dr. Augusto Silva"
                className={inputClass}
              />
            </FormField>

            <FormField label="Descrição curta">
              <input
                name="descricao"
                required
                placeholder="Resumo do local"
                className={inputClass}
              />
            </FormField>

            <FormField
              label={
                <span className="flex items-center gap-2">
                  <FileText size={18} />
                  Conteúdo completo
                </span>
              }
            >
              <textarea
                name="conteudo"
                required
                rows={8}
                placeholder="Escreva o conteúdo completo da página..."
                className={`${inputClass} min-h-44 resize-y p-4`}
              />
            </FormField>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField label="Endereço">
                <input
                  name="endereco"
                  placeholder="Endereço do local"
                  className={inputClass}
                />
              </FormField>

              <FormField label="Categoria">
                <select name="categoria" required className={inputClass}>
                  <option value="">Selecione uma categoria</option>
                  <option value="CULTURA">CULTURA</option>
                  <option value="NATUREZA">NATUREZA</option>
                  <option value="HOSPEDAGEM">HOSPEDAGEM</option>
                  <option value="GASTRONOMIA">GASTRONOMIA</option>
                  <option value="EVENTOS">EVENTOS</option>
                </select>
              </FormField>
            </div>

            <FormField
              label={
                <span className="flex items-center gap-2">
                  <ImageIcon size={18} />
                  Imagem principal
                </span>
              }
            >
              <input
                name="imagem"
                type="file"
                accept="image/*"
                required
                className={fileInputClass}
              />
            </FormField>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950 sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <Camera
                  size={20}
                  className="text-blue-600 dark:text-blue-400"
                />

                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Galeria de Fotos
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    name="fotos"
                    type="file"
                    accept="image/*"
                    className={galleryInputClass}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-green-800 hover:shadow-md active:scale-[0.98] dark:bg-green-600 dark:hover:bg-green-500 sm:w-auto sm:px-8"
              >
                <Save size={18} />
                Criar Página
              </button>
            </div>
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

const fileInputClass = `
  w-full rounded-xl border border-zinc-300 bg-white
  p-3 text-sm text-zinc-700 outline-none transition
  file:mr-4 file:rounded-lg file:border-0
  file:bg-green-100 file:px-4 file:py-2
  file:font-semibold file:text-green-700
  dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300
  dark:file:bg-green-950 dark:file:text-green-300
`

const galleryInputClass = `
  w-full rounded-xl border border-zinc-300 bg-white
  p-3 text-sm text-zinc-700 outline-none transition
  file:mr-4 file:rounded-lg file:border-0
  file:bg-blue-100 file:px-4 file:py-2
  file:font-semibold file:text-blue-700
  dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300
  dark:file:bg-blue-950 dark:file:text-blue-300
`