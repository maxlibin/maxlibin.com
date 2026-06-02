import React, { useState, useEffect } from "react"

import { getSgtEmoji } from "../utils/timeEmoji"

// Shows the headshot at /avatar.jpg if present; otherwise falls back to the
// live Singapore time-of-day emoji (mirrors the dynamic favicon). Drop a real
// photo at static/avatar.jpg and it switches automatically — no code change.
const Avatar = ({ size = 72 }: { size?: number }) => {
  const [imgOk, setImgOk] = useState(true)
  const [emoji, setEmoji] = useState("🟢")

  useEffect(() => {
    setEmoji(getSgtEmoji())
  }, [])

  return (
    <div
      className="rounded-full overflow-hidden bg-surface border border-line flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {imgOk ? (
        <img
          src="/avatar.jpg"
          alt="Max Li Bin"
          width={size}
          height={size}
          className="w-full h-full object-cover"
          onError={() => setImgOk(false)}
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
