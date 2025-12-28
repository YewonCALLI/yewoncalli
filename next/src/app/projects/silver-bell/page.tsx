'use client'

import { Section, ScrollSideTab } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'

export default function ProjectDetailPage() {
  const sectionIds = ['research', 'process', 'development']
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
          image: '/images/projects/silver-bell/cover.jpg',
          title: 'Silver Bell',
          description: 'An exercise app designed for older adults in Hongyeon-gil, Seoul',
          subTitle: 'December 31, 2023',
        }}
      >
        <ScrollSideTab activeSection={activeSection} sectionIds={sectionIds} />

        <Section id='research'>
          {/* Background */}
          <Chapter subTitle='Background' title='Rapid Aging in an Emerging Cultural Hub' />
          <Paragpraph left={null}>
            <P>
              During the Hwayeon: Hongyeon-gil residency (Sep 2023 to Jan 2024), we observed rapid gentrification and
              the growth of cultural infrastructure. However, older residents were largely absent from these emerging
              cultural routes.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>Key Observations</H3>
            <Div></Div>
          </Paragpraph>

          {/* Field Research */}
          <Chapter subTitle='Field Research' title='How we collected field insights' />
          <Paragpraph left={null}>
            <P>
              We mapped how younger residents describe Hongyeon-gil—and whether older adults appear in that narrative.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>01 | Research Process - Online Survey</H3>
          </Paragpraph>

          <Paragpraph
            left={
              <>
                <H3>Online Survey through Instagram</H3>
                <p className='text-sm'>(Collaborated with Hongyeon-gil influencer, @hongyeongil_seoul)</p>
              </>
            }
          >
            <Div>images</Div>
            <P>
              We used an online survey to capture local knowledge and how younger residents perceive older adults in
              Hongyeon-gil.
            </P>
          </Paragpraph>

          <Paragpraph
            left={
              <>
                <H3>Survey Results</H3>
                <p className='text-sm'>Participants : 34</p>
              </>
            }
          >
            <Div>chart1</Div>
            <Div>chart2</Div>
            <H3>01 | Older adults were rarely mentioned in how people described Hongyeon-gil.</H3>
            <Div>image</Div>
            <H3>02 | Hongyeon-gil is remembered through commercial leisure venues.</H3>
            <Div>chart</Div>
          </Paragpraph>

          {/* Field Research */}
          <Chapter subTitle='Field Research' title='How we collected field insights' />
          <Paragpraph left={null}>
            <P>We were able to find stories of elderly people living in Hongyeongil through offline interviews.</P>
          </Paragpraph>
        </Section>

        <Section id='process'>
          {/* MVP List */}
          <Chapter subTitle='MVP List' title='What We’re Building' />
          <Paragpraph left={null}>
            <P>
              This list outlines the core technologies and design decisions we chose to develop for the first version.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <Div></Div>
          </Paragpraph>
        </Section>

        <Section id='development'>
          <Chapter subTitle='Development' title='Building the Application' />
          <Paragpraph left={null}>
            <P>
              We developed the Silver Bell application using React Native for cross-platform compatibility and ease of
              use.
            </P>
          </Paragpraph>
        </Section>
      </ParllaxFrame>
      <div className='w-full h-[60dvh] bg-black sticky bottom-0 flex justify-center items-center'>
        <h1 className='text-white text-7xl text-center w-fit h-fit'>End of Page</h1>
      </div>
    </>
  )
}
