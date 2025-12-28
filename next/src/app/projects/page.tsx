import Link from 'next/link'
import { MotionDiv, PageTitleArea } from '@/components'
import { projects } from './projectlist'

export default function ProjectsPage() {
  const projectsByYear = projects.reduce(
    (acc, p) => {
      const year = new Date(p.created_date).getFullYear()
      if (!acc[year]) acc[year] = []
      acc[year].push(p)
      return acc
    },
    {} as Record<number, typeof projects>,
  )

  const sortedYears = Object.keys(projectsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <>
      <div className='w-full min-h-dvh h-fit pt-14 bg-white z-10'>
        <PageTitleArea title='Projects' />
        <MotionDiv className='w-full px-4 md:px-8 pt-6 md:pt-12 pb-6 md:pb-8 space-y-12'>
          {sortedYears.map((year) => (
            <div key={year} className='w-full pt-8 flex flex-col md:flex-row justify-start items-start gap-6'>
              <div className='w-2/5 text-xl md:text-2xl flex flex-row gap-2 justify-start items-center'>{year}</div>
              <div className='w-full h-fit grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 lg:gap-4 xl:gap-6'>
                {projectsByYear[year].map((project) => (
                  <Link
                    href={`/projects/${project.slug}`}
                    key={project.slug}
                    className='w-full h-fit mb-4 flex flex-col gap-4 justify-start items-start cursor-pointer hover:opacity-70 active:translate-y-1 transition-all '
                  >
                    <div className='w-full h-auto aspect-video relative overflow-hidden bg-gray-50'>
                      <img
                        src={project.cover}
                        alt={project.name}
                        className='w-full h-full object-cover object-center'
                      />
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                      <div className='w-full h-fit flex flex-row flex-wrap gap-2 justify-start items-start'>
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
                      <div className='w-full h-fit flex flex-row justify-start items-center gap-4 text-sm leading-none px-0.5'>
                        <span className='w-fit font-medium'>Client</span>
                        <span className='w-full font-light'>{project.client}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </MotionDiv>
      </div>
      <div className='w-full h-[50vh] bg-black sticky bottom-0 flex justify-center items-center'></div>
    </>
  )
}
