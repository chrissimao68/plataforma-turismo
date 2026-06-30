import { handleUpload } from "@vercel/blob/client"
import { NextResponse } from "next/server"

export async function POST(request) {
  const body = await request.json()

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          maximumSizeInBytes: 20 * 1024 * 1024,
          tokenPayload: JSON.stringify({
            pathname,
          }),
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