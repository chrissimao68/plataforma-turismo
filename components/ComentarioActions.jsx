"use client";

import { Check, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  aprovarComentario,
  excluirComentario,
} from "@/app/actions/comentarios";

export default function ComentarioActions({
  id,
  aprovado,
}) {
  const router = useRouter();

  async function handleAprovar() {
    try {
      const result = await aprovarComentario(id);

      if (result?.success) {
        toast.success(result.success);
        router.refresh();
      }

      if (result?.error) {
        toast.error(result.error);
      }
    } catch {
      toast.error(
        "Erro ao aprovar o comentário."
      );
    }
  }

  async function handleExcluir() {
    const confirmar = confirm(
      "Deseja excluir este comentário?"
    );

    if (!confirmar) return;

    try {
      const result = await excluirComentario(id);

      if (result?.success) {
        toast.success(result.success);
        router.refresh();
      }

      if (result?.error) {
        toast.error(result.error);
      }
    } catch {
      toast.error(
        "Erro ao excluir o comentário."
      );
    }
  }

  return (
    <div className="flex items-center gap-2">
      {!aprovado && (
        <button
          onClick={handleAprovar}
          title="Aprovar comentário"
          className="
            flex items-center justify-center
            rounded-lg
            bg-green-700
            p-2
            text-white
            shadow-sm
            transition-all
            hover:bg-green-800
            hover:shadow-md
            active:scale-95
          "
        >
          <Check size={16} />
        </button>
      )}

      <button
        onClick={handleExcluir}
        title="Excluir comentário"
        className="
          flex items-center justify-center
          rounded-lg
          bg-red-600
          p-2
          text-white
          shadow-sm
          transition-all
          hover:bg-red-700
          hover:shadow-md
          active:scale-95
        "
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}