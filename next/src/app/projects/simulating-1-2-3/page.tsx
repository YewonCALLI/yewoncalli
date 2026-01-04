'use client'

import { Section, ScrollSideTab, MotionImg, MotionDiv } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../projectlist'

export default function ProjectDetailPage() {
  const project = projects.find((p) => p.slug === 'simulating-1-2-3')
  const imagePath = '/images/projects/simulating-1-2-3/'

  const sectionIds = ['overview', 'method', 'system', 'videos']
  const [activeSection, setActiveSection] = useState(sectionIds[0])

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
          image: project.cover,
          title: project.name,
          description: project.description,
          subTitle: project.created_date,
          subTitle2:
            project.client || project.residency || project.created_in || project.exhibition || project.award || '',
        }}
      >
        <ScrollSideTab activeSection={activeSection} sectionIds={sectionIds} />

        <Section id='overview'>
          <Chapter subTitle='Overview' />
          <Paragpraph left={null}>
            <P>
              Simulating #1,2,3 is a digital simulation exploring the gravitational interactions between entities
              through physical computations. Within the simulation, the artist observes beings in a two-dimensional
              world, where each run produces different outcomes as the entities exhibit varied behaviors.
            </P>
          </Paragpraph>
        </Section>

        <Section id='method'>
          <Chapter subTitle='Method' />
          <Paragpraph left={null}>
            <P>
              This unpredictability mirrors the uncertainty of real life, prompting reflection on how we navigate a
              world full of probabilistic events, continually adjusting to and predicting the unknown.
            </P>
          </Paragpraph>
        </Section>

        <Section id='system'>
          <Chapter
            subTitle='System
'
          />
          <Paragpraph left={null}>
            <P>
              The simulation was developed using Unreal Engine&apos;s Blueprint system, where I designed a gravitational
              algorithm based on the universal law of gravitation. By adjusting parameters such as gravitational
              acceleration and mass, I controlled the movement of the entities, allowing for dynamic and unique
              interactions each time the simulation runs.
            </P>
          </Paragpraph>
        </Section>

        <Section id='videos'>
          <Chapter subTitle='Videos' />
          <Paragpraph left={null}>
            <div className='w-full aspect-video'>
              <iframe
                title='vimeo-player'
                src='https://player.vimeo.com/video/833905494?h=b0f97e3fee&title=0&byline=0&portrait=0&badge=0&dnt=1'
                className='w-full h-full'
                frameBorder='0'
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
              />
            </div>
          </Paragpraph>
          <Paragpraph left={null}>
            <div className='w-full aspect-video'>
              <iframe
                title='vimeo-player'
                src='https://player.vimeo.com/video/1000799277?h=b0f97e3fee&title=0&byline=0&portrait=0&badge=0&dnt=1'
                className='w-full h-full'
                frameBorder='0'
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
              />
            </div>
          </Paragpraph>
          <Paragpraph left={null}>
            <div className='w-full aspect-video'>
              <iframe
                title='vimeo-player'
                src='https://player.vimeo.com/video/1000697197?h=b0f97e3fee&title=0&byline=0&portrait=0&badge=0&dnt=1'
                className='w-full h-full'
                frameBorder='0'
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
              />
            </div>
          </Paragpraph>
        </Section>
      </ParllaxFrame>
      <div className='w-full h-[40dvh] bg-black sticky bottom-0 flex justify-center items-center'></div>
    </>
  )
}
