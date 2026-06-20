import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white  w-full ">
      <div className=" flex flex-col px-20 py-16">
        <div className="grid gap-20 md:grid-cols-4">
          
          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold">
              Encantos de Lavras
            </h2>

            <p className="mt-4 text-sm leading-7 text-green-100">
              Descubra os melhores atrativos turísticos,
              experiências gastronômicas, hospedagens,
              eventos e paisagens naturais de Lavras.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Explorar
            </h3>

            <ul className="space-y-3 text-green-100">
              <li>
                <Link href="/">Início</Link>
              </li>

              <li>
                <Link href="/">Sobre</Link>
              </li>

             

              <li>
                <Link href="/eventos">Eventos</Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Categorias
            </h3>

            <ul className="space-y-3 text-green-100">
              <li>
                <Link href="/gastronomia">
                  Gastronomia
                </Link>
              </li>

              <li>
                <Link href="/hospedagem">
                  Hospedagem
                </Link>
              </li>

             <li>
                <Link href="/cultura">Cultura</Link>
              </li>

             <li>
                <Link href="/eventos">Eventos</Link>
              </li>
              <li>
                <Link href="/natureza">Natureza</Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Contato
            </h3>

            <ul className="space-y-4 text-green-100">
              <li className="flex gap-3">
                <MapPin size={18} />
                Lavras - MG
              </li>

              <li className="flex gap-3">
                <Phone size={18} />
                (35) 99999-9999
              </li>

              <li className="flex gap-3">
                <Mail size={18} />
                contato@encantosdelavras.com.br
              </li>
            </ul>

           
          </div>
        </div>

        <div className="mt-12 border-t border-green-900 pt-6 text-center text-sm text-green-200">
          © {new Date().getFullYear()} Lavras Turismo.
          Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}