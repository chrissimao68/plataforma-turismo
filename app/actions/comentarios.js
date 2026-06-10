"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function criarComentario(pontoId, formData) {
  const nome = String(formData.get("nome") || "").trim();
  const cidade = String(formData.get("cidade") || "").trim();
  const nota = Number(formData.get("nota"));
  const comentario = String(formData.get("comentario") || "").trim();

  if (!nome || !cidade || !comentario || nota < 1 || nota > 5) {
    return { error: "Preencha todos os campos corretamente." };
  }

  await prisma.comentario.create({
    data: {
      nome,
      cidade,
      nota,
      comentario,
      aprovado: false, // Comentário precisa ser aprovado por um admin
      pontoTuristicoId: Number(pontoId),
    },
  });

  revalidatePath(`/pontos/${pontoId}`);

  return { success: "Comentário enviado! Ele será publicado após aprovação." };
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
}

export async function excluirComentario(id) {
  const comentario = await prisma.comentario.delete({
    where: {
      id: Number(id),
    },
  });

  revalidatePath("/admin/comentarios");
  revalidatePath(`/pontos/${comentario.pontoTuristicoId}`);
}