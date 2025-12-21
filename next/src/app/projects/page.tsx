import Link from 'next/link'
import { Section } from '@/components'

const projects = [{ slug: 'template', name: 'Template', description: 'Description', created_date: '2024-01-01' }]

export default function Page() {
  const title = 'Projects'
  const description = 'A collection of my works and case studies.'

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
    <Section className='min-h-dvh h-fit pt-14'>
      {/* Header */}
      <div className='w-full h-fit gap-12 md:min-h-[240px] px-4 md:px-8 flex flex-col justify-between py-6 md:py-12'>
        <span className='text-6xl md:text-8xl -mt-2 md:-mt-4'>{title}</span>
        <p className='text-base md:text-lg'>{description}</p>
      </div>

      <div className='w-full px-4 md:px-8 pt-6 md:pt-12 pb-6 md:pb-8 space-y-12'>
        {sortedYears.map((year) => (
          <div key={year} className='w-full inline-flex justify-start items-start gap-6'>
            <div className='w-1/6 text-lg font-light font-mono md:text-xl flex flex-row gap-2 justify-start items-center'>
              <div className='w-1.5 h-1.5 bg-black' />
              {year}
            </div>
            <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4'>
              {projectsByYear[year].map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.slug}>
                  <div className='w-full h-auto aspect-[640/360] bg-gray-100 flex flex-col justify-end p-4 hover:bg-gray-200 cursor-pointer mb-4'>
                    <span className='text-lg md:text-xl font-medium'>{project.name}</span>
                    <p className='text-sm md:text-base'>{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
