-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "aprovado" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pontoTuristicoId" INTEGER NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_pontoTuristicoId_fkey" FOREIGN KEY ("pontoTuristicoId") REFERENCES "PontoTuristico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
