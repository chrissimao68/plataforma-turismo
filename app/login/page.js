"use client";

import { useState } from "react";
import { loginAdmin } from "@/app/actions/auth";
import { Lock, User } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData) {
    setLoading(true);

    const result = await loginAdmin(formData);

    if (result?.error) {
      toast.error(result.error, {
        description: "Verifique suas credenciais.",
      });
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-50 to-green-100 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800">
            Painel Administrativo
          </h1>

          <p className="mt-2 text-gray-500">
            Entre para gerenciar o portal turístico.
          </p>
        </div>

        <form action={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Usuário
            </label>

            <div className="flex items-center rounded-xl border px-3">
              <User size={18} className="text-gray-400" />

              <input
                type="text"
                name="usuario"
                required
                className="w-full p-3 outline-none"
                placeholder="Digite seu usuário"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Senha
            </label>

            <div className="flex items-center rounded-xl border px-3">
              <Lock size={18} className="text-gray-400" />

              <input
                type="password"
                name="senha"
                required
                className="w-full p-3 outline-none"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}