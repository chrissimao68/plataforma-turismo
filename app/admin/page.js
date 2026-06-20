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
  Star,
  ArrowRight,
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
  const comentariosPendentes = comentarios.filter((item) => !item.aprovado).length;
  const adminsPendentes = administradores.filter((admin) => !admin.aprovado).length;

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              Dashboard Administrativo
            </h1>
            <p className="text-zinc-500">
              Visão geral do portal turístico de Lavras.
            </p>
          </div>

          <Link
            href="/admin/novo"
            className="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            <Plus size={18} />
            Novo ponto
          </Link>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
            <MapPin className="mb-3 text-green-600" />
            <p className="text-sm font-medium text-zinc-500">Pontos</p>
            <h2 className="mt-1 text-3xl font-bold">{pontos.length}</h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
            <CheckCircle className="mb-3 text-green-600" />
            <p className="text-sm font-medium text-zinc-500">Publicados</p>
            <h2 className="mt-1 text-3xl font-bold">{publicados}</h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
            <Image className="mb-3 text-blue-600" />
            <p className="text-sm font-medium text-zinc-500">Com galeria</p>
            <h2 className="mt-1 text-3xl font-bold">{comGaleria}</h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
            <MessageCircle className="mb-3 text-yellow-600" />
            <p className="text-sm font-medium text-zinc-500">Comentários</p>
            <h2 className="mt-1 text-3xl font-bold">{comentarios.length}</h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
            <Clock className="mb-3 text-orange-600" />
            <p className="text-sm font-medium text-zinc-500">Pendentes</p>
            <h2 className="mt-1 text-3xl font-bold">{comentariosPendentes}</h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
            <Users className="mb-3 text-purple-600" />
            <p className="text-sm font-medium text-zinc-500">Admins pendentes</p>
            <h2 className="mt-1 text-3xl font-bold">{adminsPendentes}</h2>
          </div>
        </div>

        

          
        
      </div>
    </main>
  );
}