import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default async function Icon() {
  const imageData = await fetch(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-72R7yon5ozUBY2Gk7xGURjFyiH4J00.png",
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "transparent",
      }}
    >
      <img
        src={Buffer.from(imageData).toString("base64") || "/placeholder.svg"}
        alt="GC Logo"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>,
    {
      ...size,
    },
  )
}
