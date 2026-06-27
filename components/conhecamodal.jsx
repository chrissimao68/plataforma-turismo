"use client"

import { Info, X } from "lucide-react"
import { useState } from "react"

export default function ModeloModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          inline-flex w-full items-center justify-center gap-2
          rounded-xl bg-green-800 px-5 py-3
          text-sm font-bold text-white shadow-lg
          transition hover:bg-green-900
          dark:bg-emerald-600 dark:hover:bg-emerald-500
          sm:w-auto sm:px-6
        "
      >
        <Info className="h-4 w-4" />
        Conheça Lavras
      </button>

      {open && (
        <div className="fixed inset-0 z-[999] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div
            className="
              max-h-[92vh] w-full overflow-hidden
              rounded-t-3xl border border-zinc-200
              bg-white shadow-2xl
              dark:border-zinc-800 dark:bg-zinc-900
              sm:max-w-2xl sm:rounded-3xl
            "
          >
            <div
              className="
                flex items-start justify-between gap-4
                border-b border-zinc-200 px-5 py-4
                dark:border-zinc-800 dark:bg-zinc-950
                sm:px-6
              "
            >
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-green-700 dark:text-emerald-400">
                  Conheça Lavras
                </p>

                <h2 className="text-2xl font-extrabold leading-tight text-green-800 dark:text-emerald-400 sm:text-4xl">
                  A História de Lavras
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-full border border-zinc-200
                  text-zinc-500 transition
                  hover:border-green-700 hover:text-green-700
                  dark:border-zinc-700 dark:text-zinc-400
                  dark:hover:border-emerald-400 dark:hover:text-emerald-400
                "
                aria-label="Fechar modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[72vh] space-y-5 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-base sm:leading-8">
                Fundada a partir do antigo arraial de Sant&apos;Ana das Lavras
                do Funil, no século XVIII, a cidade de <strong>Lavras</strong>{" "}
                carrega uma história ligada ao desenvolvimento do interior de
                Minas Gerais e às antigas rotas comerciais da região. Com o
                passar das décadas, o município se consolidou como um polo
                regional de educação, cultura, serviços e inovação.
              </p>

              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-base sm:leading-8">
                A cidade preserva traços de sua memória em praças, igrejas,
                casarões, eventos tradicionais e na relação próxima com a vida
                comunitária. Ao mesmo tempo, Lavras olha para o futuro com uma
                forte presença acadêmica, tecnológica e empreendedora, criando
                um encontro interessante entre tradição e modernidade.
              </p>

              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-base sm:leading-8">
                A natureza também faz parte da identidade lavrense. A região
                reúne paisagens verdes, serras, áreas rurais, cachoeiras nos
                arredores e espaços de lazer que atraem moradores e visitantes.
                Esse cenário favorece passeios, contemplação, turismo local e
                experiências ao ar livre.
              </p>

              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-base sm:leading-8">
                Conhecida por muitos como uma cidade estudantil, Lavras recebe
                pessoas de várias regiões por causa de suas instituições de
                ensino, cursos técnicos, universidades e oportunidades de
                formação. Essa energia jovem movimenta a cultura, a gastronomia,
                os eventos e o cotidiano da cidade.
              </p>

              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-base sm:leading-8">
                O <strong>Encantos de Lavras</strong> nasceu para reunir essa
                riqueza em um só lugar: pontos turísticos, gastronomia,
                hospedagem, cultura, eventos e natureza. É uma plataforma feita
                para valorizar a cidade, facilitar descobertas e aproximar
                visitantes, moradores e a comunidade local.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}