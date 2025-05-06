"use client"

import { useState } from "react"
import { Copy } from "lucide-react"

interface ColorSwatch {
  name: string
  value: string
  textColor: string
}

export default function ColorPalette() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const purpleColors: ColorSwatch[] = [
    { name: "purple-50", value: "#F5F7FF", textColor: "text-gray-900" },
    { name: "purple-100", value: "#EBF0FF", textColor: "text-gray-900" },
    { name: "purple-200", value: "#BFD1FF", textColor: "text-gray-900" },
    { name: "purple-300", value: "#A0AEFF", textColor: "text-gray-900" },
    { name: "purple-400", value: "#7A7AFF", textColor: "text-white" },
    { name: "purple-500", value: "#5D43FF", textColor: "text-white" },
    { name: "purple-600", value: "#450BEC", textColor: "text-white" },
    { name: "purple-700", value: "#2D00A5", textColor: "text-white" },
    { name: "purple-800", value: "#15005D", textColor: "text-white" },
    { name: "purple-900", value: "#030022", textColor: "text-white" },
  ]

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(name)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    <div className="p-8 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Purple Color Palette</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {purpleColors.map((color) => (
          <div
            key={color.name}
            className="flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md"
          >
            <div
              className={`h-24 flex items-center justify-center ${color.textColor}`}
              style={{ backgroundColor: color.value }}
            >
              <button
                onClick={() => copyToClipboard(color.value, color.name)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={`Copy ${color.value}`}
              >
                <Copy size={18} />
              </button>
            </div>
            <div className="p-3 bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{color.name}</p>
                  <p className="text-sm text-gray-500">{color.value}</p>
                </div>
                {copiedColor === color.name && <span className="text-xs text-green-600 font-medium">Copied!</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
