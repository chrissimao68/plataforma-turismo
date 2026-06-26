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
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Dashboard Administrativo
            </h1>

            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Visão geral do portal turístico de Lavras.
            </p>
          </div>

          <Link
            href="/admin/novo"
            className="
              inline-flex items-center gap-2
              rounded-xl
              bg-green-700
              px-5 py-3
              font-semibold
              text-white
              transition-all
              hover:bg-green-800
              hover:shadow-lg
              dark:bg-green-600
              dark:hover:bg-green-500
            "
          >
            <Plus size={18} />
            Novo ponto
          </Link>
        </div>

        {/* Métricas */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <MapPin className="mb-3 text-green-600 dark:text-green-400" />

            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Pontos
            </p>

            <h2 className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {pontos.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <CheckCircle className="mb-3 text-green-600 dark:text-green-400" />

            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Publicados
            </p>

            <h2 className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {publicados}
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <Image className="mb-3 text-blue-600 dark:text-blue-400" />

            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Com galeria
            </p>

            <h2 className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {comGaleria}
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <MessageCircle className="mb-3 text-yellow-600 dark:text-yellow-400" />

            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Comentários
            </p>

            <h2 className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {comentarios.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <Clock className="mb-3 text-orange-600 dark:text-orange-400" />

            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Pendentes
            </p>

            <h2 className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {comentariosPendentes}
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <Users className="mb-3 text-purple-600 dark:text-purple-400" />

            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Admins pendentes
            </p>

            <h2 className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {adminsPendentes}
            </h2>
          </div>
        </div>

        
          
            
          
        
      </div>
    </main>
  );
}