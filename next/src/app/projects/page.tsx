import Link from 'next/link'
import { Section } from '@/components'

export const projects = [
  { slug: 'template', name: 'Template', description: 'Description', created_date: '2024-01-01' },
  { slug: 'projectA', name: 'Project A', description: 'Long description', created_date: '2023-05-10' },
  { slug: 'projectB', name: 'Project B', description: 'Another project', created_date: '2024-03-20' },
]

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
    <Section className='min-h-dvh h-fit'>
      {/* Header */}
      <div className='w-full h-fit gap-12 md:min-h-[240px] px-6 md:px-12 flex flex-col justify-between py-6 md:py-12'>
        <span className='text-6xl md:text-8xl -mt-2 md:-mt-4'>{title}</span>
        <p className='text-base md:text-lg'>{description}</p>
      </div>

      <div className='w-full px-6 md:px-12 pt-6 md:pt-12 pb-6 md:pb-8 space-y-12'>
        {sortedYears.map((year) => (
          <div key={year} className='w-full inline-flex justify-start items-start gap-6'>
            <div className='w-1/5 text-3xl md:text-4xl'>{year}</div>
            <div className='w-full h-fit grid grid-cols-4 gap-6'>
              {projectsByYear[year].map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.slug}>
                  <div className='w-full h-auto md:h-60 lg:h-72 bg-gray-100 flex flex-col justify-end p-4 hover:bg-gray-200 cursor-pointer mb-4'>
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
