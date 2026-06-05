"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function gerarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function criarPontoTuristico(formData) {
  const titulo = formData.get("titulo");
  const descricao = formData.get("descricao");
  const conteudo = formData.get("conteudo");
  const imagem = formData.get("imagem");
  const endereco = formData.get("endereco");
  const categoria = formData.get("categoria");

  const fotos = formData.getAll("fotos").filter(Boolean);

  await prisma.pontoTuristico.create({
    data: {
      titulo,
      slug: gerarSlug(titulo),
      descricao,
      conteudo,
      imagem,
      endereco,
      categoria,
      publicado: true,
      fotos: {
        create: fotos.map((url) => ({
          url,
        })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/adm");

  return { sucesso: true };
}