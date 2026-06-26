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
          try {
            await excluirPonto(id);

            toast.success(
              "Ponto turístico excluído com sucesso!"
            );
          } catch (error) {
            toast.error(
              "Erro ao excluir o ponto turístico."
            );
          }
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
      className="
        flex items-center gap-2
        rounded-lg
        bg-red-600
        px-3 py-2
        text-sm font-semibold
        text-white
        shadow-sm
        transition-all
        hover:bg-red-700
        hover:shadow-md
        active:scale-95
      "
      title="Excluir ponto turístico"
    >
      <Trash2 size={16} />
    </button>
  );
}