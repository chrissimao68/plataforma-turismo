"use client";

import { Info } from "lucide-react";
import { useState } from "react";

export default function ModeloModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BOTÃO */}
      <button
        onClick={() => setOpen(true)}
        className="
          flex items-center gap-2
          rounded-lg
          bg-green-800
          px-4 py-2
          text-sm font-semibold
          text-white
          transition
          hover:bg-green-900
          dark:bg-emerald-600
          dark:hover:bg-emerald-500
        "
      >
        <Info className="h-4 w-4" />
        Conheça Lavras
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div
            className="
              w-full max-w-2xl
              overflow-hidden
              rounded-2xl
              border border-zinc-200
              bg-white
              shadow-2xl

              dark:border-zinc-700
              dark:bg-zinc-900
            "
          >
            {/* CABEÇALHO */}
            <div
              className="
                flex items-center justify-between
                border-b border-zinc-200
                px-6 py-4

                dark:border-zinc-700
                dark:bg-zinc-950
              "
            >
              <div>
                <h2 className="text-4xl font-bold text-green-800 dark:text-emerald-400">
                  A História de Lavras
                </h2>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="
                  text-xl leading-none
                  text-zinc-500
                  transition
                  hover:text-green-700

                  dark:text-zinc-400
                  dark:hover:text-emerald-400
                "
              >
                ×
              </button>
            </div>

            {/* CONTEÚDO */}
            <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">
              <p className="text-justify text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Fundada a partir do antigo arraial de Sant'Ana das Lavras do
                Funil, no século XVIII, a cidade de <strong>Lavras</strong>{" "}
                carrega uma história intimamente ligada ao Ciclo do Ouro e à
                expansão das rotas comerciais em Minas Gerais. Com o passar das
                décadas, o município deixou para trás a exploração mineral para
                se consolidar como um polo regional de desenvolvimento. O
                cenário urbano atual preserva casarões e igrejas históricas que
                contrastam harmoniosamente com a modernidade trazida pela forte
                expansão acadêmica e industrial, tornando a cidade um ponto de
                encontro vibrante entre o passado colonial e o futuro.
              </p>

              <p className="text-justify text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                A natureza exuberante é um dos maiores patrimônios da região,
                destacando-se como um refúgio para o ecoturismo e o lazer. O
                município é cercado por paisagens ricas em biodiversidade, com
                destaque para as imediações da represa do Funil e complexos de
                cachoeiras nos arredores, que atraem moradores e visitantes em
                busca de trilhas, esportes náuticos e conexão com o meio
                ambiente. Essa vocação natural estende-se à culinária local: a{" "}
                <strong>gastronomia</strong> lavrense equilibra com perfeição a
                robusta tradição da cozinha mineira, com seus queijos, doces
                artesanais e o clássico pão de queijo, com uma cena
                gastronômica contemporânea impulsionada por bares, restaurantes
                e cafés modernos que atendem a um público diversificado.
              </p>

              <p className="text-justify text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Nos tempos atuais, o grande motor de Lavras é a sua consolidação
                como uma verdadeira "Cidade dos Estudantes". O município abriga
                algumas das <strong>escolas</strong> e instituições de ensino
                mais prestigiadas do estado, com destaque para a Universidade
                Federal de Lavras (UFLA), referência internacional em ciências
                agrárias e tecnologia. A forte presença de colégios técnicos, de
                ensino básico de excelência e campus universitários atrai jovens
                de todo o país, injetando uma energia cultural dinâmica,
                inovadora e cosmopolita que dita o ritmo da economia e do
                cotidiano da cidade.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}