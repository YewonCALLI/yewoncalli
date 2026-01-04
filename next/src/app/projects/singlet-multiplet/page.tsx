'use client'

import { Section, ScrollSideTab, MotionImg, MotionDiv } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../projectlist'

export default function ProjectDetailPage() {
  const project = projects.find((p) => p.slug === 'singlet-multiplet')
  const imagePath = '/images/projects/singlet-multiplet/'

  const sectionIds = ['overview', 'concept', 'visuals', 'performance', 'stills']
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
              Singlet&Multiplet is a media art performance that explores the idea of multiple identities existing within
              an individual. Drawing inspiration from quantum mechanics, specifically the concepts of superposition and
              entanglement, the work reflects how people embody diverse, sometimes contradictory, selves throughout
              life. Just as quantum states exist in layers, so do our various identities, coexisting and shaping who we
              are.
            </P>
          </Paragpraph>
        </Section>

        <Section id='concept'>
          <Chapter subTitle='Concept' />
          <Paragpraph left={null}>
            <P>
              The work explores the idea of multiple identities existing within an individual. Team Moiré views these
              layered identities as &quot;grains&quot; that form the unique patterns and traces of a person, much like
              quantum mechanics reveals unseen forces.
            </P>
          </Paragpraph>
        </Section>

        <Section id='visuals'>
          <Chapter subTitle='Visuals' />
          <Paragpraph left={null}>
            <P>
              The performance features video art created with p5.js, utilizing simple graphic elements like points,
              lines, and planes to represent the layered identities within us. These visual elements complement the
              story, which unfolds through movement and performance.
            </P>
          </Paragpraph>
        </Section>

        <Section id='performance'>
          <Chapter subTitle='Performance' />
          <Paragpraph left={null}>
            <P>
              Through this work, the team invites reflection on how individuals reconcile their many facets to become
              more integrated and mature selves.
            </P>
          </Paragpraph>
        </Section>

        <Section id='stills'>
          <Chapter subTitle='Stills' />
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '01.jpg'} alt='Singlet & Multiplet' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '02.jpg'} alt='Singlet & Multiplet' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '03.jpg'} alt='Singlet & Multiplet' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '04.jpg'} alt='Singlet & Multiplet' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '05.jpg'} alt='Singlet & Multiplet' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '06.jpg'} alt='Singlet & Multiplet' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '07.jpg'} alt='Singlet & Multiplet' className='w-full h-fit' />
          </Paragpraph>
        </Section>
      </ParllaxFrame>
      <div className='w-full h-[40dvh] bg-black sticky bottom-0 flex justify-center items-center'></div>
    </>
  )
}
