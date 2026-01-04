'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { InViewDiv, MotionImg, PageTitleArea } from '@/components'
import { projects } from './projectlist'

export default function ProjectsPage() {
  const tabs = ['Projects', 'Activities']
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  const projectsByYear = projects.reduce(
    (acc, p) => {
      const year = new Date(p.created_date).getFullYear()
      if (!acc[year]) acc[year] = []
      acc[year].push(p)
      return acc
    },
    {} as Record<number, typeof projects>,
  )

  // ✅ 연도 그룹 내부도 created_date 최신순 정렬
  Object.values(projectsByYear).forEach((arr) => {
    arr.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime())
  })

  const sortedYears = Object.keys(projectsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <>
      <div className='w-full min-h-dvh h-fit pt-14 bg-white z-10'>
        <PageTitleArea tabMode tab={{ tabs, selectedTab, onSelectTab: setSelectedTab }} />
        {selectedTab === 'Projects' && (
          <InViewDiv className='w-full px-4 md:px-8 pt-6 md:pt-12 pb-8 md:pb-16 space-y-12'>
            {sortedYears.map((year) => (
              <div key={year} className='w-full pt-8 flex flex-col md:flex-row justify-start items-start gap-6'>
                <div className='w-2/5 text-xl md:text-2xl flex flex-row gap-2 justify-start font-medium items-center'>
                  {year}
                </div>
                <div className='w-full h-fit grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 lg:gap-4 xl:gap-6'>
                  {projectsByYear[year].map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </div>
            ))}
          </InViewDiv>
        )}
        {selectedTab === 'Activities' && (
          <InViewDiv className='w-full h-full flex justify-center items-center py-20'>
            <span className='text-lg text-neutral-500'>Activities content coming soon...</span>
          </InViewDiv>
        )}
      </div>
      <div className='w-full h-[40dvh] bg-black sticky bottom-0 flex justify-center items-center'></div>
    </>
  )
}

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      key={project.slug}
      className='w-full h-fit mb-4 flex flex-col gap-4 justify-start items-start cursor-pointer hover:opacity-70 active:translate-y-1 transition-all '
    >
      <div className='w-full h-auto aspect-video relative overflow-hidden bg-gray-50'>
        <MotionImg src={project.cover} alt={project.name} className='w-full h-full object-cover object-center' />
      </div>
      <div className='w-full flex flex-col gap-1'>
        <div className='w-full h-fit flex flex-row flex-wrap gap-2 justify-start items-start mb-1'>
          {project.part.split(', ').map((part) => (
            <span
              key={part}
              className='text-xs leading-none bg-neutral-100 text-neutral-800 w-fit px-2 py-1 rounded-md'
            >
              {part}
            </span>
          ))}
        </div>
        <span className='text-2xl font-medium px-0.5 mb-2'>{project.name}</span>
        {project.client && (
          <div className='w-full h-fit text-sm leading-tight px-0.5'>
            <span className='font-medium text-black mr-3.5'>Client</span>
            <span className='font-normal text-neutral-700'>{project.client}</span>
          </div>
        )}
        {project.residency && (
          <div className='w-full h-fit text-sm leading-tight px-0.5'>
            <span className='font-medium text-black mr-3.5'>Residency</span>
            <span className='font-normal text-neutral-700'>{project.residency}</span>
          </div>
        )}
        {project.created_in && (
          <div className='w-full h-fit text-sm leading-tight px-0.5'>
            <span className='font-medium text-black mr-3.5'>Created In</span>
            <span className='font-normal text-neutral-700'>{project.created_in}</span>
          </div>
        )}
        {project.exhibition && (
          <div className='w-full h-fit text-sm leading-tight px-0.5'>
            <span className='font-medium text-black mr-3.5'>Exhibition</span>
            <span className='font-normal text-neutral-700'>{project.exhibition}</span>
          </div>
        )}
        {project.award && (
          <div className='w-full h-fit text-sm leading-tight px-0.5'>
            <span className='font-medium text-black mr-3.5'>Award</span>
            <span className='font-normal text-neutral-700'>{project.award}</span>
          </div>
        )}
        {project.description && (
          <p className='w-full h-full text-neutral-700 text-sm font-normal leading-snug px-0.5 mt-2 pr-2'>
            {project.description}
          </p>
        )}
      </div>
    </Link>
  )
}
