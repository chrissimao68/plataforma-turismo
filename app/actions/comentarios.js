"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function revalidarCategoria(categoria) {
  if (!categoria) return;

  const slug = categoria.toLowerCase();

  revalidatePath(`/${slug}`);
}

export async function criarComentario(formData) {
  const pontoId = Number(formData.get("pontoId"));
  const nome = String(formData.get("nome") || "").trim();
  const cidade = String(formData.get("cidade") || "").trim();
  const nota = Number(formData.get("nota"));
  const comentario = String(formData.get("comentario") || "").trim();

  if (!pontoId || !nome || !cidade || !nota || !comentario) {
  return {
    error: "Preencha todos os campos.",
  };
}

if (nota < 1 || nota > 5) {
  return {
    error: "A nota deve ser entre 1 e 5.",
  };
}

  const ponto = await prisma.pontoTuristico.findUnique({
    where: {
      id: pontoId,
    },
    select: {
      categoria: true,
    },
  });

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

  revalidatePath("/admin/comentarios");
revalidatePath("/admin");
revalidatePath(`/pontos/${pontoId}`);

  if (ponto?.categoria) {
    revalidarCategoria(ponto.categoria);
  }

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
    include: {
      pontoTuristico: {
        select: {
          categoria: true,
        },
      },
    },
  });

  revalidatePath("/admin/comentarios");
  revalidatePath(`/pontos/${comentario.pontoTuristicoId}`);

  if (comentario.pontoTuristico?.categoria) {
    revalidarCategoria(comentario.pontoTuristico.categoria);
  }

  return {
    success: "Comentário aprovado com sucesso.",
  };
}

export async function excluirComentario(id) {
  const comentario = await prisma.comentario.delete({
    where: {
      id: Number(id),
    },
    include: {
      pontoTuristico: {
        select: {
          categoria: true,
        },
      },
    },
  });

  revalidatePath("/admin/comentarios");
  revalidatePath(`/pontos/${comentario.pontoTuristicoId}`);

  if (comentario.pontoTuristico?.categoria) {
    revalidarCategoria(comentario.pontoTuristico.categoria);
  }

  return {
    success: "Comentário excluído com sucesso.",
  };
}