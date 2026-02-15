'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { InViewDiv, MotionImg, PageTitleArea } from '@/components'
import { projects, ALL_SKILLS } from './projectlist'
import type { ProjectSkill } from './projectlist'
import { activities } from './activitylist'
import { motion } from 'framer-motion'
import classNames from 'classnames'

export default function ProjectsPage() {
  const tabs = ['Projects', 'Activities']
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const [selectedSkills, setSelectedSkills] = useState<ProjectSkill[]>([])

  const toggleSkill = (skill: ProjectSkill) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const clearFilters = () => setSelectedSkills([])

  const filteredProjects = useMemo(() => {
    const filtered =
      selectedSkills.length === 0
        ? projects
        : projects.filter((p) => selectedSkills.some((skill) => p.skills?.includes(skill)))
    return [...filtered].sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime())
  }, [selectedSkills])

  const activitiesByYear = useMemo(() => {
    const grouped = activities.reduce(
      (acc, a) => {
        const year = new Date(a.year).getFullYear()
        if (!acc[year]) acc[year] = []
        acc[year].push(a)
        return acc
      },
      {} as Record<number, typeof activities>,
    )

    Object.values(grouped).forEach((arr) => {
      arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    })

    return grouped
  }, [])

  const sortedActivityYears = useMemo(
    () =>
      Object.keys(activitiesByYear)
        .map(Number)
        .sort((a, b) => b - a),
    [activitiesByYear],
  )

  const skillCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    ALL_SKILLS.forEach((skill) => {
      counts[skill] = projects.filter((p) => p.skills?.includes(skill)).length
    })
    return counts
  }, [])

  return (
    <>
      <div className='w-full pt-20 min-h-dvh h-fit px-2 md:px-12 pb-14 bg-white z-10'>
        <PageTitleArea tabMode tab={{ tabs, selectedTab, onSelectTab: setSelectedTab }} />

        {selectedTab === 'Projects' && (
          <>
            {/* Skill Filter Pills */}
            <div className='w-full px-4 md:px-8 pt-2 pb-0'>
              <div className='flex flex-row flex-wrap gap-2 items-center'>
                {ALL_SKILLS.map((skill) => {
                  const isActive = selectedSkills.includes(skill)
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={classNames(
                        'px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                        'border cursor-pointer active:scale-95',
                        isActive
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-500 hover:text-black',
                      )}
                    >
                      {skill}
                      <span
                        className={classNames('ml-1.5 text-xs', isActive ? 'text-neutral-400' : 'text-neutral-400')}
                      >
                        {skillCounts[skill]}
                      </span>
                    </button>
                  )
                })}

                {selectedSkills.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className='px-3 py-1.5 text-sm text-neutral-500 hover:text-black transition-colors cursor-pointer'
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <InViewDiv className='w-full px-4 md:px-8 pt-6 md:pt-12 pb-8 md:pb-16'>
              {filteredProjects.length === 0 ? (
                <div className='w-full py-20 text-center text-neutral-400 text-lg'>
                  No projects match the selected filters.
                </div>
              ) : (
                <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-20'>
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} highlightedSkills={selectedSkills} />
                  ))}
                </div>
              )}
            </InViewDiv>
          </>
        )}

        {selectedTab === 'Activities' && (
          <InViewDiv className='w-full px-4 md:px-8 pt-6 md:pt-12 pb-8 md:pb-16 space-y-12'>
            {sortedActivityYears.map((year) => (
              <div key={year} className='w-full pt-8 flex flex-col md:flex-row justify-start items-start gap-6'>
                <div className='w-2/5 text-xl md:text-2xl flex flex-row gap-2 justify-start font-medium items-center'>
                  {year}
                </div>
                <div className='w-full h-fit grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 lg:gap-4 xl:gap-6'>
                  {(activitiesByYear[year] ?? []).map((activity) => (
                    <ActivityCard key={`${activity.title}-${activity.date}`} activity={activity} />
                  ))}
                </div>
              </div>
            ))}
          </InViewDiv>
        )}
      </div>

      <div className='w-full h-[40dvh] bg-black sticky bottom-0 flex justify-center items-center' />
    </>
  )
}

const ProjectCard = ({ project, highlightedSkills = [] }: { project: any; highlightedSkills?: ProjectSkill[] }) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      key={project.slug}
      className='w-full h-fit mb-4 flex flex-col gap-4 justify-start items-start cursor-pointer hover:opacity-70 active:translate-y-1 transition-all '
    >
      
      <div className='w-full h-auto aspect-video relative overflow-hidden bg-gray-50 rounded-md'>
        <MotionImg
          src={project.cover}
          alt={project.name}
          magnify={false}
          className='w-full h-full object-cover object-center'
        />
      </div>
      <div className='w-full flex flex-col gap-1'>
        <div className='w-full flex flex-col md:flex-row justify-between items-start gap-2'>
          <span className='text-xl font-medium'>{project.name}</span>
          {project.skills && project.skills.length > 0 && (
            <div className='h-full flex flex-row flex-wrap gap-1.5 px-0.5'>
              {project.skills.map((skill: ProjectSkill) => (
                <span
                  key={skill}
                  className={classNames(
                    'text-xs text-nowrap lg:text-sm leading-none px-1.5 py-1 md:px-2 md:py-2 border',
                    highlightedSkills.includes(skill)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black/20',
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
        {project.description && (
          <p className='w-full h-full text-neutral-700 text-sm font-normal leading-snug px-0.5 md:mt-2'>
            {project.description}
          </p>
        )}
      </div>
    </Link>
  )
}

const ActivityCard = ({ activity }: { activity: any }) => {
  return (
    <motion.div
      className='w-full h-fit flex flex-col gap-4 justify-start items-start cursor-pointer hover:opacity-70 active:translate-y-1 transition-all '
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <a href={activity.link} target='_blank' rel='noopener noreferrer' className='w-full'>
        <div className='w-full h-auto mb-4 aspect-video relative overflow-hidden bg-gray-50'>
          <MotionImg
            magnify={false}
            src={activity.thumbnail || '/images/thumb.jpg'}
            alt={activity.title}
            className='w-full h-full object-cover object-center'
          />
        </div>
        <div className='w-full flex flex-col gap-1'>
          <span className='text-sm leading-none bg-neutral-100 text-neutral-800 w-fit px-2 py-1 rounded-md'>
            {activity.category}
          </span>
          <span className='text-2xl font-medium px-0.5 mb-2'>{activity.title}</span>
          <p className='w-full h-full text-neutral-700 text-sm font-normal leading-snug px-0.5 mt-2 pr-2'>
            {activity.description}
          </p>
          <span className='text-sm text-neutral-400 mt-1 px-0.5'>{activity.date}</span>
        </div>
      </a>
    </motion.div>
  )
}
