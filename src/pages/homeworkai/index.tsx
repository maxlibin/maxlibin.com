import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const APP_STORE_URL = "https://apps.apple.com/sg/app/homeworkai-psle-tutor/id6770512063"
const CONTACT_EMAIL = "me@maxlibin.com"

const HomeworkAI = () => {
  return (
    <Layout>
      <div className="mt-8 mb-16 px-4 md:px-0">
        {/* Hero */}
        <div className="py-10 border-b border-gray-200 dark:border-gray-800 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              iOS app
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Primary 1 – 6
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-600 mb-4">
            homeworkAI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-6">
            Snap a question, get a step-by-step explanation a primary-school kid
            can actually follow. Singapore Maths bar models, English grammar,
            Chinese 词语 — all in one tap.
          </p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.02]"
          >
            Download on the App Store
          </a>
        </div>

        {/* What it does */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What it does
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 max-w-2xl">
            <li>📷 Scan a homework question with the camera or photo library.</li>
            <li>🧮 Get an explanation tuned to the child's grade and subject.</li>
            <li>🗣️ Ask spoken follow-up questions, read answers aloud.</li>
            <li>🔒 Parent Zone with PIN: subject ceiling, daily scan cap.</li>
            <li>🌏 English and 简体中文 supported throughout.</li>
          </ul>
        </section>

        {/* Pages */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
            <Link
              to="/homeworkai/privacy/"
              className="block p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                Privacy Policy
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                What we collect, what we don't, and where it goes.
              </p>
            </Link>
            <Link
              to="/homeworkai/terms/"
              className="block p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                Terms of Use
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The rules of the road for using the app.
              </p>
            </Link>
            <Link
              to="/homeworkai/support/"
              className="block p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                Support
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get help, ask a question, report a bug.
              </p>
            </Link>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <p className="text-gray-700 dark:text-gray-300">
            Questions, feedback, or bug reports? Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </Layout>
  )
}

export default HomeworkAI

export const Head = () => (
  <SEO
    title="homeworkAI — iOS homework helper for primary-school kids"
    description="Snap a question, get a step-by-step explanation tuned to your child's grade and subject. Singapore Maths bar models, English, Chinese. Parent Zone with PIN."
    pathname="/homeworkai/"
    breadcrumbs={[
      { name: "Home", item: "/" },
      { name: "homeworkAI", item: "/homeworkai/" },
    ]}
    softwareApp={{
      name: "homeworkAI",
      description:
        "iOS homework helper for primary-school kids — scan a question, get a step-by-step explanation tuned to grade and subject.",
      applicationCategory: "EducationApplication",
      operatingSystem: "iOS",
      url: APP_STORE_URL,
    }}
  />
)
