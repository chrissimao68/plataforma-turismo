import { Star } from "lucide-react";

export default function ComentariosLista({ comentarios }) {
  if (!comentarios || comentarios.length === 0) {
    return (
      <section className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors">
        <h2 className="text-2xl font-bold text-green-800">
          Avaliações
        </h2>

        <p className="mt-2 text-zinc-500">
          Ainda não há avaliações. Seja o primeiro a comentar.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-green-800">
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
              p-5
              shadow-sm
              transition-all
              hover:shadow-md
            "
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-zinc-900">
                  {item.nome}
                </h3>

                <p className="text-sm text-zinc-500">
                  {item.cidade}
                </p>
              </div>

              <div className="flex gap-0.5">
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

            <p className="mt-4 leading-7 text-zinc-700">
              {item.comentario}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}