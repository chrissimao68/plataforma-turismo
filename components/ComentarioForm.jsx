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

    formData.set("pontoId", String(pontoId));
    formData.set("nota", String(nota));

    const result = await criarComentario(formData);

    if (result?.error) {
      toast.error(result.error);
    }

    if (result?.success) {
      toast.success(result.success);
      document.getElementById("comentario-form")?.reset();
      setNota(5);
    }

    setLoading(false);
  }

  return (
    <section className="mt-14 bg-white  w-full">
      <h2 className="text-2xl font-bold text-green-900">
        Deixe Seu Comentário
      </h2>

      <p className="mt-2 text-gray-600">
        Conte como foi sua experiência neste lugar.
      </p>

      <form id="comentario-form" action={handleSubmit} className="mt-6 space-y-5">
        <div className="flex justify-between  ">
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Nome
            </label>
            <input
              name="nome"
              required
              className="w-130 rounded-lg border p-2 outline-none focus:border-green-700"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Cidade
            </label>
            <input
              name="cidade"
              required
              className="w-80 rounded-lg border p-2 outline-none focus:border-green-700"
              placeholder="Sua cidade"
            />
          </div>
          <div>
          <label className="mb-2 block font-semibold text-gray-700">
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
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>
        </div>

        
        

        <div>
          <label className="mb-2 block font-semibold text-gray-700">
            Comentário
          </label>
          <textarea
            name="comentario"
            required
            rows={5}
            className="w-full rounded-lg border p-3 outline-none focus:border-green-700"
            placeholder="Escreva o que achou desse lugar..."
          />
        </div>

        <button
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
        >
          <Send size={18} />
          {loading ? "Enviando..." : "Enviar avaliação"}
        </button>
      </form>
    </section>
  );
}