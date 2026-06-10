"use server";

import { redirect } from "next/navigation";

export async function loginAdmin(formData) {
  const usuario = formData.get("usuario");
  const senha = formData.get("senha");

  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (
    usuario === adminUser &&
    senha === adminPassword
  ) {
    redirect("/admin");
  }

  return {
    error: "Usuário ou senha inválidos",
  };
}