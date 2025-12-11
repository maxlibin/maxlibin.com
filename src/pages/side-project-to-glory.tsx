import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

// Import existing project images or placeholders
// Ideally we would import these, but for now assuming the user has them.
// I will reuse the imports from projects.tsx if possible, or just use placeholders if I can't easily resolve them without more lookups.
// Actually, I can just copy the imports from projects.tsx since I read it.
// Image imports removed as they are not used for the 2026 challenge yet.
// Import your project cover images here when you add them.

// --- DATA: EDIT THIS LIST TO ADD NEW PROJECTS ---
// The goal is 24 apps in 12 months starting 2026.
// Add your new projects to this array.
const challenges = [
  // {
  //   id: 1,
  //   title: "Example App",
  //   platform: "Web",
  //   description: "Description...",
  //   status: "Shipped",
  //   url: "https://example.com",
  //   coverUrl: null,
  //   revenue: "Generating Revenue",
  // },
]

const TOTAL_SLOTS = 24

const SideProjectToGlory = () => {
  // Create an array of 24 slots
  const slots = Array.from({ length: TOTAL_SLOTS }, (_, i) => {
    const challengeNumber = i + 1
    const project = challenges.find(p => p.id === challengeNumber)
    return {
      challengeNumber,
      project,
    }
  })

  const shippedCount = challenges.filter(c => c.status === "Shipped").length

  return (
    <Layout>
      <div className="mt-8 mb-16 px-4 md:px-0">
        <SEO title="Side Project to Glory - The 2026 Challenge" />
        
        {/* Header Section */}
        <div className="py-8 border-b border-gray-200 dark:border-gray-800 mb-8">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Side Project to Glory
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            The 2026 Challenge
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            24 revenue-ready apps in 12 months. One independent developer.
            Pushing the limits of the "Vibe Coding" workflow.
          </p>
          
          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress: {shippedCount} / {TOTAL_SLOTS} Apps Shipped</span>
              <span>{Math.round((shippedCount / TOTAL_SLOTS) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${(shippedCount / TOTAL_SLOTS) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {slots.map(({ challengeNumber, project }) => (
            <div 
              key={challengeNumber}
              className={`relative group rounded-xl border transition-all duration-300 ${
                project 
                  ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-xl hover:-translate-y-1" 
                  : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 border-dashed"
              } overflow-hidden min-h-[300px] flex flex-col`}
            >
              {project ? (
                // FILLED SLOT
                <>
                  <div className="h-40 overflow-hidden relative">
                     {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {project.coverUrl ? (
                      <img 
                        src={project.coverUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                        <span className="text-4xl text-white font-bold">{challengeNumber}</span>
                      </div>
                    )}
                    
                    {/* Badge */}
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-20 border border-white/20">
                      #{challengeNumber}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1" title={project.title}>
                        {project.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {project.status}
                      </span>
                      {project.url && (
                        <a 
                          href={project.url}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300 flex items-center gap-1"
                        >
                          Visit <span className="text-lg">→</span>
                        </a>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                // EMPTY SLOT
                <div className="flex flex-col items-center justify-center h-full p-6 text-center opacity-50 hover:opacity-100 transition-opacity">
                  <div className="text-6xl font-black text-gray-200 dark:text-gray-700 mb-4 select-none">
                    {challengeNumber}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    Upcoming App
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                   Waiting for deployment...
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Footer / CTA */}
        <div className="mt-16 text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Follow the Journey
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            I'm documenting the entire process of building these 24 apps.
          </p>
          <a 
            href="https://twitter.com/maxlibin" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Follow on Twitter
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default SideProjectToGlory

// Use a simple layout wrapper for the Head
export const Head = () => (
  <SEO title="Side Project to Glory - The 2026 Challenge" description="Tracking my journey to build 24 revenue-generating apps in 12 months." />
)
