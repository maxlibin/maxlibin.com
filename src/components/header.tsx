import React from "react"
import { Link } from "gatsby"

import Social from "./social"
import ThemeToggle from "./toggler"

type link = {
  label: string
  href: string
}

const links: Array<link> = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Vibe Code to Glory", href: "/side-project-to-glory" },
]

const Header = () => (
  <header className="py-4 flex items-center mb-4">
    <nav aria-label="Main navigation">
      <ul className="flex space-x-4">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              to={href}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-800 dark:hover:text-indigo-500 transition-colors"
              activeClassName="!text-indigo-600 dark:!text-indigo-400 font-bold"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    <div className="ml-auto flex space-x-4 items-center">
      <Social />
      <ThemeToggle />
    </div>
  </header>
)

export default Header
