import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-green-900 bg-green-950 text-white flex flex-col justify-center items-center">
      <div className="px-8 py-8 md:px-20 flex flex-col justify-center items-center">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4  w-[66%]">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold">
              Encantos de Lavras
            </h2>

            <p className="mt-4 text-sm leading-7 text-justify text-green-100">
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
                <Link
                  href="/"
                  className="transition hover:text-white"
                >
                  Início
                </Link>
              </li>

              <li>
                <Link
                  href="/sobre"
                  className="transition hover:text-white"
                >
                  Sobre
                </Link>
              </li>

              <li>
                <Link
                  href="/eventos"
                  className="transition hover:text-white"
                >
                  Eventos
                </Link>
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
                <Link
                  href="/gastronomia"
                  className="transition hover:text-white"
                >
                  Gastronomia
                </Link>
              </li>

              <li>
                <Link
                  href="/hospedagem"
                  className="transition hover:text-white"
                >
                  Hospedagem
                </Link>
              </li>

              <li>
                <Link
                  href="/cultura"
                  className="transition hover:text-white"
                >
                  Cultura
                </Link>
              </li>

              <li>
                <Link
                  href="/eventos"
                  className="transition hover:text-white"
                >
                  Eventos
                </Link>
              </li>

              <li>
                <Link
                  href="/natureza"
                  className="transition hover:text-white"
                >
                  Natureza
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Contato
            </h3>

            <ul className="space-y-4 text-green-100">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0"
                />
                <span>Lavras - MG</span>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0"
                />
                <span>(35) 99999-9999</span>
              </li>

              <li className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0"
                />
                <span>
                  contato@encantosdelavras.com.br
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-green-900/50 pt-6 text-center text-sm text-green-300">
          © {new Date().getFullYear()} Encantos de Lavras.
          Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}