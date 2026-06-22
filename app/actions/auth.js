"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginAdmin(formData) {
  const usuario = formData.get("usuario");
  const senha = formData.get("senha");

  // SUPER ADMIN (.env)

  if (
    usuario === process.env.ADMIN_USER &&
    senha === process.env.ADMIN_PASSWORD
  ) {
    redirect("/admin");
  }

  // ADM CADASTRADO

  const admin = await prisma.administrador.findFirst({
    where: {
      usuario,
      senha,
      aprovado: true,
    },
  });

  revalidatePath("/admin/administradores");
  revalidatePath("/admin");

  return {
    error: "Usuário inválido ou aguardando aprovação.",
  };
}

export async function cadastrarAdmin(formData) {
  const usuario = formData.get("usuario");
  const senha = formData.get("senha");

  if (!usuario || !senha || usuario.length < 5 || senha.length < 5) {
    return {
      error: "Usuário e senha precisam ter no mínimo 5 caracteres.",
    };
  }

  const existe = await prisma.administrador.findUnique({
    where: { usuario },
  });

  if (existe) {
    return {
      error: "Esse usuário já existe.",
    };
  }

  await prisma.administrador.create({
    data: {
      usuario,
      senha,
      aprovado: false,
    },
  });

  revalidatePath("/admin");

  return {
    success: "Cadastro enviado. Aguarde aprovação do administrador.",
  };
}

export async function aprovarAdmin(id) {
  await prisma.administrador.update({
    where: { id },
    data: {
      aprovado: true,
    },
  });

  revalidatePath("/admin");
}

export async function excluirAdmin(id) {
  await prisma.administrador.delete({
    where: { id },
  });

  revalidatePath("/admin");
}
