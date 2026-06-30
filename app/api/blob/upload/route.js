import { handleUpload } from "@vercel/blob/client"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const body = await request.json()

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/jpg",
        ],
        maximumSizeInBytes: 20 * 1024 * 1024,
      }),
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload concluído:", blob.url)
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error("Erro no upload:", error)

    return NextResponse.json(
      {
        error: error.message || "Erro ao enviar imagem.",
      },
      {
        status: 400,
      }
    )
  }
}