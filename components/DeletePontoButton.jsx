"use client";

import { Trash2 } from "lucide-react";
import { excluirPonto } from "@/app/actions/pontos";
import { toast } from "sonner";

export default function DeletePontoButton({ id }) {
  async function handleDelete() {
    const confirmou = confirm("Tem certeza que deseja excluir este ponto turístico?");

    if (!confirmou) return;

    await excluirPonto(id);
    toast.success("Ponto turístico excluído com sucesso.");
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="flex items-center gap-1 rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700">
                            
      <Trash2 size={16} />
    </button>
  );
}