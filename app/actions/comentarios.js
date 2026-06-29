"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function revalidarCategoria(categoria) {
  if (!categoria) return;

  const slug = String(categoria).toLowerCase();

  revalidatePath(`/${slug}`);
}

function revalidarComentario(pontoId, categoria) {
  revalidatePath("/admin");
  revalidatePath("/admin/comentarios");

  if (pontoId) {
    revalidatePath(`/pontos/${pontoId}`);
  }

  if (categoria) {
    revalidarCategoria(categoria);
  }
}

export async function criarComentario(formData) {
  const pontoId = Number(formData.get("pontoId"));
  const nome = String(formData.get("nome") || "").trim();
  const cidade = String(formData.get("cidade") || "").trim();
  const nota = Number(formData.get("nota"));
  const comentario = String(formData.get("comentario") || "").trim();

  if (
    Number.isNaN(pontoId) ||
    !pontoId ||
    !nome ||
    !cidade ||
    Number.isNaN(nota) ||
    !nota ||
    !comentario
  ) {
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
      id: true,
      categoria: true,
    },
  });

  if (!ponto) {
    return {
      error: "Ponto turístico não encontrado.",
    };
  }

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

  revalidarComentario(pontoId, ponto.categoria);

  return {
    success: "Comentário enviado. Aguarde aprovação do administrador.",
  };
}

export async function aprovarComentario(id) {
  const comentarioId = Number(id);

  if (Number.isNaN(comentarioId)) {
    return {
      error: "Comentário inválido.",
    };
  }

  const comentario = await prisma.comentario.update({
    where: {
      id: comentarioId,
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

  revalidarComentario(
    comentario.pontoTuristicoId,
    comentario.pontoTuristico?.categoria
  );

  return {
    success: "Comentário aprovado com sucesso.",
  };
}

export async function excluirComentario(id) {
  const comentarioId = Number(id);

  if (Number.isNaN(comentarioId)) {
    return {
      error: "Comentário inválido.",
    };
  }

  const comentario = await prisma.comentario.findUnique({
    where: {
      id: comentarioId,
    },
    include: {
      pontoTuristico: {
        select: {
          categoria: true,
        },
      },
    },
  });

  if (!comentario) {
    return {
      error: "Comentário não encontrado.",
    };
  }

  await prisma.comentario.delete({
    where: {
      id: comentarioId,
    },
  });

  revalidarComentario(
    comentario.pontoTuristicoId,
    comentario.pontoTuristico?.categoria
  );

  return {
    success: "Comentário excluído com sucesso.",
  };
}