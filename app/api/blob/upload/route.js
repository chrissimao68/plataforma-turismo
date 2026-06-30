import { handleUpload } from "@vercel/blob/client"
import { NextResponse } from "next/server"

export async function POST(request) {
  console.log("TOKEN EXISTE?", Boolean(process.env.BLOB_READ_WRITE_TOKEN))

  try {
    const body = await request.json()

    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          maximumSizeInBytes: 20 * 1024 * 1024,
        }
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload concluído:", blob.url)
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error("Erro no upload:", error)

    return NextResponse.json(
      { error: error.message || "Erro ao enviar imagem." },
      { status: 400 }
    )
  }
}