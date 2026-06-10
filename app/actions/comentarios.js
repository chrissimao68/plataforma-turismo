"use server";

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function criarComentario(formData) {
  const pontoId = Number(formData.get("pontoId"));
  const nome = String(formData.get("nome") || "").trim();
  const cidade = String(formData.get("cidade") || "").trim();
  const nota = Number(formData.get("nota"));
  const comentario = String(formData.get("comentario") || "").trim();

  await prisma.comentario.create({
    data: {
      nome,
      cidade,
      nota,
      comentario,
      aprovado: false,
      pontoTuristicoId: pontoId,
    },
  });

  revalidatePath(`/pontos/${pontoId}`);
  
  return {
  success: "Comentário enviado. Aguarde aprovação do administrador.",
};
}


export async function aprovarComentario(id) {
  const comentario = await prisma.comentario.update({
    where: {
      id: Number(id),
    },
    data: {
      aprovado: true,
    },
  });

  revalidatePath("/admin/comentarios");
  revalidatePath(`/pontos/${comentario.pontoTuristicoId}`);
  return {
  success: "Comentário aprovado com sucesso.",
};
}

export async function excluirComentario(id) {
  const comentario = await prisma.comentario.delete({
    where: {
      id: Number(id),
    },
  });

  revalidatePath("/admin/comentarios");
  revalidatePath(`/pontos/${comentario.pontoTuristicoId}`);
  return {
  success: "Comentário excluído com sucesso.", 
};
}