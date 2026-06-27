"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { excluirPonto } from "@/app/actions/pontos";
import { useRouter } from "next/navigation";

export default function DeletePontoButton({ id }) {
  const router = useRouter();

  function confirmarExclusao() {
    toast.warning("Excluir ponto turístico?", {
      description: "Essa ação não poderá ser desfeita.",
      action: {
        label: "Excluir",
        onClick: async () => {
          try {
            await excluirPonto(id);
            toast.success("Ponto turístico excluído com sucesso!");
            router.refresh();
          } catch {
            toast.error("Erro ao excluir o ponto turístico.");
          }
        },
      },
      cancel: {
        label: "Cancelar",
      },
    });
  }

  return (
    <button
      type="button"
      onClick={confirmarExclusao}
      title="Excluir ponto turístico"
      className="
        flex w-full items-center justify-center gap-2
        rounded-xl
        bg-red-50/90
        px-3 py-2.5
        text-sm font-semibold
        text-red-600
        shadow-sm
        transition-all
        hover:bg-red-600
        hover:text-white
        hover:shadow-md
        active:scale-95

        dark:bg-red-950/40
        dark:text-red-300
        dark:hover:bg-red-600
        dark:hover:text-white

        lg:w-auto
        lg:bg-red-600/10
        lg:px-3
        lg:py-2
        lg:text-red-400
        lg:hover:bg-red-600
        lg:hover:text-white
      "
    >
      <Trash2 size={16} />

      <span className="lg:hidden xl:inline">
        Excluir
      </span>
    </button>
  );
}