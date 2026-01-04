'use client'

import { Section, ScrollSideTab, MotionImg, MotionDiv } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div, A } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../projectlist'

export default function ProjectDetailPage() {
  const project = projects.find((p) => p.slug === 'ganpan')
  const imagePath = '/images/projects/ganpan/'

  const sectionIds = ['overview', 'concept', 'system', 'output']
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
          <Chapter subTitle='Project' title='Ganpan' />
          <Paragpraph left={null}>
            <P>
              Ganpan is a digital art project that transforms user-inputted text into Korean signboard images. At its
              core is a database built by photographing and labeling individual letters from city signs. When a user
              enters a sentence, the system assembles and displays it using letter images extracted from real
              signboards.
            </P>
            <MotionImg
              src={imagePath + '01.jpg'}
              alt='ganpan01'
              caption='Interface that reconstructs user text with signboard letters'
            />
          </Paragpraph>
        </Section>

        <Section id='concept'>
          <Chapter subTitle='Concept' title='Reversing the Methodology of AI' />
          <Paragpraph left={null}>
            <P>
              Ganpan operates in the opposite direction of AI image generation. While AI learns from countless sources
              to create images with untraceable origins, Ganpan collects individual letters from Korean city signboards
              and clearly preserves their sources. User-inputted text is transformed into actual signboard letters, and
              clicking each letter reveals its original signboard context.
            </P>
            <MotionImg
              src={imagePath + '02.jpg'}
              alt='ganpan02'
              caption='Figure 1. Diagram comparing AI image generation and Ganpan'
            />
          </Paragpraph>
        </Section>

        <Section id='system'>
          <Chapter subTitle='System' title='Pipeline' />
          <Paragpraph left={null}>
            <P>
              Ganpan stores original signboard images and their extracted individual characters (e.g., &apos;은&apos;,
              &apos;마&apos;, &apos;종&apos;, &apos;합&apos;, &apos;상&apos;, &apos;가&apos;) in a relational structure
              within a Supabase database. When a user enters text, the system queries the database to retrieve matching
              letter images and displays them on screen. Each letter image is linked to its source signboard image
              through a parent key, allowing users to view the original signboard context when clicking on any
              individual character.
            </P>
            <MotionImg src={imagePath + '03.jpg'} alt='ganpan03' caption='Figure 2. Ganpan website pipeline' />
          </Paragpraph>

          <Chapter subTitle='Interaction' title='Click-to-Trace' />
          <Paragpraph left={null}>
            <P>Each letter is a sourced image, and a click takes the user back to its original signboard context.</P>
            <MotionImg src={imagePath + '04.jpg'} alt='ganpan04' caption='Ganpan click-to-trace interaction 1' />
            <MotionImg src={imagePath + '05.jpg'} alt='ganpan05' caption='Ganpan click-to-trace interaction 2' />
          </Paragpraph>
        </Section>

        <Section id='output'>
          <Chapter subTitle='3D' title='3D Plaza' />
          <Paragpraph left={null}>
            <P>
              We collected more than 300 user-generated signboard images in the dataset. Using three.js, I created a 3D
              plaza where these images combine to form a tall building.
            </P>
            <MotionImg
              src={imagePath + '06.jpg'}
              alt='ganpan06'
              caption='Ganpan 3D plaza with user-generated signboards'
            />
          </Paragpraph>
          <Paragpraph left={null}>
            <A href='https://ganpan.vercel.app/'>Visit Ganpan Website</A>
          </Paragpraph>

          <Chapter subTitle='Print' title='From Website to Zine' />
          <Paragpraph left={null}>
            <P>
              Ganpan not only stores user-generated sentence images digitally, but also transforms them into analog
              publications in the form of zines. This brings the artistic process back into physical form and explores
              how digital art (a website) and print media can work complementarily with analog.
            </P>
            <MotionImg
              src={imagePath + '07.jpg'}
              alt='ganpan07'
              caption='Printed documentation reconstructing generated letters and their sources'
            />
            <MotionImg
              src={imagePath + '08.jpg'}
              alt='ganpan08'
              caption='Printed documentation reconstructing generated letters and their sources'
            />
            <MotionImg
              src={imagePath + '09.jpg'}
              alt='ganpan09'
              caption='Printed documentation reconstructing generated letters and their sources'
            />
            <MotionImg
              src={imagePath + '10.jpg'}
              alt='ganpan10'
              caption='Printed documentation reconstructing generated letters and their sources'
            />
          </Paragpraph>
        </Section>
      </ParllaxFrame>
      <div className='sticky bottom-0 flex h-[40dvh] w-full items-center justify-center bg-black'></div>
    </>
  )
}
