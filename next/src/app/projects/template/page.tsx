'use client'

import { Section, ScrollSideTab } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'

export default function ProjectDetailPage() {
  const sectionIds = ['research', 'design', 'development']
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
        bannerImage='/images/template.png'
        bannerTitle={`XR Science \nMuseum`}
        bannerSubTitle='January 1, 2024'
      >
        <ScrollSideTab activeSection={activeSection} sectionIds={sectionIds} />
        <Section id='research' className='pt-32 space-y-16 checking'>
          <Chapter subTitle='research' title='Voices Around the Adoption of Digital Textbooks' />
          <Paragpraph left={null}>
            <P>
              Despite the widespread adoption of digital textbooks, concerns are being raised in educational settings
              about learning effectiveness and declining literacy.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>01 | While Digital Device Usage Grows, Literacy Skills Continue to Decline</H3>
            <Div></Div>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>02 | Still Screen-Bound Learning</H3>
            <Div></Div>
          </Paragpraph>
        </Section>
        <Section id='design' className='pt-32 space-y-16 checking'>
          <Chapter subTitle='design' title='Voices Around the Adoption of Digital Textbooks' />
          <Paragpraph left={null}>
            <P>
              Despite the widespread adoption of digital textbooks, concerns are being raised in educational settings
              about learning effectiveness and declining literacy.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>01 | While Digital Device Usage Grows, Literacy Skills Continue to Decline</H3>
            <Div></Div>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>02 | Still Screen-Bound Learning</H3>
            <Div></Div>
          </Paragpraph>
        </Section>
        <Section id='development' className='pt-32 space-y-16 checking'>
          <Chapter subTitle='development' title='Voices Around the Adoption of Digital Textbooks' />
          <Paragpraph left={null}>
            <P>
              Despite the widespread adoption of digital textbooks, concerns are being raised in educational settings
              about learning effectiveness and declining literacy.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>01 | While Digital Device Usage Grows, Literacy Skills Continue to Decline</H3>
            <Div></Div>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>02 | Still Screen-Bound Learning</H3>
            <Div></Div>
          </Paragpraph>
        </Section>
      </ParllaxFrame>
    </>
  )
}
