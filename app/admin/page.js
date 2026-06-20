import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {  Plus } from "lucide-react";



export default async function AdminPage() {

  const pontos = await prisma.pontoTuristico.findMany({
    orderBy: {
      criadoEm: "desc",
    },
    include: {
      fotos: true,
    },
  });

  

  


  return (
    <main className="p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800">
              Dashboard Administrativo
            </h1>
            <p className="text-gray-600">
              Gerencie os pontos turísticos cadastrados.
            </p>
          </div>
          

          <Link
            href="/admin/novo"
            className="flex items-center gap-2 rounded bg-green-700 px-4 py-3 font-semibold text-white hover:bg-green-800"
          >
            <Plus size={18} />
            Novo ponto
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Total de páginas</p>
            <h2 className="text-3xl font-bold text-green-700">
              {pontos.length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Publicadas</p>
            <h2 className="text-3xl font-bold text-green-700">
              {pontos.filter((p) => p.publicado).length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Com galeria</p>
            <h2 className="text-3xl font-bold text-green-700">
              {pontos.filter((p) => p.fotos.length > 0).length}
            </h2>
          </div>
        </div>

        

         
      
        
      </div>
      
    </main>
  );
}