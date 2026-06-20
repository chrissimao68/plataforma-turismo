"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { excluirPonto } from "@/app/actions/pontos";

export default function DeletePontoButton({ id }) {
  function confirmarExclusao() {
    toast.warning("Excluir ponto turístico?", {
      description: "Essa ação não poderá ser desfeita.",
      action: {
        label: "Excluir",
        onClick: async () => {
          await excluirPonto(id);
          toast.success("Ponto turístico excluído com sucesso!");
        },
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {
          toast.info("Exclusão cancelada.");
        },
      },
    });
  }

  return (
    <button
      type="button"
      onClick={confirmarExclusao}
      className="flex items-center gap-1 rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700">
                            
      <Trash2 size={16} />
    </button>
  );
}