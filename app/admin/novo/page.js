import { criarPontoTuristico } from "@/app/actions/pontos";
import {
  MapPin,
  Image as ImageIcon,
  FileText,
  Camera,
} from "lucide-react";

export default function NovoPontoPage() {
  return (
    <main className="p-8">
      <div className="mx-auto max-w-4xl">
        {/* Cabeçalho */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
            <MapPin size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Criar Ponto Turístico
            </h1>

            <p className="text-zinc-500 dark:text-zinc-400">
              Adicione um novo local ao portal Encantos de Lavras.
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <form action={criarPontoTuristico} className="space-y-6">
            {/* Título */}
            <div>
              <label className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
                Título
              </label>

              <input
                name="titulo"
                required
                placeholder="Ex: Praça Dr. Augusto Silva"
                className="
                  w-full rounded-xl
                  border border-zinc-300 dark:border-zinc-700
                  bg-white dark:bg-zinc-950
                  px-4 py-3
                  text-zinc-900 dark:text-zinc-100
                  placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                  outline-none
                  transition
                  focus:border-green-700 dark:focus:border-green-500
                  focus:ring-2
                  focus:ring-green-100 dark:focus:ring-green-950
                "
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
                Descrição curta
              </label>

              <input
                name="descricao"
                required
                placeholder="Resumo do local"
                className="
                  w-full rounded-xl
                  border border-zinc-300 dark:border-zinc-700
                  bg-white dark:bg-zinc-950
                  px-4 py-3
                  text-zinc-900 dark:text-zinc-100
                  placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                  outline-none
                  transition
                  focus:border-green-700 dark:focus:border-green-500
                  focus:ring-2
                  focus:ring-green-100 dark:focus:ring-green-950
                "
              />
            </div>

            {/* Conteúdo */}
            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold text-zinc-700 dark:text-zinc-300">
                <FileText size={18} />
                Conteúdo completo
              </label>

              <textarea
                name="conteudo"
                required
                rows={8}
                placeholder="Escreva o conteúdo completo da página..."
                className="
                  w-full rounded-xl
                  border border-zinc-300 dark:border-zinc-700
                  bg-white dark:bg-zinc-950
                  p-4
                  text-zinc-900 dark:text-zinc-100
                  placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                  outline-none
                  transition
                  focus:border-green-700 dark:focus:border-green-500
                  focus:ring-2
                  focus:ring-green-100 dark:focus:ring-green-950
                "
              />
            </div>

            {/* Endereço + Categoria */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
                  Endereço
                </label>

                <input
                  name="endereco"
                  placeholder="Endereço do local"
                  className="
                    w-full rounded-xl
                    border border-zinc-300 dark:border-zinc-700
                    bg-white dark:bg-zinc-950
                    px-4 py-3
                    text-zinc-900 dark:text-zinc-100
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                    outline-none
                    transition
                    focus:border-green-700 dark:focus:border-green-500
                    focus:ring-2
                    focus:ring-green-100 dark:focus:ring-green-950
                  "
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
                  Categoria
                </label>

                <select
                  name="categoria"
                  required
                  className="
                    w-full rounded-xl
                    border border-zinc-300 dark:border-zinc-700
                    bg-white dark:bg-zinc-950
                    px-4 py-3
                    text-zinc-900 dark:text-zinc-100
                    outline-none
                    transition
                    focus:border-green-700 dark:focus:border-green-500
                    focus:ring-2
                    focus:ring-green-100 dark:focus:ring-green-950
                  "
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="CULTURA">CULTURA</option>
                  <option value="NATUREZA">NATUREZA</option>
                  <option value="HOSPEDAGEM">HOSPEDAGEM</option>
                  <option value="GASTRONOMIA">GASTRONOMIA</option>
                  <option value="EVENTOS">EVENTOS</option>
                </select>
              </div>
            </div>

            {/* Imagem principal */}
            <div>
              <label className="mb-3 flex items-center gap-2 font-semibold text-zinc-700 dark:text-zinc-300">
                <ImageIcon size={18} />
                Imagem principal
              </label>

              <input
                name="imagem"
                type="file"
                accept="image/*"
                required
                className="
                  w-full rounded-xl
                  border border-zinc-300 dark:border-zinc-700
                  bg-white dark:bg-zinc-950
                  p-3
                  text-zinc-700 dark:text-zinc-300
                  file:mr-4
                  file:rounded-lg
                  file:border-0
                  file:bg-green-100 dark:file:bg-green-950
                  file:px-4
                  file:py-2
                  file:font-semibold
                  file:text-green-700 dark:file:text-green-300
                "
              />
            </div>

            {/* Galeria */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-4 flex items-center gap-2">
                <Camera
                  size={20}
                  className="text-blue-600 dark:text-blue-400"
                />

                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Galeria de Fotos
                </h3>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    name="fotos"
                    type="file"
                    accept="image/*"
                    className="
                      w-full rounded-xl
                      border border-zinc-300 dark:border-zinc-700
                      bg-white dark:bg-zinc-900
                      p-3
                      text-zinc-700 dark:text-zinc-300
                      file:mr-4
                      file:rounded-lg
                      file:border-0
                      file:bg-blue-100 dark:file:bg-blue-950
                      file:px-4
                      file:py-2
                      file:font-semibold
                      file:text-blue-700 dark:file:text-blue-300
                    "
                  />
                ))}
              </div>
            </div>

            {/* Botão */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="
                  rounded-xl
                  bg-green-700 dark:bg-green-600
                  px-8 py-3
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  hover:bg-green-800 dark:hover:bg-green-500
                  hover:shadow-md
                "
              >
                Criar Página
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}