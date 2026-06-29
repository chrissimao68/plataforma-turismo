"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

async function uploadImagem(file, pasta = "pontos") {
  if (!file || file.size === 0) {
    return null;
  }

  if (!(file instanceof File)) {
    return null;
  }

  if (!file.type?.startsWith("image/")) {
    throw new Error("O arquivo enviado precisa ser uma imagem.");
  }

  if (file.size > 20 * 1024 * 1024) {
    throw new Error("A imagem deve ter no máximo 20 MB.");
  }

  const nomeOriginal = file.name
    .replace(/\.[^/.]+$/, "")
    .replaceAll(" ", "-")
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "");

  const extensao = file.name.split(".").pop()?.toLowerCase() || "jpg";

  const nomeArquivo = `${pasta}/${Date.now()}-${crypto.randomUUID()}-${
    nomeOriginal || "imagem"
  }.${extensao}`;

  const blob = await put(nomeArquivo, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

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
  let pontoCriado = null;

  try {
    const titulo = String(formData.get("titulo") || "").trim();
    const descricao = String(formData.get("descricao") || "").trim();
    const conteudo = String(formData.get("conteudo") || "").trim();
    const endereco = String(formData.get("endereco") || "").trim();
    const categoria = String(formData.get("categoria") || "").trim();

    const imagemFile = formData.get("imagem");

    if (!titulo || !descricao || !conteudo || !categoria) {
      throw new Error("Preencha os campos obrigatórios.");
    }

    const imagem = await uploadImagem(imagemFile, "pontos/principal");

    const fotosFiles = formData
      .getAll("fotos")
      .filter((file) => file instanceof File && file.size > 0);

    const fotosUrls = [];

    for (const foto of fotosFiles) {
      const url = await uploadImagem(foto, "pontos/galeria");

      if (url) {
        fotosUrls.push(url);
      }
    }

    pontoCriado = await prisma.pontoTuristico.create({
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

    revalidarPonto(pontoCriado.id, pontoCriado.categoria);
  } catch (error) {
    console.error("Erro ao criar ponto turístico:", error);
    throw new Error(error.message || "Não foi possível criar o ponto turístico.");
  }

  redirect("/admin/pontos");
}

export async function excluirPonto(id) {
  try {
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
  } catch (error) {
    console.error("Erro ao excluir ponto turístico:", error);

    return {
      error: "Não foi possível excluir o ponto turístico.",
    };
  }
}

export async function editarPonto(id, formData) {
  try {
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

    if (imagemFile instanceof File && imagemFile.size > 0) {
      data.imagem = await uploadImagem(imagemFile, "pontos/principal");
    }

    const ponto = await prisma.pontoTuristico.update({
      where: {
        id: pontoId,
      },
      data,
    });

    revalidarPonto(ponto.id, ponto.categoria);
  } catch (error) {
    console.error("Erro ao editar ponto turístico:", error);
    throw new Error(error.message || "Não foi possível editar o ponto turístico.");
  }

  redirect("/admin/pontos");
}