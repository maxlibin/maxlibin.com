import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import homeworkaiMascot from "../../assets/images/projects/homeworkai.png"

const APP_STORE_URL = "https://apps.apple.com/sg/app/homeworkai-psle-tutor/id6770512063"
const CONTACT_EMAIL = "me@maxlibin.com"

const HomeworkAI = () => {
  return (
    <Layout>
      <div className="mt-8 mb-16 px-4 md:px-0">
        {/* Hero */}
        <div className="py-10 border-b border-gray-200 dark:border-gray-800 mb-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
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
                Snap a question, get a step-by-step explanation a primary-school
                kid can actually follow. Singapore Maths bar models, English
                grammar, Chinese 词语 — all in one tap.
              </p>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.02]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 384 512"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                Download on the App Store
              </a>
            </div>
            <div className="flex-shrink-0 flex justify-center md:justify-end">
              <img
                src={homeworkaiMascot}
                alt="homeworkAI octopus mascot reading a book"
                className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-xl"
                loading="eager"
              />
            </div>
          </div>
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
