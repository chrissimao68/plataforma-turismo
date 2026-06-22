"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

async function uploadImagem(file, pasta = "pontos") {
  if (!file || file.size === 0) {
    return null;
  }

  const nomeSeguro = file.name.replaceAll(" ", "-").toLowerCase();

  const blob = await put(`${pasta}/${Date.now()}-${nomeSeguro}`, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return blob.url;
}

export async function criarPontoTuristico(formData) {
  const titulo = formData.get("titulo");
  const descricao = formData.get("descricao");
  const conteudo = formData.get("conteudo");
  const endereco = formData.get("endereco");
  const categoria = formData.get("categoria");

  const imagemFile = formData.get("imagem");
  const imagem = await uploadImagem(imagemFile, "pontos/principal");

  const fotosFiles = formData
    .getAll("fotos")
    .filter((file) => file && file.size > 0);

  const fotosUrls = [];

  for (const foto of fotosFiles) {
    const url = await uploadImagem(foto, "pontos/galeria");

    if (url) {
      fotosUrls.push(url);
    }
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
      fotos: {
        create: fotosUrls.map((url) => ({
          url,
        })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/pontos");

  redirect("/admin/pontos");
}

export async function excluirPonto(id) {
  await prisma.pontoTuristico.delete({
    where: {
      id: Number(id),
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/pontos");
}

export async function editarPonto(id, formData) {
  const titulo = formData.get("titulo");
  const descricao = formData.get("descricao");
  const conteudo = formData.get("conteudo");
  const endereco = formData.get("endereco");
  const categoria = formData.get("categoria");
  const publicado = formData.get("publicado") === "on";

  const imagemFile = formData.get("imagem");

  const data = {
    titulo,
    descricao,
    conteudo,
    endereco,
    categoria,
    publicado,
  };

  if (imagemFile && imagemFile.size > 0) {
    data.imagem = await uploadImagem(imagemFile, "pontos/principal");
  }

  await prisma.pontoTuristico.update({
    where: {
      id: Number(id),
    },
    data,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/pontos");
  revalidatePath(`/pontos/${id}`);

  redirect("/admin/pontos");
}
