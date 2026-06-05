-- CreateTable
CREATE TABLE "PontoTuristico" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "imagem" TEXT,
    "endereco" TEXT,
    "categoria" TEXT NOT NULL,
    "publicado" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PontoTuristico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FotoPonto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "legenda" TEXT,
    "pontoTuristicoId" INTEGER NOT NULL,

    CONSTRAINT "FotoPonto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PontoTuristico_slug_key" ON "PontoTuristico"("slug");

-- AddForeignKey
ALTER TABLE "FotoPonto" ADD CONSTRAINT "FotoPonto_pontoTuristicoId_fkey" FOREIGN KEY ("pontoTuristicoId") REFERENCES "PontoTuristico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
