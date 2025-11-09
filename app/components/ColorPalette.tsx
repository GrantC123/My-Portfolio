"use client"

import React, { useState } from "react"
import { Copy } from "lucide-react"

interface ColorSwatch {
  name: string
  value: string
  textColor: string
}

export default function ColorPalette() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const coralColors: ColorSwatch[] = [
    { name: "coral-50", value: "#F0FDFF", textColor: "text-gray-900" },
    { name: "coral-100", value: "#CCFFFF", textColor: "text-gray-900" },
    { name: "coral-200", value: "#53E5F8", textColor: "text-gray-900" },
    { name: "coral-300", value: "#00C6E5", textColor: "text-white" },
    { name: "coral-400", value: "#009ECC", textColor: "text-white" },
    { name: "coral-500", value: "#006C99", textColor: "text-white" },
    { name: "coral-600", value: "#005480", textColor: "text-white" },
    { name: "coral-700", value: "#003859", textColor: "text-white" },
    { name: "coral-800", value: "#001C2E", textColor: "text-white" },
    { name: "coral-900", value: "#000915", textColor: "text-white" },
  ]

  const zincColors: ColorSwatch[] = [
    { name: "zinc-400", value: "#9f9fa9", textColor: "text-white" },
    { name: "zinc-500", value: "#71717b", textColor: "text-white" },
    { name: "zinc-800", value: "#27272a", textColor: "text-white" },
    { name: "zinc-900", value: "#18181b", textColor: "text-white" },
    { name: "zinc-950", value: "#09090b", textColor: "text-white" },
  ]

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(name)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    <div className="p-8 bg-white rounded-xl shadow-sm space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Coral Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {coralColors.map((color) => (
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
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{color.name}</p>
                  {copiedColor === color.name && <span className="text-xs text-green-600 font-medium">Copied!</span>}
                </div>
                <p className="text-sm text-gray-500 font-mono">{color.value}</p>
                <p className="text-xs text-gray-400 font-mono">bg-{color.name}</p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Zinc Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {zincColors.map((color) => (
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
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{color.name}</p>
                    {copiedColor === color.name && <span className="text-xs text-green-600 font-medium">Copied!</span>}
                  </div>
                  <p className="text-sm text-gray-500 font-mono">{color.value}</p>
                  <p className="text-xs text-gray-400 font-mono">bg-{color.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
