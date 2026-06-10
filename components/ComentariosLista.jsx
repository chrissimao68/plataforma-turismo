import { Star } from "lucide-react";

export default function ComentariosLista({ comentarios }) {
  if (!comentarios || comentarios.length === 0) {
    return (
      <section className="mt-10 rounded-3xl bg-white p-6 shadow">
        <h2 className="text-2xl font-bold text-green-900">
          Avaliações
        </h2>
        <p className="mt-2 text-gray-500">
          Ainda não há avaliações. Seja o primeiro a comentar.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-green-900">
        Avaliações dos visitantes
      </h2>

      <div className="mt-5 space-y-4">
        {comentarios.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl bg-white p-5 shadow"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900">{item.nome}</h3>
                <p className="text-sm text-gray-500">{item.cidade}</p>
              </div>

              <div className="flex">
                {[1, 2, 3, 4, 5].map((estrela) => (
                  <Star
                    key={estrela}
                    size={18}
                    className={
                      estrela <= item.nota
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>

            <p className="mt-4 leading-7 text-gray-700">
              {item.comentario}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}