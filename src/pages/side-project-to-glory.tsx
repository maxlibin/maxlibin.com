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
  {
    id: 1,
    title: "GetFileMock.com",
    platform: "Web + CLI",
    description: "Instant, client-side dummy file generator for developers. Create 1GB+ test files in seconds without uploading data.",
    status: "Shipped",
    url: "https://getfilemock.com",
    coverUrl: "https://b.maxlibin.com/wp-content/uploads/2026/01/filemock.png", // Updated with user provided screenshot
    revenue: "Pre-Revenue",
    blogUrl: "https://maxlibin.com/from-vibe-to-glory-launching-my-first-2026-app-in-under-4-hours/",
    excerpt: "It’s a specific kind of pain. You’re building a file upload feature. You need to test if your backend correctly rejects a 50MB PDF. You need to see if your frontend handles a corrupted PNG without crashing... Where do you get these files? You scavenge. GetFileMock.com is the solution.",
    technologies: ["OpenAI Codex", "Claude Opus 4.5", "React", "Vite", "Web Workers"],
  },
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

  const [selectedProject, setSelectedProject] = React.useState<any>(null)

  const shippedCount = challenges.filter(c => c.status === "Shipped").length

  return (
    <Layout>
      <div className="mt-8 mb-16 px-4 md:px-0 relative">
        <SEO title="Vibe Code to Glory - Side Projects 2026" />

        {/* Header Section */}
        <div className="py-8 border-b border-gray-200 dark:border-gray-800 mb-8">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Vibe Code to Glory
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Side Projects 2026
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            24 revenue-ready apps in 12 months. One independent developer.
            Pushing the limits of the "Vibe Coding" workflow.
          </p>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              <span>
                Progress: {shippedCount} / {TOTAL_SLOTS} Apps Shipped
              </span>
              <span>
                {Math.round((shippedCount / TOTAL_SLOTS) * 100)}% Complete
              </span>
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
              onClick={() => project && setSelectedProject(project)}
              className={`relative group rounded-xl border transition-all duration-300 ${
                project
                  ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 border-dashed"
              } overflow-hidden min-h-[350px] flex flex-col`}
            >
              {project ? (
                // FILLED SLOT
                <>
                  {/* Full Background Image if avaiable */}
                  {project.coverUrl ? (
                     <>
                        <img
                            src={project.coverUrl}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                     </>
                  ): (
                     <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 z-0" />
                  )}


                  <div className="relative z-20 p-6 flex-grow flex flex-col h-full text-white">
                     {/* Top Badge */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-black/50 backdrop-blur-md border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest text-white/90">
                           {project.platform}
                        </div>
                        <div className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full border border-white/20">
                          #{challengeNumber}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <h3 className="text-2xl font-extrabold text-white mb-2 leading-tight group-hover:text-pink-400 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-xs font-bold px-2 py-1 rounded bg-green-500/20 text-green-300 border border-green-500/30">
                                {project.status}
                            </span>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-sm font-bold text-white hover:text-pink-400 flex items-center gap-1 transition-colors"
                            >
                                Visit Site <span className="text-lg">→</span>
                            </a>
                        </div>
                    </div>
                  </div>
                </>
              ) : (
                // EMPTY SLOT
                <div className="flex flex-col items-center justify-center h-full p-6 text-center opacity-50 hover:opacity-100 transition-opacity relative z-10">
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

        {/* Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setSelectedProject(null)}
            />
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800">
              
              {/* Modal Header */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                  {/* Background Image */}
                  {selectedProject.coverUrl ? (
                    <>
                        <img 
                            src={selectedProject.coverUrl} 
                            alt={selectedProject.title} 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900" />
                  )}

                 <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                     <div className="flex justify-between items-end">
                        <div className="relative z-10 text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                    Project #{selectedProject.id}
                                </span>
                                <span className="bg-white/20 backdrop-blur-md text-white/90 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-white/10">
                                    {selectedProject.platform}
                                </span>
                            </div>
                            
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 shadow-sm">
                            {selectedProject.url ? (
                                <a 
                                href={selectedProject.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-pink-400 transition-colors"
                                >
                                {selectedProject.title}
                                </a>
                            ) : (
                                selectedProject.title
                            )}
                            </h2>
                            <p className="text-lg text-gray-200 font-medium">
                                {selectedProject.status}
                            </p>
                        </div>
                     </div>
                 </div>

                 {/* Close Button */}
                 <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-20 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 rounded-full transition-all border border-white/10"
                >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* Description & Excerpt */}
                <div>
                    <h3 className="text-sm font-bold uppercase text-gray-400 dark:text-gray-500 mb-3 tracking-wider">
                        About the Project
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                        {selectedProject.description}
                    </p>
                     {selectedProject.excerpt && (
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4 rounded-r italic text-gray-600 dark:text-gray-400">
                            "{selectedProject.excerpt}"
                        </div>
                     )}
                </div>

                {/* Vibe Stack */}
                {selectedProject.technologies && (
                    <div>
                        <h3 className="text-sm font-bold uppercase text-gray-400 dark:text-gray-500 mb-3 tracking-wider flex items-center gap-2">
                            <span>✨ Vibe Stack</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech: string) => (
                                <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 mt-auto">
                    {selectedProject.url && (
                        <a 
                            href={selectedProject.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:scale-[1.02]"
                        >
                            Launch App 🚀
                        </a>
                    )}
                     {selectedProject.blogUrl && (
                        <a 
                            href={selectedProject.blogUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-xl shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:scale-[1.02]"
                        >
                            Read Full Story 📖
                        </a>
                    )}
                </div>

              </div>



            </div>
          </div>
        )}

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
  <SEO
    title="Vibe Code to Glory - Side Projects 2026"
    description="Tracking my journey to build 24 revenue-generating apps in 12 months using Vibe Coding."
    pathname="/side-project-to-glory"
    breadcrumbs={[
      { name: "Home", item: "/" },
      { name: "Vibe Code to Glory", item: "/side-project-to-glory" },
    ]}
  />
)
