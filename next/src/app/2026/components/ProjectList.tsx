// ProjectList.tsx
'use client'

import classNames from 'classnames'

interface ProjectUrl {
  url: string
  width: number
  height: number
  top: number
  left: number
}

export interface Project {
  year: string
  title: string
  specificCategory: string
  description: string
  media: string
  urls: ProjectUrl[]
  thumbnail?: string
  slug?: string
}

export const works: Project[] = [
  {
    year: '2025',
    title: 'TypoFold',
    specificCategory: 'Thesis Project Experimental/Typography',
    description: 'TypoFold is a creative coding tool that transforms 3D typographic forms into printable paper-craft nets, allowing code-generated designs to be cut, folded, and assembled by hand.',
    media: 'Tool',
    thumbnail: '/images/projects/typofold/cover2026.png',
    slug: 'typofold',
    urls: [{ url: './projects/typofold', width: 300, height: 600, top: 40, left: 50 }],
  },
  {
    year: '2025',
    title: 'Loving Practice',
    specificCategory: 'Media Facade',
    description: 'Shader art',
    media: 'Code Art',
    thumbnail: '/images/projects/loving-practice/cover.png',
    urls: [{ url: './projects/typofold', width: 300, height: 600, top: 40, left: 50 }],
  },
  {
    year: '2023',
    title: 'Simulating #1,2,3',
    specificCategory: 'Media Facade',
    description: 'A media art that simulates multiple entities attracting one another through gravity, moving and colliding, to explore uncertainty.',
    media: 'Media Art',
    thumbnail: '/images/projects/simulating-1-2-3/cover2026.png',
    slug: 'simulating-1-2-3',
    urls: [{ url: './projects/typofold', width: 300, height: 600, top: 40, left: 50 }],
  },
  {
    year: '2023',
    title: 'Singlet&Multiplet',
    specificCategory: 'Media Art Performance',
    description: 'Quantum physics based media art performance that connects the process of discovering and embracing various aspects of ego.',
    media: 'Media Art',
    thumbnail: '/images/projects/singlet-multiplet/cover2026.png',
    slug: 'singlet-multiplet',
    urls: [{ url: './projects/typofold', width: 300, height: 600, top: 40, left: 50 }],
  },
  {
    year: '2023',
    title: 'delta-individualism',
    specificCategory: 'Installation',
    description: 'An installation work that frames modern society as "high-entropy," linking distorted individualism to hatred, discrimination, and isolation, and proposing Tandava as a collective ritual of renewal toward the common good.',
    media: 'Media Art',
    thumbnail: '/images/projects/memeproject/cover.png',
    urls: [{ url: './projects/typofold', width: 300, height: 600, top: 40, left: 50 }],
  },
  {
    year: '2025',
    title: 'MiraeN Digital TextBook',
    specificCategory: 'UXUI/Frontend Development',
    description: 'Transforming abstract science concepts into interactive, spatial learning experiences for students.',
    media: 'Client Work',
    thumbnail: '/images/projects/xr-science-museum/cover2026.png',
    slug: 'xr-science-museum',
    urls: [{ url: './projects/another', width: 300, height: 600, top: 40, left: 50 }],
  },
  {
    year: '2025',
    title: '2025 Samsung Design Membership Online Exhibition',
    specificCategory: 'Frontend Development',
    description: 'Collaborated with Samsung Design Membership designers to design and develop interaction that match with exhibition concepts.',
    media: 'Client Work',
    thumbnail: '/images/projects/new-formative/cover2026.png',
    slug: 'new-formative',
    urls: [{ url: './projects/another', width: 300, height: 600, top: 40, left: 50 }],
  },
  {
    year: '2025',
    title: 'Smilegate FutureBee Website',
    specificCategory: 'UXUI/Frontend Development',
    description: 'Defined UXUI painpoints for the existing website and redesigned the website to improve user experience.',
    media: 'Client Work',
    thumbnail: '/images/projects/image1.png',
    urls: [{ url: './projects/another', width: 300, height: 600, top: 40, left: 50 }],
  },
]

const categoryOrder = [
  'Website',
  'Math, Science, and Mind',
  'Isolated Data',
  'Accessibility',
  'Video',
  'Poster',
]

function groupByCategory(projects: Project[]) {
  const grouped: Record<string, Project[]> = {}

  projects.forEach((project) => {
    const category = project.media
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(project)
  })

  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a)
    const indexB = categoryOrder.indexOf(b)
    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  return sortedCategories.map((category) => ({
    category,
    projects: grouped[category],
  }))
}

interface ProjectListProps {
  onProjectClick?: (project: Project, index: number) => void
  selectedProject?: Project | null
}

export function ProjectList({ onProjectClick, selectedProject }: ProjectListProps) {
  const groupedWorks = groupByCategory(works)

  // Flatten to get global index
  let globalIndex = 0
  const getGlobalIndex = () => globalIndex++

  return (
    <div className="w-full h-fit md:h-[calc(100vh-60px)] overflow-y-auto font-old-standard">
      {groupedWorks.map((group, groupIndex) => (
        <div key={group.category} className={classNames(groupIndex > 0 && 'mt-0')}>
          {/* Category Header */}
          <div className="border-b border-black pb-0 mb-0">
            <h2 className="text-xs uppercase">{group.category}</h2>
          </div>

          {/* Projects Table */}
          <div className="w-full">
            {group.projects.map((work, index) => {
              const currentGlobalIndex = getGlobalIndex()
              const isSelected = selectedProject?.title === work.title && selectedProject?.specificCategory === work.specificCategory

              return (
                <div
                  key={`${work.title}-${index}`}
                  onClick={() => onProjectClick?.(work, currentGlobalIndex)}
                  className={classNames(
                    'grid grid-cols-[1fr_2fr] border-b border-black',
                    'cursor-pointer transition-colors',
                    isSelected
                      ? 'bg-red-500 text-white'
                      : 'bg-white hover:bg-red-500 hover:text-white'
                  )}
                >
                  <div className="py-2">
                    <div className="text-xs px-1 underline">{work.title}</div>
                    <div className="text-xs px-3 mt-1">{work.specificCategory}</div>
                  </div>
              
                  {/* Description */}
                  <div className="px-2 py-2 text-xs border-l border-gray-300">
                    {work.description}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}