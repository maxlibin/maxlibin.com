import React, { useState, useEffect } from "react"

import { getSgtEmoji } from "../utils/timeEmoji"

// Defaults to the live Singapore time-of-day emoji (mirrors the dynamic favicon),
// then upgrades to the headshot at /avatar.jpg if that image actually loads.
// Probing avoids the SSR broken-image flash (the <img> would 404 before React
// could attach an onError handler). Drop a real photo at static/avatar.jpg and
// it switches automatically — no code change.
const Avatar = ({ size = 72 }: { size?: number }) => {
  const [src, setSrc] = useState<string | null>(null)
  const [emoji, setEmoji] = useState("🟢")

  useEffect(() => {
    setEmoji(getSgtEmoji())
    const img = new Image()
    img.onload = () => {
      if (img.naturalWidth > 0) setSrc("/avatar.jpg")
    }
    img.src = "/avatar.jpg"
  }, [])

  return (
    <div
      className="rounded-full overflow-hidden bg-surface border border-line flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img
          src={src}
          alt="Max Li Bin"
          width={size}
          height={size}
          className="w-full h-full object-cover"
        />
      ) : (
        <span
          role="img"
          aria-label="Max Li Bin"
          style={{ fontSize: Math.round(size * 0.5), lineHeight: 1 }}
        >
          {emoji}
        </span>
      )}
    </div>
  )
}

export default Avatar
