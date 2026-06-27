import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Plus,
  MapPin,
  CheckCircle,
  Image,
  MessageCircle,
  Clock,
  Users,
} from "lucide-react";

export default async function AdminPage() {
  const [pontos, comentarios, administradores] = await Promise.all([
    prisma.pontoTuristico.findMany({
      orderBy: {
        criadoEm: "desc",
      },
      include: {
        fotos: true,
        comentarios: true,
      },
    }),

    prisma.comentario.findMany({
      orderBy: {
        criadoEm: "desc",
      },
      include: {
        pontoTuristico: {
          select: {
            titulo: true,
          },
        },
      },
      take: 5,
    }),

    prisma.administrador.findMany({
      orderBy: {
        id: "desc",
      },
    }),
  ]);

  const publicados = pontos.filter((ponto) => ponto.publicado).length;
  const comGaleria = pontos.filter((ponto) => ponto.fotos.length > 0).length;

  const comentariosPendentes = comentarios.filter(
    (item) => !item.aprovado
  ).length;

  const adminsPendentes = administradores.filter(
    (admin) => !admin.aprovado
  ).length;

  return (
    <main className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl lg:text-4xl">
              Dashboard Administrativo
            </h1>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
              Visão geral do portal turístico de Lavras.
            </p>
          </div>

          <Link
            href="/admin/novo"
            className="
              inline-flex w-full items-center justify-center gap-2
              rounded-xl bg-green-700 px-5 py-3
              font-semibold text-white transition-all
              hover:bg-green-800 hover:shadow-lg
              dark:bg-green-600 dark:hover:bg-green-500
              sm:w-auto
            "
          >
            <Plus size={18} />
            Novo ponto
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <MetricCard
            icon={<MapPin />}
            label="Pontos"
            value={pontos.length}
            color="green"
          />

          <MetricCard
            icon={<CheckCircle />}
            label="Publicados"
            value={publicados}
            color="green"
          />

          <MetricCard
            icon={<Image />}
            label="Com galeria"
            value={comGaleria}
            color="blue"
          />

          <MetricCard
            icon={<MessageCircle />}
            label="Comentários"
            value={comentarios.length}
            color="yellow"
          />

          <MetricCard
            icon={<Clock />}
            label="Pendentes"
            value={comentariosPendentes}
            color="orange"
          />

          <MetricCard
            icon={<Users />}
            label="Admins pendentes"
            value={adminsPendentes}
            color="purple"
          />
        </div>
      </div>
    </main>
  );
}

function MetricCard({ icon, label, value, color }) {
  const colors = {
    green: "text-green-600 dark:text-green-400",
    blue: "text-blue-600 dark:text-blue-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    orange: "text-orange-600 dark:text-orange-400",
    purple: "text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {label}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-950 ${colors[color]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}