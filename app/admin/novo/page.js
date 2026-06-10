import { criarPontoTuristico } from "@/app/actions/pontos";

export default function NovoPontoPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold text-green-700">
          Criar Ponto Turístico
        </h1>

        <form action={criarPontoTuristico} className="space-y-4">
          <input

            name="titulo"
            placeholder="Título do local"
            required
            className="w-full rounded border p-3"
          />

          <input
            name="descricao"
            placeholder="Descrição curta"
            required
            className="w-full rounded border p-3"
          />

          <textarea
            name="conteudo"
            placeholder="Conteúdo completo da página"
            required
            rows="6"
            className="w-full rounded border p-3"
          />

          <input
            name="imagem"
             type="file"
                accept="image/*"
            placeholder="URL da imagem principal"
            className="w-full rounded border p-3"
          />

          <input
            name="endereco"
            placeholder="Endereço do local"
            className="w-full rounded border p-3"
          />

          <select
            name="categoria"
            required
            className="w-full rounded border p-3"
          >
            <option value="">Selecione a categoria</option>
            <option value="CULTURA">Cultura</option>
            <option value="NATUREZA">Natureza</option>
            <option value="HOSPEDAGEM">Hospedagem</option>
            <option value="GASTRONOMIA">Gastronomia</option>
            <option value="EVENTOS">Eventos</option>
          </select>

          <div className="space-y-2">
            <p className="font-semibold">Galeria de fotos</p>

            <input name="fotos"
                    type="file"
                accept="image/*" className="w-full rounded border p-3" />
            <input name="fotos" type="file"
                accept="image/*" placeholder="URL da foto 2" className="w-full rounded border p-3" />
            <input name="fotos" type="file"
                accept="image/*" placeholder="URL da foto 3" className="w-full rounded border p-3" />
            <input name="fotos" type="file"
                accept="image/*" placeholder="URL da foto 4" className="w-full rounded border p-3" />
          </div>

          <button
            type="submit"
            className="rounded bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            Criar Página
          </button>
        </form>
      </div>
    </main>
  );
}