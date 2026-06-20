"use client";

import { Check, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  aprovarComentario,
  excluirComentario,
} from "@/app/actions/comentarios";

export default function ComentarioActions({ id, aprovado }) {
  const router = useRouter();

  async function handleAprovar() {
    const result = await aprovarComentario(id);

    if (result?.success) {
      toast.success(result.success);
      router.refresh();
    }

    if (result?.error) {
      toast.error(result.error);
    }
  }

  async function handleExcluir() {
    const confirmar = confirm("Deseja excluir este comentário?");
    if (!confirmar) return;

    const result = await excluirComentario(id);

    if (result?.success) {
      toast.success(result.success);
      router.refresh();
    }

    if (result?.error) {
      toast.error(result.error);
    }
  }

  return (
    <div className="flex gap-2">
      {!aprovado && (
        <button
          onClick={handleAprovar}
          className="rounded bg-green-700 p-2 text-white hover:bg-green-800"
          title="Aprovar comentário"
        >
          <Check size={16} />
        </button>
      )}

      <button
        onClick={handleExcluir}
        className="rounded bg-red-600 p-2 text-white hover:bg-red-700"
        title="Excluir comentário"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}