'use client'

import { Section, ScrollSideTab, MotionImg, MotionDiv } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div, A } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../projectlist'

export default function ProjectDetailPage() {
  const project = projects.find((p) => p.slug === 'hongyeon-1.0')
  const imagePath = '/images/projects/hongyeon-1.0/'

  const sectionIds = ['overview', 'context', 'data', 'experience', 'exhibition']
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
              Hongyeon 1.0 is a chatbot blending multigenerational voices from Hongyeon-gil, sharing local stories and
              culture through AI-driven narrative.
            </P>
          </Paragpraph>
        </Section>

        <Section id='context'>
          <Chapter subTitle='Context' />
          <Paragpraph left={null}>
            <P>
              Hongyeon 1.0 is a project I developed after spending four months visiting Hongyeon-gil, Yeonhui-dong,
              Seoul. As I observed a noticeable generational gap between the older and younger residents, I aimed to
              create an AI chatbot that could represent a unified voice, blending perspectives from across the
              community.
            </P>
          </Paragpraph>
        </Section>

        <Section id='data'>
          <Chapter subTitle='Data' />
          <Paragpraph left={null}>
            <P>
              Using data collected from street interviews, online surveys, and web scraping, I trained Hongyeon 1.0 to
              share not only factual information but also personal stories, history, and culture, as if these
              experiences belonged to one person.
            </P>
          </Paragpraph>
        </Section>

        <Section id='experience'>
          <Chapter subTitle='Experience' />
          <Paragpraph left={null}>
            <P>
              Accessible through an avatar on a website, Hongyeon 1.0 bridges generational divides, allowing users to
              experience the essence of life in Hongyeon-gil through authentic, AI-driven storytelling.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '01.gif'} alt='experience-1' caption='Hongyeon 1.0 Demo' />
            <A href='https://hongyeon.vercel.app/'>Try Hongyeon 1.0 Chatbot</A>
          </Paragpraph>
        </Section>

        <Section id='exhibit'>
          <Chapter subTitle='Exhibition' />
          <Paragpraph left={null}>
            <P>
              This chatbot was exhibited in a gallery located in Hongyeon-gil itself, where many local residents had the
              opportunity to try it firsthand.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '02.jpg'} alt='exhibition-1' caption='Exhibition view' />
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg
              src={imagePath + '03.jpg'}
              alt='exhibition-2'
              caption='QR code poster placed around the neighborhood to invite locals to interact with Hongyeon 1.0'
            />
          </Paragpraph>
        </Section>
      </ParllaxFrame>
      <div className='w-full h-[40dvh] bg-black sticky bottom-0 flex justify-center items-center'></div>
    </>
  )
}
