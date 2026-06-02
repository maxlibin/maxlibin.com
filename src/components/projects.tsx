import React from "react"
import aiBananaFlow from "../assets/images/projects/ai-banana-flow.png"
import sgPassportPhoto from "../assets/images/projects/sg-passport-photo.png"
import myPhotoAI from "../assets/images/projects/myphotoai.png"
import interiorAI from "../assets/images/projects/interior-ai.png"
import { Section, Row } from "./sectionRow"

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
    id: 4,
    title: "Tulsk",
    platform: "Web",
    description: `AI-native project management platform built around autonomous multi-agent clusters that self-delegate tasks, plus EMA, an always-on AI project manager that monitors workspaces, flags risk, and reports.

    Native integrations with Slack, Gmail, GitHub, and Google Calendar.`,
    coverUrl: aiBananaFlow,
    category: "AI Project Management",
    url: "https://tulsk.io",
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
    url:
      "https://apps.apple.com/sg/app/myphotoai-ai-photo-generator/id6748759925",
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
  return (
    <Section label="Projects">
      {projects.map(project => (
        <Row key={project.id} meta={project.platform}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg hover:text-muted transition-colors"
          >
            {project.title}
            <span className="text-faint ml-1">↗</span>
          </a>
          <span className="text-faint"> — {project.category}</span>
        </Row>
      ))}

      {/* Per-project schema for SEO/GEO */}
      {projects.map(project => (
        <script
          key={`schema-${project.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: project.title,
              description: project.description.split("\n")[0],
              applicationCategory: project.category,
              operatingSystem: project.platform === "iOS" ? "iOS" : "Web",
              url: project.url,
              author: { "@type": "Person", name: "Max Li Bin" },
            }),
          }}
        />
      ))}
    </Section>
  )
}

export default Projects
