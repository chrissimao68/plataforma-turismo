"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginAdmin(formData) {
  const usuario = String(formData.get("usuario") || "").trim();
  const senha = String(formData.get("senha") || "").trim();

  if (!usuario || !senha) {
    return {
      error: "Preencha usuário e senha.",
    };
  }

  if (
    usuario === process.env.ADMIN_USER &&
    senha === process.env.ADMIN_PASSWORD
  ) {
    redirect("/admin");
  }

  const admin = await prisma.administrador.findFirst({
    where: {
      usuario,
      senha,
      aprovado: true,
    },
  });

  if (admin) {
    redirect("/admin");
  }

  return {
    error: "Usuário inválido ou aguardando aprovação.",
  };
}

export async function cadastrarAdmin(formData) {
  const usuario = String(formData.get("usuario") || "").trim();
  const senha = String(formData.get("senha") || "").trim();

  if (!usuario || !senha) {
    return {
      error: "Preencha usuário e senha.",
    };
  }

  if (usuario.length < 5 || senha.length < 5) {
    return {
      error: "Usuário e senha precisam ter no mínimo 5 caracteres.",
    };
  }

  const existe = await prisma.administrador.findUnique({
    where: {
      usuario,
    },
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
  revalidatePath("/admin/administradores");
  revalidatePath("/login");

  return {
    success: "Cadastro enviado. Aguarde aprovação do administrador.",
  };
}

export async function aprovarAdmin(id) {
  const adminId = Number(id);

  if (Number.isNaN(adminId)) {
    return {
      error: "Administrador inválido.",
    };
  }

  await prisma.administrador.update({
    where: {
      id: adminId,
    },
    data: {
      aprovado: true,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/administradores");

  return {
    success: "Administrador aprovado com sucesso.",
  };
}

export async function excluirAdmin(id) {
  const adminId = Number(id);

  if (Number.isNaN(adminId)) {
    return {
      error: "Administrador inválido.",
    };
  }

  await prisma.administrador.delete({
    where: {
      id: adminId,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/administradores");

  return {
    success: "Administrador excluído com sucesso.",
  };
}