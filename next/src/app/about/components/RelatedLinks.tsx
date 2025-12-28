import { GoArrowUpRight } from 'react-icons/go'

interface RelatedLinkProps {
  links: {
    name: string
    value: string
  }[]
}

export const RelatedLinks = ({ links }: RelatedLinkProps) => {
  return (
    <>
      <div className='w-full md:w-5/12 flex flex-col justify-start items-start gap-4 md:gap-8'>
        <span className='font-semibold text-lg md:text-2xl'>
          Related Link{' '}
          <GoArrowUpRight className='inline-block text-xl md:text-3xl -translate-y-[1px] md:-translate-y-[2px]' />
        </span>
        <div className='w-full h-fit flex flex-col'>
          {links.map((item) => (
            <a
              key={item.name}
              href={item.value}
              className='w-full text-base md:text-2xl font-medium leading-loose border-b border-gray-300 md:hover:border-black active:translate-y-0.5 transition-all'
              target='_blank'
              rel='noopener noreferrer'
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
