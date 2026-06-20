'use client';

import { Info } from "lucide-react";
import { useState } from 'react';

export default function ModeloModal() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BOTÃO */}
      <button
        onClick={() => setOpen(true)}
        className="bg-green-800 hover:bg-green-900 text-white p-2 rounded-lg text-sm font-semibold transition flex items-center gap-2"
      >
        <Info className="w- h-4 " />
        Conheça Lavras
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-green-950 border border-green-950 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            {/* CABEÇALHO */}
            <div className="bg-white border-b border-green-950 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className=" text-4xl font-bold text-green-950">
                  A História de Lavras
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-green-950 text-xl leading-none transition"
              >
                ×
              </button>
            </div>

            {/* CONTEÚDO */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <p className="text-gray-300 text-sm leading-relaxed text-justify">
                Fundada a partir do antigo arraial de Sant'Ana das Lavras do Funil, no século XVIII, a cidade de <strong>Lavras</strong> carrega uma história intimamente ligada ao Ciclo do Ouro e à expansão das rotas comerciais em Minas Gerais. Com o passar das décadas, o município deixou para trás a exploração mineral para se consolidar como um polo regional de desenvolvimento. O cenário urbano atual preserva casarões e igrejas históricas que contrastam harmoniosamente com a modernidade trazida pela forte expansão acadêmica e industrial, tornando a cidade um ponto de encontro vibrante entre o passado colonial e o futuro.
              </p>
              
              <p className="text-gray-300 text-sm leading-relaxed text-justify">
                A natureza exuberante é um dos maiores patrimônios da região, destacando-se como um refúgio para o ecoturismo e o lazer. O município é cercado por paisagens ricas em biodiversidade, com destaque para as imediações da represa do Funil e complexos de cachoeiras nos arredores, que atraem moradores e visitantes em busca de trilhas, esportes náuticos e conexão com o meio ambiente. Essa vocação natural estende-se à culinária local: a <strong>gastronomia</strong> lavrense equilibra com perfeição a robusta tradição da cozinha mineira — com seus queijos, doces artesanais e o clássico pão de queijo — com uma cena gastronômica contemporânea, impulsionada por bares, restaurantes e cafés modernos que atendem a um público diversificado.
              </p>
              
              <p className="text-gray-300 text-sm leading-relaxed text-justify">
                Nos tempos atuais, o grande motor de Lavras é a sua consolidação como uma verdadeira "Cidade dos Estudantes". O município abriga algumas das <strong>escolas</strong> e instituições de ensino mais prestigiadas do estado, com destaque para a Universidade Federal de Lavras (UFLA), referência internacional em ciências agrárias e tecnologia. A forte presença de colégios técnicos, de ensino básico de excelência e campus universitários atrai jovens de todo o país, injetando uma energia cultural dinâmica, inovadora e cosmopolita que dita o ritmo da economia e do cotidiano da cidade.
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}