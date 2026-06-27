import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer
      id="contato"
      className="w-full border-t border-green-900 bg-green-950 text-white"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Encantos de Lavras
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-green-100">
              Descubra os melhores atrativos turísticos, experiências
              gastronômicas, hospedagens, eventos e paisagens naturais de
              Lavras.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold sm:text-lg">
              Explorar
            </h3>

            <ul className="space-y-3 text-sm text-green-100 sm:text-base">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Início
                </Link>
              </li>

              <li>
                <Link href="/sobre" className="transition hover:text-white">
                  Sobre
                </Link>
              </li>

              <li>
                <Link href="/eventos" className="transition hover:text-white">
                  Eventos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold sm:text-lg">
              Categorias
            </h3>

            <ul className="space-y-3 text-sm text-green-100 sm:text-base">
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
                <Link href="/cultura" className="transition hover:text-white">
                  Cultura
                </Link>
              </li>

              <li>
                <Link href="/eventos" className="transition hover:text-white">
                  Eventos
                </Link>
              </li>

              <li>
                <Link href="/natureza" className="transition hover:text-white">
                  Natureza
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold sm:text-lg">
              Contato
            </h3>

            <ul className="space-y-4 text-sm text-green-100 sm:text-base">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>Lavras - MG</span>
              </li>

              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0" />
                <span>(35) 99999-9999</span>
              </li>

              <li className="flex items-start gap-3 break-words">
                <Mail size={18} className="mt-0.5 shrink-0" />
                <span className="min-w-0 break-all">
                  contato@encantosdelavras.com.br
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-green-900/60 pt-6 text-center text-xs leading-6 text-green-300 sm:text-sm">
          © {new Date().getFullYear()} Encantos de Lavras. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  )
}