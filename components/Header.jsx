import Link from "next/link";
import {
  Trees,
  Landmark,
  Utensils,
  CalendarDays,
  Hotel,
  ShieldUser,
} from "lucide-react";

export default function Header() {
  return (
    <header className=" border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          
 <img
          src="/logotransparentefundo.png"
          alt="Logo"
          width={64}
          height={64}
          className="object-contain"
        />
          <div>
            <h1 className="text-xl font-bold text-green-800">
               Encantos de Lavras 
            </h1>
            <p className="text-xs text-gray-500">Plataforma de Turismo</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link href="/natureza" className="flex items-center gap-2 text-gray-700 hover:text-green-700">
            <Trees size={18} />
            Natureza
          </Link>

          <Link href="/cultura" className="flex items-center gap-2 text-gray-700 hover:text-green-700">
            <Landmark size={18} />
            Cultura
          </Link>

          <Link href="/gastronomia" className="flex items-center gap-2 text-gray-700 hover:text-green-700">
            <Utensils size={18} />
            Gastronomia
          </Link>

          <Link href="/eventos" className="flex items-center gap-2 text-gray-700 hover:text-green-700">
            <CalendarDays size={18} />
            Eventos
          </Link>

          <Link href="/hospedagem" className="flex items-center gap-2 text-gray-700 hover:text-green-700">
            <Hotel size={18} />
            Hospedagem
          </Link>
        </nav>

        <Link
          href="/login"
          className="flex items-center gap-2 rounded-lg border border-green-700 px-8 py-2 font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
        >
          <ShieldUser size={18} />
          Login ADM
        </Link>
      </div>
    </header>
  );
}