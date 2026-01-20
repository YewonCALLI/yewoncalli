'use client'

import { Section, ScrollSideTab } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div, A } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'

export default function ProjectDetailPage() {
  const sectionIds = ['Outcome']
  const [activeSection, setActiveSection] = useState('research')

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // 섹션이 화면 중앙에 있을 때만 활성화
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <ParllaxFrame
        banner={{
          image: '/images/projects/new-formative/cover.png',
          title: '2025 Samsung Design Membership <New Formative>',
          description: 'The online website for 2025 Samsung Design Membership',
          subTitle: 'Jun 2025 - Aug 2025',
        }}
      >
        <ScrollSideTab activeSection={activeSection} sectionIds={sectionIds} />

        <Section id='Outcome'>
          <Chapter
            subTitle=''
            title='Developed the Samsung Design Membership Online Exhibition 2025, crafting immersive interaction design and front-end development.'
          />
          <Paragpraph>
            <A href='https://www.newformative.com/'>View site</A>
          </Paragpraph>

          <div className='w-full aspect-[16/9] bg-white overflow-hidden relative'>
            <iframe
              src='https://player.vimeo.com/video/1151368571?autoplay=1&loop=1&muted=1&background=1'
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125vh] min-w-full min-h-full'
              frameBorder='0'
              allow='autoplay; fullscreen; picture-in-picture'
              allowFullScreen
            />
          </div>

          <div className='w-full flex m-0 relative'>
            <div className='w-1/2 aspect-[2160/2700] bg-white overflow-hidden relative'>
              <iframe
                src='https://player.vimeo.com/video/1156550188?autoplay=1&loop=1&muted=1&background=1'
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125vh] min-w-full min-h-full'
                frameBorder='0'
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
              />
            </div>
            <div className='w-1/2 aspect-[2160/2700] bg-white overflow-hidden relative'>
              <iframe
                src='https://player.vimeo.com/video/1156550324?autoplay=1&loop=1&muted=1&background=1'
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125vh] min-w-full min-h-full'
                frameBorder='0'
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
              />
            </div>
          </div>
          <div className='w-full aspect-[16/9] bg-white overflow-hidden relative'>
            <iframe
              src='https://player.vimeo.com/video/1156601059?autoplay=1&loop=1&muted=1&background=1'
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125vh] min-w-full min-h-full'
              frameBorder='0'
              allow='autoplay; fullscreen; picture-in-picture'
              allowFullScreen
            />
          </div>
          <div className='w-full aspect-[16/9] bg-white overflow-hidden relative'>
            <iframe
              src='https://player.vimeo.com/video/1156605487?autoplay=1&loop=1&muted=1&background=1'
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125vh] min-w-full min-h-full'
              frameBorder='0'
              allow='autoplay; fullscreen; picture-in-picture'
              allowFullScreen
            />
          </div>
          <div className='w-full flex m-0 relative'>
            <div className='w-1/2 aspect-[2160/2700] bg-white overflow-hidden relative'>
              <iframe
                src='https://player.vimeo.com/video/1156550794?autoplay=1&loop=1&muted=1&background=1'
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125vh] min-w-full min-h-full'
                frameBorder='0'
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
              />
            </div>
            <div className='w-1/2 aspect-[2160/2700] bg-white overflow-hidden relative'>
              <iframe
                src='https://player.vimeo.com/video/1156550589?autoplay=1&loop=1&muted=1&background=1'
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125vh] min-w-full min-h-full'
                frameBorder='0'
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
              />
            </div>
          </div>
        </Section>
      </ParllaxFrame>

      <div className='w-full h-[40dvh] bg-black sticky bottom-0 flex justify-center items-center'></div>
    </>
  )
}
