import React, { useState, useEffect } from "react"

import { getSgtEmoji } from "../utils/timeEmoji"

// Circular headshot from /avatar.jpg, with the live Singapore time-of-day emoji
// shown as a small speech-bubble badge at the top-right (mirrors the dynamic
// favicon). If the photo is missing it falls back to an "M" monogram. Drop a
// photo at static/avatar.jpg and it appears automatically — no code change.
const Avatar = ({ size = 76 }: { size?: number }) => {
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
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <div className="w-full h-full rounded-full overflow-hidden bg-surface border border-line flex items-center justify-center">
        {src ? (
          <img
            src={src}
            alt="Max Li"
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            aria-label="Max Li"
            className="font-medium text-fg"
            style={{ fontSize: Math.round(size * 0.42), lineHeight: 1 }}
          >
            M
          </span>
        )}
      </div>

      {/* Time-of-day status as a speech bubble */}
      <div className="absolute -top-2 -right-2">
        <div className="relative flex items-center justify-center bg-surface border border-line rounded-full shadow-sm" style={{ width: 30, height: 30 }}>
          <span
            role="img"
            aria-label="current status"
            style={{ fontSize: 16, lineHeight: 1 }}
          >
            {emoji}
          </span>
          {/* tail pointing toward the avatar */}
          <span className="absolute -bottom-1 left-2 w-2.5 h-2.5 bg-surface border-b border-r border-line rotate-45" />
        </div>
      </div>
    </div>
  )
}

export default Avatar
