import { notFound } from 'next/navigation'
import { projects } from '../page'

// slug로 프로젝트 찾기
function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)

  if (!project) return notFound()

  return (
    <div className='min-h-dvh px-6 md:px-12 py-12'>
      <h1 className='text-5xl font-bold mb-6'>{project.name}</h1>
      <p className='text-base opacity-75 mb-4'>Created: {project.created_date}</p>
      <p className='text-lg'>{project.description}</p>
    </div>
  )
}
