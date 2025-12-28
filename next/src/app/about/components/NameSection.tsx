interface NameSectionProps {
  jobs: string[]
  name: string
  location: string
}

export const NameSection = ({ jobs, name, location }: NameSectionProps) => {
  return (
    <div className='w-full md:w-7/12 flex flex-col justify-between items-start gap-16 md:gap-8'>
      <div className='w-full h-fit flex flex-row flex-wrap justify-start items-start gap-4'>
        {jobs.map((word) => (
          <span key={word} className='text-[8vw] md:text-[5vw] font-bold leading-none'>
            {word}
          </span>
        ))}
      </div>
      <div className='w-fit h-fit flex flex-col justify-start items-start'>
        <span className='font-bold text-3xl'>{name}</span>
        <span className='font-medium'>({location})</span>
      </div>
    </div>
  )
}
