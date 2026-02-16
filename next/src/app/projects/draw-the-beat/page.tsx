'use client'

import { Section, ScrollSideTab, MotionImg, MotionDiv } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../projectlist'

export default function ProjectDetailPage() {
  const project = projects.find((p) => p.slug === 'draw-the-beat')
  const imagePath = '/images/projects/draw-the-beat/'

  const sectionIds = ['intro', 'question', 'flow', 'sound', 'examples']
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

        <Section id='intro'>
          <Chapter
            subTitle='Overview'
            title='A drawing-based music tool where sketching beats generates sound and sheet music in real time.'
          />
          <Paragpraph left={null}>
            <P>
              Draw the Beat! is an interactive digital art project that blends music and visual design. Users draw beats
              directly on the screen, triggering sounds while the generated sheet music unfolds live as visual feedback.
            </P>
            <MotionImg src={imagePath + '00.jpg'} alt='Draw the Beat' className='w-full h-fit' />
          </Paragpraph>
        </Section>

        <Section id='question'>
          <Chapter
            subTitle='Key Question'
            title='Is there a way to make music composition more intuitive and visual?'
          />
          <Paragpraph left={null}>
            <P>
              Instead of starting from symbols, the project focuses on trying ideas through gestures and learning
              through immediate feedback.
            </P>
          </Paragpraph>
        </Section>

        <Section id='flow'>
          <Chapter subTitle='How It Works' title='' />
          <Paragpraph>
            <H3>1. Draw</H3>
            <P>The user draws beats directly on the screen.</P>
          </Paragpraph>
          <Paragpraph>
            <H3>2. Recognize (ML)</H3>
            <P>Machine learning recognizes and classifies the drawn shapes.</P>
          </Paragpraph>
          <Paragpraph>
            <H3>3. Generate (Sound + Score)</H3>
            <P>Based on the predicted class, sounds are triggered and sheet music is generated live.</P>
          </Paragpraph>
          <Paragpraph>
            <P>
              Processing visualizes user input in real time and generates musical elements, while Wekinator uses machine
              learning to recognize user-drawn graphics and trigger sounds.
            </P>
            <MotionImg src={imagePath + '01.jpg'} alt='Draw the Beat' className='w-full h-fit' />
            <MotionImg src={imagePath + '02.jpg'} alt='Draw the Beat' className='w-full h-fit' />
          </Paragpraph>
        </Section>

        <Section id='sound'>
          <Chapter subTitle='Sound Design' title='' />
          <Paragpraph left={null}>
            <P>
              Some sounds are presented alongside familiar imagery—such as clouds and rain—so users can understand the
              character of a sound through visual cues as well.
            </P>
            <MotionImg
              src={imagePath + '03.jpg'}
              alt='Draw the Beat'
              className='w-full h-fit'
              caption='Pairing a drawing with a real-world image (e.g., cloud/rain) helps communicate the sound’s mood and
              texture.'
            />
          </Paragpraph>
        </Section>

        <Section id='examples'>
          <Chapter subTitle='Examples' title='Generated Score Examples' />
          <Paragpraph left={null}>
            <P>Below are score outputs generated from different drawing patterns.</P>
            <MotionImg
              src={imagePath + '04.jpg'}
              alt='Draw the Beat'
              className='w-full h-fit'
              caption='Changing the drawing pattern alters the rhythm density and the resulting notation.'
            />
          </Paragpraph>

          <Chapter subTitle='Demo Video' title='Project Summary Video' />
          <Paragpraph left={null}>
            <P>A walkthrough showing the end-to-end flow from drawing input to sound and score output.</P>
            <MotionDiv>
              <div className='w-full aspect-video'>
                <iframe
                  title='vimeo-player'
                  src='https://player.vimeo.com/video/1028274888?h=b0f97e3fee&title=0&byline=0&portrait=0&badge=0&dnt=1'
                  className='w-full h-full'
                  frameBorder='0'
                  allow='autoplay; fullscreen; picture-in-picture'
                  allowFullScreen
                />
              </div>
            </MotionDiv>
          </Paragpraph>
        </Section>
      </ParllaxFrame>
      <div className='w-full h-[40dvh] bg-black sticky bottom-0 flex justify-center items-center'></div>
    </>
  )
}
