import { Star } from "lucide-react";

export default function ComentariosLista({ comentarios }) {
  if (!comentarios || comentarios.length === 0) {
    return (
      <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors sm:mt-10 sm:p-6">
        <h2 className="text-xl font-bold text-green-800 sm:text-2xl">
          Avaliações
        </h2>

        <p className="mt-2 text-sm text-zinc-500 sm:text-base">
          Ainda não há avaliações. Seja o primeiro a comentar.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 sm:mt-10">
      <h2 className="text-xl font-bold text-green-800 sm:text-2xl">
        Avaliações dos visitantes
      </h2>

      <div className="mt-5 space-y-4">
        {comentarios.map((item) => (
          <article
            key={item.id}
            className="
              rounded-2xl
              border border-zinc-200
              bg-white
              p-4
              shadow-sm
              transition-all
              hover:shadow-md

              sm:p-5
            "
          >
            {/* Cabeçalho */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-bold text-zinc-900 sm:text-lg">
                  {item.nome}
                </h3>

                <p className="text-sm text-zinc-500">
                  {item.cidade}
                </p>
              </div>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((estrela) => (
                  <Star
                    key={estrela}
                    size={18}
                    className={
                      estrela <= item.nota
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-300"
                    }
                  />
                ))}
              </div>
            </div>

            {/* Comentário */}
            <p className="mt-4 text-sm leading-7 text-zinc-700 sm:text-base">
              {item.comentario}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}