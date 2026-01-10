import { GoArrowUpRight } from 'react-icons/go'

interface HistoryListProps {
  category: string
  items: {
    subject: {
      text: string
      link?: string
    }
    period: string
    list: {
      content: string
      link?: string
    }[]
  }[]
}

export const HistoryList = ({ history }: { history: HistoryListProps }) => {
  return (
    <>
      <div className='w-full h-fit flex flex-col justify-start items-start gap-4'>
        <div className='font-semibold text-lg md:text-xl leading-none'>{history.category}</div>
        <div className='w-full h-fit flex flex-col gap-4 md:gap-4 justify-start items-start border-t border-gray-300 pt-2'>
          {/* 2 depth */}
          {history.items.map((item) => (
            <div
              key={item.subject.text}
              className='w-full h-fit flex flex-col gap-2 md:gap-2'
            >
              {item.subject.link ? (
                <a
                  href={item.subject.link}
                  className='w-full h-fit font-medium text-sm md:text-base leading-normal md:hover:opacity-70 transition-all cursor-pointer'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {item.subject.text} <GoArrowUpRight className='inline-block text-sm md:text-lg' />
                </a>
              ) : (
                <div key={item.subject.text} className='w-full h-fit font-medium text-sm leading-normal'>
                  {item.subject.text}
                </div>
              )}
              <div
                key={item.period}
                className='w-fit h-fit leading-normal text-sm md:text-sm text-right font-medium text-neutral-500'
              >
                {item.period}
              </div>
              {/* 3 depth */}
              <div className='w-full h-fit space-y-2 md:space-y-2'>
                {item.list.map((item) => (
                  <div key={item.content}>
                    {item.link ? (
                      <a
                        key={item.content}
                        href={item.link}
                        className='w-full h-fit text-sm md:text-sm font-normal leading-normal md:hover:opacity-70 transition-all cursor-pointer'
                      >
                        {item.content} <GoArrowUpRight className='inline-block text-sm md:text-sm' />
                      </a>
                    ) : (
                      <div
                        key={item.content}
                        className='w-full h-fit text-sm md:text-sm font-normal leading-normal md:hover:opacity-70 transition-all'
                      >
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
