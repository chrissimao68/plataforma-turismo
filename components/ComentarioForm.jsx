"use client"

import { useState } from "react"
import { Star, Send } from "lucide-react"
import { toast } from "sonner"
import { criarComentario } from "@/app/actions/comentarios"

export default function ComentarioForm({ pontoId }) {
  const [nota, setNota] = useState(5)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData) {
    setLoading(true)

    try {
      formData.set("pontoId", String(pontoId))
      formData.set("nota", String(nota))

      const result = await criarComentario(formData)

      if (result?.error) {
        toast.error(result.error)
        return
      }

      if (result?.success) {
        toast.success(result.success)
        document.getElementById("comentario-form")?.reset()
        setNota(5)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-3xl sm:p-8">
      <h2 className="text-2xl font-bold text-green-800 dark:text-green-400">
        Deixe seu comentário
      </h2>

      <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
        Conte como foi sua experiência neste lugar.
      </p>

      <form
        id="comentario-form"
        action={handleSubmit}
        className="mt-6 space-y-5 sm:space-y-6"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px_220px]">
          <FormField label="Nome">
            <input
              name="nome"
              required
              placeholder="Seu nome"
              className={inputClass}
            />
          </FormField>

          <FormField label="Cidade">
            <input
              name="cidade"
              required
              placeholder="Sua cidade"
              className={inputClass}
            />
          </FormField>

          <div>
            <label className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
              Nota
            </label>

            <div className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950">
              {[1, 2, 3, 4, 5].map((estrela) => (
                <button
                  key={estrela}
                  type="button"
                  onClick={() => setNota(estrela)}
                  className="transition hover:scale-110"
                  aria-label={`Dar nota ${estrela}`}
                >
                  <Star
                    size={24}
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

        <FormField label="Comentário">
          <textarea
            name="comentario"
            required
            rows={5}
            placeholder="Escreva o que achou desse lugar..."
            className={`${inputClass} min-h-32 resize-none p-4`}
          />
        </FormField>

        <button
          type="submit"
          disabled={loading}
          className="
            flex w-full items-center justify-center gap-2 rounded-xl
            bg-green-700 px-6 py-3 font-semibold text-white
            shadow-sm transition-all hover:bg-green-800 hover:shadow-md
            active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60
            dark:bg-green-600 dark:hover:bg-green-500
            sm:w-auto
          "
        >
          <Send size={18} />
          {loading ? "Enviando..." : "Enviar avaliação"}
        </button>
      </form>
    </section>
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
  focus:border-green-700 focus:ring-2 focus:ring-green-200
  dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100
  dark:placeholder:text-zinc-500
  dark:focus:border-green-500 dark:focus:ring-green-950
`