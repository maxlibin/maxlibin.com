import React from "react"

import Header from "./header"

const Layout = ({ children, wide = false }) => (
  <div className="min-h-full bg-bg text-muted px-6">
    <div
      className={`mx-auto flex flex-col min-h-full ${
        wide ? "max-w-5xl" : "max-w-content"
      }`}
    >
      <Header />
      <main className="pb-24">{children}</main>
    </div>
  </div>
)

export default Layout
