"use client"

import { useState } from "react"
import { loginAdmin, cadastrarAdmin } from "@/app/actions/auth"
import {
  Lock,
  User,
  UserPlus,
  MapPin,
  CalendarDays,
  Star,
  LogIn,
  ShieldCheck,
} from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [modo, setModo] = useState("login")

  async function handleSubmit(formData) {
    setLoading(true)

    try {
      const result = await loginAdmin(formData)

      if (result?.error) {
        toast.error(result.error)
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleCadastro(formData) {
    setLoading(true)

    try {
      const result = await cadastrarAdmin(formData)

      if (result?.error) {
        toast.error(result.error)
      }

      if (result?.success) {
        toast.success(result.success)
        setModo("login")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <img
        src="/logincapa.jpg"
        alt="Turismo Lavras"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 md:px-8">
        <div className="relative z-10 grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12 lg:px-16">
          <div className="hidden text-white lg:flex lg:flex-col lg:justify-center">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600/90 shadow-lg">
                <MapPin size={30} />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
                  Turismo
                </p>

                <h1 className="text-3xl font-black text-emerald-400">
                  Lavras
                </h1>
              </div>
            </div>

            <h2 className="max-w-xl text-5xl font-black leading-tight md:text-7xl">
              Encantos de
              <span className="block bg-gradient-to-r from-emerald-300 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                Lavras
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-white/90">
              Gerencie pontos turísticos, eventos, hospedagens, gastronomia e
              avaliações do portal.
            </p>

            <div className="mt-12 space-y-6">
              <InfoItem
                icon={<MapPin size={26} />}
                title="Pontos turísticos"
                text="Cadastre e atualize locais"
              />

              <InfoItem
                icon={<CalendarDays size={26} />}
                title="Eventos"
                text="Divulgue e gerencie"
              />

              <InfoItem
                icon={<Star size={26} />}
                title="Avaliações"
                text="Acompanhe e aprove comentários"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-white/30 bg-white/80 p-5 shadow-2xl backdrop-blur-xl dark:border-zinc-700/60 dark:bg-zinc-950/80 sm:p-8 md:max-w-lg lg:max-w-xl">
              <div className="mb-6 text-center sm:mb-8">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-emerald-700 shadow-lg dark:bg-zinc-900 dark:text-emerald-400 sm:mb-6 sm:h-20 sm:w-20">
                  <Lock className="h-8 w-8 sm:h-9 sm:w-9" />
                </div>

                <h1 className="text-2xl font-black text-emerald-950 dark:text-zinc-100 sm:text-3xl">
                  Painel Administrativo
                </h1>

                <p className="mt-3 text-sm text-emerald-950/70 dark:text-zinc-400 sm:text-base">
                  Entre para gerenciar o portal turístico.
                </p>
              </div>

              <div className="mb-6 grid grid-cols-2 rounded-2xl bg-white/80 p-1 shadow-inner dark:bg-zinc-900/90 sm:mb-8">
                <button
                  type="button"
                  onClick={() => setModo("login")}
                  className={`rounded-xl py-3 font-bold transition sm:py-4 ${
                    modo === "login"
                      ? "bg-emerald-700 text-white shadow-lg dark:bg-emerald-600"
                      : "text-emerald-950 hover:bg-emerald-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  Entrar
                </button>

                <button
                  type="button"
                  onClick={() => setModo("cadastro")}
                  className={`rounded-xl py-3 font-bold transition sm:py-4 ${
                    modo === "cadastro"
                      ? "bg-emerald-700 text-white shadow-lg dark:bg-emerald-600"
                      : "text-emerald-950 hover:bg-emerald-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  Cadastrar
                </button>
              </div>

              {modo === "login" ? (
                <form action={handleSubmit} className="space-y-5 sm:space-y-6">
                  <InputField
                    label="Usuário"
                    icon={<User size={22} />}
                    type="text"
                    name="usuario"
                    placeholder="Digite seu usuário"
                  />

                  <InputField
                    label="Senha"
                    icon={<Lock size={22} />}
                    type="password"
                    name="senha"
                    placeholder="Digite sua senha"
                  />

                  <button
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-700 py-3.5 font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:scale-[1.01] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 dark:from-emerald-600 dark:via-emerald-500 dark:to-green-600 sm:py-4"
                  >
                    <LogIn size={22} />
                    {loading ? "Entrando..." : "Entrar"}
                  </button>

                  <div className="hidden items-center justify-center gap-2 pt-2 text-sm font-medium text-emerald-950/70 dark:text-zinc-400 sm:flex">
                    <ShieldCheck size={18} />
                    Acesso restrito e seguro
                  </div>
                </form>
              ) : (
                <form
                  action={handleCadastro}
                  className="space-y-5 sm:space-y-6"
                >
                  <InputField
                    label="Novo usuário"
                    icon={<UserPlus size={22} />}
                    type="text"
                    name="usuario"
                    minLength={5}
                    placeholder="Mínimo 5 caracteres"
                  />

                  <InputField
                    label="Nova senha"
                    icon={<Lock size={22} />}
                    type="password"
                    name="senha"
                    minLength={5}
                    placeholder="Mínimo 5 caracteres"
                  />

                  <button
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-sky-700 via-sky-600 to-blue-700 py-3.5 font-bold text-white shadow-lg shadow-sky-900/20 transition hover:scale-[1.01] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 dark:from-sky-600 dark:via-sky-500 dark:to-blue-600 sm:py-4"
                  >
                    <UserPlus size={22} />
                    {loading ? "Enviando..." : "Solicitar acesso"}
                  </button>

                  <p className="text-center text-sm font-medium leading-6 text-emerald-950/70 dark:text-zinc-400">
                    Seu cadastro ficará pendente até aprovação do administrador.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoItem({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
        {icon}
      </div>

      <div>
        <strong className="text-lg">{title}</strong>
        <p className="text-white/75">{text}</p>
      </div>
    </div>
  )
}

function InputField({ label, icon, type, name, placeholder, minLength }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-emerald-950 dark:text-zinc-200">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl bg-white/90 px-4 py-3.5 shadow-sm ring-1 ring-black/5 transition focus-within:ring-2 focus-within:ring-emerald-600 dark:bg-zinc-900 dark:ring-white/10 dark:focus-within:ring-emerald-500 sm:py-4">
        <div className="text-zinc-500 dark:text-zinc-400">{icon}</div>

        <input
          type={type}
          name={name}
          minLength={minLength}
          required
          className="w-full bg-transparent text-emerald-950 outline-none placeholder:text-zinc-500 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}