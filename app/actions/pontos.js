"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

async function uploadImagem(file, pasta = "pontos") {
  if (!file || file.size === 0) {
    return null;
  }

  const nomeSeguro = file.name
    .replaceAll(" ", "-")
    .toLowerCase();

  const blob = await put(
    `${pasta}/${Date.now()}-${nomeSeguro}`,
    file,
    {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }
  );

  return blob.url;
}

function revalidarCategoria(categoria) {
  if (!categoria) return;

  const slug = String(categoria).toLowerCase();

  revalidatePath(`/${slug}`);
}

function revalidarPonto(id, categoria) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/pontos");

  if (id) {
    revalidatePath(`/pontos/${id}`);
  }

  if (categoria) {
    revalidarCategoria(categoria);
  }
}

export async function criarPontoTuristico(formData) {
  const titulo = String(formData.get("titulo") || "").trim();
  const descricao = String(formData.get("descricao") || "").trim();
  const conteudo = String(formData.get("conteudo") || "").trim();
  const endereco = String(formData.get("endereco") || "").trim();
  const categoria = String(formData.get("categoria") || "").trim();

  const imagemFile = formData.get("imagem");

  if (!titulo || !descricao || !conteudo || !categoria) {
    throw new Error("Preencha os campos obrigatórios.");
  }

  const imagem = await uploadImagem(
    imagemFile,
    "pontos/principal"
  );

  const fotosFiles = formData
    .getAll("fotos")
    .filter((file) => file && file.size > 0);

  const fotosUrls = [];

  for (const foto of fotosFiles) {
    const url = await uploadImagem(
      foto,
      "pontos/galeria"
    );

    if (url) {
      fotosUrls.push(url);
    }
  }

  const ponto = await prisma.pontoTuristico.create({
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

  revalidarPonto(ponto.id, ponto.categoria);

  redirect("/admin/pontos");
}

export async function excluirPonto(id) {
  const pontoId = Number(id);

  if (Number.isNaN(pontoId)) {
    return {
      error: "Ponto turístico inválido.",
    };
  }

  const ponto = await prisma.pontoTuristico.findUnique({
    where: {
      id: pontoId,
    },
    include: {
      fotos: true,
    },
  });

  if (!ponto) {
    return {
      error: "Ponto turístico não encontrado.",
    };
  }

  await prisma.pontoTuristico.delete({
    where: {
      id: pontoId,
    },
  });

  revalidarPonto(pontoId, ponto.categoria);

  return {
    success: "Ponto turístico excluído com sucesso.",
  };
}

export async function editarPonto(id, formData) {
  const pontoId = Number(id);

  if (Number.isNaN(pontoId)) {
    throw new Error("Ponto turístico inválido.");
  }

  const titulo = String(formData.get("titulo") || "").trim();
  const descricao = String(formData.get("descricao") || "").trim();
  const conteudo = String(formData.get("conteudo") || "").trim();
  const endereco = String(formData.get("endereco") || "").trim();
  const categoria = String(formData.get("categoria") || "").trim();
  const publicado = formData.get("publicado") === "on";

  const imagemFile = formData.get("imagem");

  if (!titulo || !descricao || !conteudo || !categoria) {
    throw new Error("Preencha os campos obrigatórios.");
  }

  const data = {
    titulo,
    descricao,
    conteudo,
    endereco,
    categoria,
    publicado,
  };

  if (imagemFile && imagemFile.size > 0) {
    data.imagem = await uploadImagem(
      imagemFile,
      "pontos/principal"
    );
  }

  const ponto = await prisma.pontoTuristico.update({
    where: {
      id: pontoId,
    },
    data,
  });

  revalidarPonto(ponto.id, ponto.categoria);

  redirect("/admin/pontos");
}