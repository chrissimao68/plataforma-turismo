"use client";

import { useState } from "react";
import { loginAdmin, cadastrarAdmin } from "@/app/actions/auth";
import { Lock, User, UserPlus } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [modo, setModo] = useState("login");

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

  async function handleCadastro(formData) {
    setLoading(true);

    const result = await cadastrarAdmin(formData);

    if (result?.error) {
      toast.error(result.error);
    }

    if (result?.success) {
      toast.success(result.success);
      setModo("login");
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

        <div className="mb-6 flex rounded-xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setModo("login")}
            className={`flex-1 rounded-lg py-2 font-semibold transition ${
              modo === "login"
                ? "bg-green-700 text-white"
                : "text-gray-600"
            }`}
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => setModo("cadastro")}
            className={`flex-1 rounded-lg py-2 font-semibold transition ${
              modo === "cadastro"
                ? "bg-green-700 text-white"
                : "text-gray-600"
            }`}
          >
            Cadastrar
          </button>
        </div>

        {modo === "login" ? (
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
        ) : (
          <form action={handleCadastro} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Novo usuário
              </label>

              <div className="flex items-center rounded-xl border px-3">
                <UserPlus size={18} className="text-gray-400" />

                <input
                  type="text"
                  name="usuario"
                  minLength={5}
                  required
                  className="w-full p-3 outline-none"
                  placeholder="Mínimo 5 caracteres"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Nova senha
              </label>

              <div className="flex items-center rounded-xl border px-3">
                <Lock size={18} className="text-gray-400" />

                <input
                  type="password"
                  name="senha"
                  minLength={5}
                  required
                  className="w-full p-3 outline-none"
                  placeholder="Mínimo 5 caracteres"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Solicitar acesso"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Seu cadastro ficará pendente até aprovação do administrador.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}

