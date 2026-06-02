import React from "react"
import {
  AiOutlineGithub as GithubIcon,
  AiOutlineTwitter as TwitterIcon,
  AiOutlineLinkedin as LinkedinIcon,
} from "react-icons/ai"

type social = {
  label: string
  icon: React.ReactNode
  href: string
}

const socials: Array<social> = [
  {
    label: "Twitter",
    icon: <TwitterIcon />,
    href: "https://twitter.com/maxlibin",
  },
  {
    label: "Github",
    icon: <GithubIcon />,
    href: "https://github.com/maxlibin",
  },
  {
    label: "LinkedIn",
    icon: <LinkedinIcon />,
    href: "https://linkedin.com/in/maxlibin",
  },
]

const Social = () => (
  <ul className="flex items-center gap-3 pr-4 border-r border-line">
    {socials.map(({ href, label, icon }) => (
      <li
        key={label}
        className="text-faint hover:text-fg transition-colors text-lg"
        title={label}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow Max Li Bin on ${label}`}
        >
          {icon}
        </a>
      </li>
    ))}
  </ul>
)

export default Social
