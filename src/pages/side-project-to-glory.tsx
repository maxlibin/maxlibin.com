import React, { useEffect } from "react"
import { navigate } from "gatsby"
import SEO from "../components/seo"

const RedirectPage = () => {
  useEffect(() => {
    navigate("/vibe-code-to-glory", { replace: true })
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO title="Redirecting..." />
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Redirecting...
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          You are being redirected to Vibe Code to Glory.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          <a href="/vibe-code-to-glory" className="underline hover:text-indigo-600">
            Click here if you are not redirected automatically.
          </a>
        </p>
      </div>
    </div>
  )
}

export default RedirectPage
