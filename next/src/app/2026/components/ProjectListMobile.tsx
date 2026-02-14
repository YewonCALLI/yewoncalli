'use client'

import { useState, useRef } from 'react'
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
    description:
      'TypoFold is a creative coding tool that transforms 3D typographic forms into printable paper-craft nets, allowing code-generated designs to be cut, folded, and assembled by hand.',
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
    description:
      'A media art that simulates multiple entities attracting one another through gravity, moving and colliding, to explore uncertainty.',
    media: 'Media Art',
    thumbnail: '/images/projects/simulating-1-2-3/cover2026.png',
    slug: 'simulating-1-2-3',
    urls: [{ url: './projects/typofold', width: 300, height: 600, top: 40, left: 50 }],
  },
  {
    year: '2023',
    title: 'Singlet&Multiplet',
    specificCategory: 'Media Art Performance',
    description:
      'Quantum physics based media art performance that connects the process of discovering and embracing various aspects of ego.',
    media: 'Media Art',
    thumbnail: '/images/projects/singlet-multiplet/cover2026.png',
    slug: 'singlet-multiplet',
    urls: [{ url: './projects/typofold', width: 300, height: 600, top: 40, left: 50 }],
  },
  {
    year: '2023',
    title: 'delta-individualism',
    specificCategory: 'Installation',
    description:
      'An installation work that frames modern society as "high-entropy," linking distorted individualism to hatred, discrimination, and isolation, and proposing Tandava as a collective ritual of renewal toward the common good.',
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
    description:
      'Collaborated with Samsung Design Membership designers to design and develop interaction that match with exhibition concepts.',
    media: 'Client Work',
    thumbnail: '/images/projects/new-formative/cover2026.png',
    slug: 'new-formative',
    urls: [{ url: './projects/another', width: 300, height: 600, top: 40, left: 50 }],
  },
  {
    year: '2025',
    title: 'Smilegate FutureBee Website',
    specificCategory: 'UXUI/Frontend Development',
    description:
      'Defined UXUI painpoints for the existing website and redesigned the website to improve user experience.',
    media: 'Client Work',
    thumbnail: '/images/projects/image1.png',
    urls: [{ url: './projects/another', width: 300, height: 600, top: 40, left: 50 }],
  },
]

/* ── helpers ── */

const allMedia = Array.from(new Set(works.map((w) => w.media)))
const allYears = Array.from(new Set(works.map((w) => w.year))).sort((a, b) => +b - +a)

interface ProjectListMobileProps {
  onProjectClick?: (project: Project, index: number) => void
  selectedProject?: Project | null
}

export function ProjectListMobile({ onProjectClick, selectedProject }: ProjectListMobileProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedMedia, setSelectedMedia] = useState('all')
  const scrollRef = useRef<HTMLDivElement>(null)

  const filtered = works.filter((w) => {
    const yearMatch = selectedYear === 'all' || w.year === selectedYear
    const mediaMatch = selectedMedia === 'all' || w.media.includes(selectedMedia)
    return yearMatch && mediaMatch
  })

  return (
    <>
      {/* ─── Bottom Fixed Bar ─── */}
      <div
        className='fixed left-0 w-screen z-50 flex flex-col items-start overflow-hidden'
        style={{
          bottom: 0,
          transition: 'height 0.3s ease',
          height: isExpanded ? '218px' : '40px',
          fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
        }}
      >
        {/* ── Select Row (filter bar) ── */}
        <div className='flex w-fit items-center justify-end'>
          <div className='flex flex-row gap-2 bg-[#0059ff] p-[7px] flex-1'>
            {/* Year Select */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className='bg-white text-black text-xs px-2 py-1 border-none outline-none rounded-none'
            >
              <option value='all'>All</option>
              {allYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            {/* Media Select */}
            <select
              value={selectedMedia}
              onChange={(e) => setSelectedMedia(e.target.value)}
              className='bg-white text-black text-xs px-2 py-1 border-none outline-none rounded-none'
            >
              <option value='all'>📡 All Media</option>
              {allMedia.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className='flex items-center justify-center px-3 h-full bg-black text-white cursor-pointer text-sm'
            style={{ minHeight: '100%' }}
          >
            {isExpanded ? '▼' : '▲'}
          </button>
        </div>

        {/* ── Horizontal Thumbnail Scroll ── */}
        {isExpanded && (
          <div
            ref={scrollRef}
            className='flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden w-full bg-black'
            style={{
              height: 'calc(220px - 42px)',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style>{`
              .mobile-worklist::-webkit-scrollbar { display: none; }
            `}</style>
            {filtered.map((work, index) => {
              const isSelected =
                selectedProject?.title === work.title && selectedProject?.specificCategory === work.specificCategory

              return (
                <div
                  key={`${work.title}-${index}`}
                  className='flex-shrink-0 p-[10px] cursor-pointer'
                  onClick={() => onProjectClick?.(work, index)}
                >
                  <div
                    className={classNames(
                      'h-[150px] w-[150px] rounded-[10px] bg-gray-700 flex flex-col items-center justify-center text-white text-xs text-center p-2',
                      isSelected && 'ring-2 ring-red-500',
                    )}
                  >
                    {work.title}
                    {work.description && (<>
                      <br />
                      <span className='text-[10px] font-light'>{work.description}</span>
                    </>)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
