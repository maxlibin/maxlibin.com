import React, { useState } from "react"
import aiBananaFlow from "../assets/images/projects/ai-banana-flow.png"
import sgPassportPhoto from "../assets/images/projects/sg-passport-photo.png"
import myPhotoAI from "../assets/images/projects/myphotoai.png"
import interiorAI from "../assets/images/projects/interior-ai.png"

const projects = [
  {
    id: 0,
    title: "AI Banana Flow",
    platform: "Web",
    description: `AI Banana Flow is an AI Image Generator with Visual Flow Editor.
    
    It allows users to create stunning AI-generated images through an intuitive visual flow editor. Connect prompts, generate images, and build creative workflows with the power of AI. Experience a new paradigm of creative freedom with precision control and visual workflow management.`,
    coverUrl: aiBananaFlow,
    category: "AI Image Generation",
    url: "https://www.aibananaflow.com/",
  },
  {
    id: 1,
    title: "SG Passport Photo",
    platform: "Web",
    description: `A compliant Singapore Passport Photo Tool.
    
    Create official ICA-compliant passport photos instantly. The AI ensures strict 35x45mm dimensions, facial alignment, and white background requirements are met. It features biometric alignment, lighting correction, and automatic background removal to help you create the perfect passport photo from home.`,
    coverUrl: sgPassportPhoto,
    category: "Utility",
    url: "https://www.sgpassportphoto.com/",
  },
  {
    id: 2,
    title: "MyPhotoAI",
    platform: "iOS",
    description: `AI Photo Generator iOS App.
    
    MyPhotoAI lets you turn words into art in seconds. Explore 50+ styles, remix photos, and create gallery-worthy images with the power of AI. Whether you're a designer, content creator, or just exploring your imagination, MyPhotoAI makes visual creation effortless.`,
    coverUrl: myPhotoAI,
    category: "Photography",
    url: "https://apps.apple.com/sg/app/myphotoai-ai-photo-generator/id6748759925",
  },
  {
    id: 3,
    title: "Interior AI: Room Designer",
    platform: "iOS",
    description: `AI Interior Design iOS App.
    
    Redesign any room with AI. Upload a photo, choose a style, and see decor ideas in seconds. Save favorites, compare before/after, and plan your next makeover. Bring your dream home to life with Interior AI: Room Designer.`,
    coverUrl: interiorAI,
    category: "Design",
    url: "https://apps.apple.com/sg/app/interior-ai-room-designer/id6751051147",
  },
]

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0])

  return (
    <div className="w-full mt-8">
      <div className="py-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-left">
          Recent Side Projects
        </h2>
      </div>
      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[600px] overflow-hidden border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="p-6">
              <div className="h-[568px] overflow-y-auto pr-4 scrollbar">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  {selectedProject.platform} App
                </p>
                {selectedProject.url && (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 mb-4 bg-black dark:bg-white text-white dark:text-black rounded-lg transition-colors duration-200"
                  >
                    Check out this project
                  </a>
                )}

                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {selectedProject.description}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Category:</strong> {selectedProject.category}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {projects.map(project => (
              <div
                key={project.id}
                className={`cursor-pointer border rounded-lg transition-all duration-300 hover:border-indigo-500 ${
                  selectedProject.id === project.id
                    ? "border-indigo-500"
                    : "border-gray-200 dark:border-gray-800"
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="p-4 flex flex-col items-center">
                  <div className="w-full h-32 mb-4 overflow-hidden rounded-md">
                    <img
                      src={project.coverUrl}
                      alt={`Cover of ${project.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full text-left">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0">
                      {project.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {project.platform}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects

