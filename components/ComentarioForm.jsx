"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";
import { criarComentario } from "@/app/actions/comentarios";

export default function ComentarioForm({ pontoId }) {
  const [nota, setNota] = useState(5);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData) {
    setLoading(true);

    try {
      formData.set("pontoId", String(pontoId));
      formData.set("nota", String(nota));

      const result = await criarComentario(formData);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      if (result?.success) {
        toast.success(result.success);

        document
          .getElementById("comentario-form")
          ?.reset();

        setNota(5);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-14 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-2xl font-bold text-green-800 dark:text-green-400">
        Deixe Seu Comentário
      </h2>

      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Conte como foi sua experiência neste lugar.
      </p>

      <form
        id="comentario-form"
        action={handleSubmit}
        className="mt-6 space-y-6"
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_280px_220px]">
          {/* Nome */}
          <div>
            <label className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
              Nome
            </label>

            <input
              name="nome"
              required
              placeholder="Seu nome"
              className="
                w-full rounded-xl
                border border-zinc-300
                bg-white
                px-4 py-3
                text-zinc-900
                outline-none
                transition
                placeholder:text-zinc-400
                focus:border-green-700
                focus:ring-2
                focus:ring-green-200

                dark:border-zinc-700
                dark:bg-zinc-950
                dark:text-zinc-100
                dark:placeholder:text-zinc-500
                dark:focus:border-green-500
                dark:focus:ring-green-950
              "
            />
          </div>

          {/* Cidade */}
          <div>
            <label className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
              Cidade
            </label>

            <input
              name="cidade"
              required
              placeholder="Sua cidade"
              className="
                w-full rounded-xl
                border border-zinc-300
                bg-white
                px-4 py-3
                text-zinc-900
                outline-none
                transition
                placeholder:text-zinc-400
                focus:border-green-700
                focus:ring-2
                focus:ring-green-200

                dark:border-zinc-700
                dark:bg-zinc-950
                dark:text-zinc-100
                dark:placeholder:text-zinc-500
                dark:focus:border-green-500
                dark:focus:ring-green-950
              "
            />
          </div>

          {/* Nota */}
          <div>
            <label className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
              Nota
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((estrela) => (
                <button
                  key={estrela}
                  type="button"
                  onClick={() => setNota(estrela)}
                  className="transition hover:scale-110"
                >
                  <Star
                    size={28}
                    className={
                      estrela <= nota
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-300 dark:text-zinc-700"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comentário */}
        <div>
          <label className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
            Comentário
          </label>

          <textarea
            name="comentario"
            required
            rows={5}
            placeholder="Escreva o que achou desse lugar..."
            className="
              w-full rounded-xl
              border border-zinc-300
              bg-white
              p-4
              text-zinc-900
              outline-none
              transition
              placeholder:text-zinc-400
              focus:border-green-700
              focus:ring-2
              focus:ring-green-200

              dark:border-zinc-700
              dark:bg-zinc-950
              dark:text-zinc-100
              dark:placeholder:text-zinc-500
              dark:focus:border-green-500
              dark:focus:ring-green-950
            "
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={loading}
          className="
            flex items-center justify-center gap-2
            rounded-xl
            bg-green-700
            px-6 py-3
            font-semibold
            text-white
            shadow-sm
            transition-all
            hover:bg-green-800
            hover:shadow-md
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60

            dark:bg-green-600
            dark:hover:bg-green-500
          "
        >
          <Send size={18} />

          {loading ? "Enviando..." : "Enviar avaliação"}
        </button>
      </form>
    </section>
  );
}