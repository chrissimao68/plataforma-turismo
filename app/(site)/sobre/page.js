import {
  MapPinned,
  Leaf,
  Landmark,
  Utensils,
  CalendarDays,
  Hotel,
  Star,
  Camera,
  School,
  Heart,
  Compass,
  Users,
  CheckCircle2,
  Mountain,
} from "lucide-react"

export default function SobrePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <section className="relative min-h-[420px] overflow-hidden border-b border-zinc-200 dark:border-zinc-800 sm:min-h-[480px] lg:min-h-[520px]">
        <img
          src="/sobrelavras.png"
          alt="Vista panorâmica de Lavras"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

        <div className="relative z-10 mx-auto flex min-h-[420px] w-full max-w-7xl items-center px-4 py-12 sm:min-h-[480px] sm:px-6 lg:min-h-[520px] lg:px-8">
          <div className="max-w-3xl text-center sm:text-left">
            <p className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold text-green-300 sm:justify-start">
              <MapPinned size={18} />
              Início / Sobre
            </p>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              Sobre o{" "}
              <span className="text-green-400">Encantos de Lavras</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-100 drop-shadow-md sm:mx-0 sm:text-lg sm:leading-8">
              Um guia digital criado para valorizar Lavras, reunir seus
              principais atrativos e aproximar moradores, visitantes e a
              comunidade local dos lugares que tornam a cidade especial.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-200 drop-shadow-md sm:mx-0 sm:text-base sm:leading-8">
              Aqui, turismo, cultura, natureza, gastronomia e história se
              encontram em uma plataforma moderna, pensada para divulgar os
              encantos de Lavras, Minas Gerais.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 sm:py-12 lg:space-y-10 lg:px-8 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-3xl sm:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400 sm:h-14 sm:w-14">
              <Compass size={26} />
            </div>

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Nossa missão
            </h2>

            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              O Encantos de Lavras nasceu com o objetivo de facilitar a
              descoberta dos melhores lugares da cidade. A plataforma reúne
              pontos turísticos, espaços culturais, opções gastronômicas,
              eventos, hospedagens e experiências que ajudam a contar a história
              viva de Lavras.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              Mais do que listar locais, o projeto busca incentivar o turismo
              local, fortalecer pequenos negócios, preservar memórias e
              apresentar a cidade de forma moderna, acessível e acolhedora.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-3xl">
            <img
              src="/sobrepraça.png"
              alt="Praça em Lavras"
              className="h-48 w-full object-cover sm:h-64"
            />

            <div className="p-5 sm:p-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Lavras, Minas Gerais
              </h2>

              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
                Localizada no Sul de Minas Gerais, Lavras é uma cidade conhecida
                por sua tradição educacional, sua vida cultural e suas paisagens
                naturais. É um lugar onde o movimento universitário se mistura
                ao ritmo acolhedor do interior mineiro.
              </p>

              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
                Suas praças, igrejas, comércios, eventos, áreas verdes e
                histórias formam um cenário cheio de identidade. Lavras carrega
                a força de uma cidade que preserva suas raízes, mas também olha
                para o futuro com criatividade, tecnologia e participação da
                comunidade.
              </p>
            </div>
          </div>
        </div>

        <section>
          <SectionTitle
            title="O que você encontra aqui"
            text="Um passeio organizado pelas principais experiências da cidade."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <InfoCard icon={<Leaf />} title="Natureza" text="Cachoeiras, trilhas, parques e paisagens para respirar Lavras com calma." className="text-green-600 dark:text-green-400" />
            <InfoCard icon={<Landmark />} title="Cultura" text="Igrejas, museus, história, patrimônio e espaços culturais da cidade." className="text-purple-600 dark:text-purple-400" />
            <InfoCard icon={<Utensils />} title="Gastronomia" text="Restaurantes, cafés, bares e sabores que fazem parte da rotina lavrense." className="text-orange-600 dark:text-orange-400" />
            <InfoCard icon={<CalendarDays />} title="Eventos" text="Feiras, festivais, encontros, shows e acontecimentos locais." className="text-pink-600 dark:text-pink-400" />
            <InfoCard icon={<Hotel />} title="Hospedagem" text="Lugares para receber visitantes com conforto e boa localização." className="text-blue-600 dark:text-blue-400" />
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-3xl sm:p-8">
          <SectionTitle
            title="Lavras em detalhes"
            text="Uma cidade que mistura tradição, conhecimento, natureza e afeto mineiro."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Feature icon={<Mountain />} title="Paisagens e natureza" text="Lavras possui áreas verdes, serras, cachoeiras e espaços naturais que convidam moradores e turistas a explorarem a região." />
            <Feature icon={<Landmark />} title="História e cultura" text="A cidade preserva construções, praças, igrejas e memórias que ajudam a contar sua trajetória no interior de Minas Gerais." />
            <Feature icon={<Users />} title="Cidade acolhedora" text="Com forte presença estudantil, comércio ativo e vida comunitária, Lavras une movimento urbano e hospitalidade mineira." />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-3xl sm:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 sm:h-14 sm:w-14">
              <School size={26} />
            </div>

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Projeto desenvolvido pelo SENAC Lavras
            </h2>

            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              O Encantos de Lavras foi desenvolvido como uma iniciativa ligada
              ao SENAC Lavras, valorizando a aprendizagem prática, a tecnologia
              e o olhar para a comunidade local.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              A proposta une desenvolvimento web, turismo, cultura e cidadania
              digital em uma plataforma pensada para divulgar os lugares,
              histórias e experiências que fazem parte da identidade lavrense.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-3xl sm:p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Por que o Encantos de Lavras importa?
            </h2>

            <div className="mt-6 grid gap-4">
              <CheckItem text="Ajuda visitantes a encontrarem pontos turísticos e experiências locais." />
              <CheckItem text="Valoriza a cultura, a história e os espaços da cidade." />
              <CheckItem text="Fortalece a divulgação de comércios, eventos e serviços." />
              <CheckItem text="Incentiva a participação da comunidade por meio de avaliações." />
              <CheckItem text="Oferece uma navegação moderna, responsiva e com Dark Mode." />
            </div>
          </div>
        </section>

        <section>
          <SectionTitle title="Encantos de Lavras em números" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat icon={<MapPinned />} title="+100" text="locais cadastrados" />
            <Stat icon={<Star />} title="Avaliações" text="da comunidade" />
            <Stat icon={<Camera />} title="Galeria" text="de fotos" />
            <Stat icon={<Heart />} title="Turismo" text="local valorizado" />
          </div>
        </section>
      </section>
    </main>
  )
}

function SectionTitle({ title, text }) {
  return (
    <div className="mb-6 text-center sm:mb-8">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
        {title}
      </h2>

      {text && (
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
          {text}
        </p>
      )}
    </div>
  )
}

function InfoCard({ icon, title, text, className }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
      <div className={`mb-4 ${className}`}>{icon}</div>
      <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {text}
      </p>
    </div>
  )
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
      <div className="mb-4 text-green-600 dark:text-green-400">{icon}</div>
      <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {text}
      </p>
    </div>
  )
}

function CheckItem({ text }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2
        className="mt-0.5 shrink-0 text-green-600 dark:text-green-400"
        size={20}
      />
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {text}
      </p>
    </div>
  )
}

function Stat({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
      <div className="mb-4 text-green-600 dark:text-green-400">{icon}</div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{text}</p>
    </div>
  )
}