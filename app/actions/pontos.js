"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";


export async function criarPontoTuristico(formData) {
  const titulo = formData.get("titulo");
  const descricao = formData.get("descricao");
  const conteudo = formData.get("conteudo");
  const endereco = formData.get("endereco");
  const categoria = formData.get("categoria");

  const imagemFile = formData.get("imagem");

  let imagem = null;

  if (imagemFile && imagemFile.size > 0) {
    const blob = await put(imagemFile.name, imagemFile, {
      access: "public",
    });

    imagem = blob.url;
  }

  await prisma.pontoTuristico.create({
    data: {
      titulo,
      descricao,
      conteudo,
      imagem,
      endereco,
      categoria,
      publicado: true,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return { sucesso: true };
}


export async function excluirPonto(id) {
  await prisma.pontoTuristico.delete({
    where: {
      id: Number(id),
    },
  });

  revalidatePath("/admin");
}




export async function editarPonto(id, formData) {
  const titulo = formData.get("titulo");
  const descricao = formData.get("descricao");
  const conteudo = formData.get("conteudo");
  const imagem = formData.get("imagem");
  const endereco = formData.get("endereco");
  const categoria = formData.get("categoria");
  const publicado = formData.get("publicado") === "on";

  await prisma.pontoTuristico.update({
    where: {
      id: Number(id),
    },
    data: {
      titulo,
      descricao,
      conteudo,
      imagem,
      endereco,
      categoria,
      publicado,
    },
  });

  revalidatePath("/admin");
  revalidatePath(`/pontos/${id}`);

  redirect("/admin");
}