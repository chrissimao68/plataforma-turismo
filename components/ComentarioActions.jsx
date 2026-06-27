"use client"

import { Check, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  aprovarComentario,
  excluirComentario,
} from "@/app/actions/comentarios"

export default function ComentarioActions({ id, aprovado }) {
  const router = useRouter()

  async function handleAprovar() {
    try {
      const result = await aprovarComentario(id)

      if (result?.success) {
        toast.success(result.success)
        router.refresh()
      }

      if (result?.error) {
        toast.error(result.error)
      }
    } catch {
      toast.error("Erro ao aprovar o comentário.")
    }
  }

  async function handleExcluir() {
    const confirmar = confirm("Deseja excluir este comentário?")

    if (!confirmar) return

    try {
      const result = await excluirComentario(id)

      if (result?.success) {
        toast.success(result.success)
        router.refresh()
      }

      if (result?.error) {
        toast.error(result.error)
      }
    } catch {
      toast.error("Erro ao excluir o comentário.")
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {!aprovado && (
        <button
          type="button"
          onClick={handleAprovar}
          title="Aprovar comentário"
          className="
            inline-flex h-10 w-10 items-center justify-center
            rounded-xl bg-green-700 text-white shadow-sm
            transition-all hover:bg-green-800 hover:shadow-md
            active:scale-95 dark:bg-green-600 dark:hover:bg-green-500
            sm:h-9 sm:w-9
          "
        >
          <Check size={16} />
        </button>
      )}

      <button
        type="button"
        onClick={handleExcluir}
        title="Excluir comentário"
        className="
          inline-flex h-10 w-10 items-center justify-center
          rounded-xl bg-red-600 text-white shadow-sm
          transition-all hover:bg-red-700 hover:shadow-md
          active:scale-95 dark:bg-red-600 dark:hover:bg-red-500
          sm:h-9 sm:w-9
        "
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}