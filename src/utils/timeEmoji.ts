// Time-of-day "presence" emoji based on Singapore time.
// Kept in sync with the inline favicon script in gatsby-ssr.js.
//   06:00–12:00  morning / available   🟢
//   12:00–18:00  working               🧑‍💻
//   18:00–22:00  evening / resting     😌
//   22:00–06:00  sleeping              😴

export const getSgtHour = (): number => {
  try {
    const formatted = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Singapore",
      hour: "numeric",
      hour12: false,
    }).format(new Date())
    return parseInt(formatted, 10) % 24
  } catch (e) {
    return new Date().getHours()
  }
}

export const getSgtEmoji = (): string => {
  const h = getSgtHour()
  if (h >= 6 && h < 12) return "🟢"
  if (h >= 12 && h < 18) return "🧑‍💻"
  if (h >= 18 && h < 22) return "😌"
  return "😴"
}
