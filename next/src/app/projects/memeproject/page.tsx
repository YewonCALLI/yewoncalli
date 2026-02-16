'use client'

import { Section, ScrollSideTab, MotionImg, MotionDiv } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div, A } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../projectlist'

export default function ProjectDetailPage() {
  const project = projects.find((p) => p.slug === 'memeproject')
  const imagePath = '/images/projects/memeproject/'

  const sectionIds = ['overview', 'virtual museum', 'meme making', 'exhibition']
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
          <Chapter subTitle='Project' title='MemeProject + Meme-Making' />
          <Paragpraph left={null}>
            <P>
              MemeProject is an interactive website that explores meme origins, impact, and replication, and helps users
              create their own memes. This work consists of two modules: the main experience (MemeProject) and a
              companion meme-making tool (Meme-making).
            </P>
          </Paragpraph>
          <Chapter subTitle='Concept' title='Memes as Cultural Units' />
          <Paragpraph left={null}>
            <P>
              The MemeProject is a fictional company focused on collecting and preserving memes. Drawing on the term
              &quot;meme&quot; as defined by Richard Dawkins in The Selfish Gene, this project views memes as cultural
              units that, like genes, replicate and spread independently. While genes are passed down biologically,
              memes circulate socially, often conveying humor or social critique with a playful edge.
            </P>
          </Paragpraph>
        </Section>

        <Section id='virtual museum'>
          <Chapter subTitle='Main Experience' title='A Virtual Museum with Three Floors' />
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '01.jpg'} alt='memeproject01' caption='MemeProject Start' />
            <P>
              Accessible via QR code in the exhibition space, the website invites visitors to a virtual
              &quot;museum&quot; with three themed floors.
            </P>
          </Paragpraph>

          <Chapter subTitle='Floor 1' title='Origins (Kitchen-style Space)' />
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '02.jpg'} alt='memeproject02' caption='Floor 1 scenario' />
            <P>The first floor is a kitchen-style space explaining meme origins.</P>
          </Paragpraph>

          <Chapter subTitle='Floor 2' title='Latest Memes & Spread (Globe Sculpture)' />
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '03.jpg'} alt='memeproject03' caption='Floor 2 scenario' />
            <P>The second floor features the latest memes alongside a globe sculpture symbolizing meme spread.</P>
          </Paragpraph>

          <Chapter subTitle='Floor 3' title='Create & Save' />
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '04.jpg'} alt='memeproject04' caption='Floor 3 scenario 1' />
            <MotionImg src={imagePath + '05.jpg'} alt='memeproject05' caption='Floor 3 scenario 2' />
            <P>The third floor allows visitors to create and save their own memes.</P>
          </Paragpraph>

          <Paragpraph left={null}>
            <A href='https://memeproject.vercel.app/'>Visit MemeProject Website</A>
          </Paragpraph>
        </Section>

        <Section id='meme making'>
          <Chapter subTitle='Tool' title='Meme-Making' />
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '06.jpg'} alt='memeproject06' caption='Meme-Making Tool' />
            <P>Meme-Making is a tool where visitors can create and save their own memes.</P>
          </Paragpraph>
          <Paragpraph left={null}>
            <A href='https://memeproject.vercel.app/world.html'>Try Meme-Making Tool</A>
          </Paragpraph>
        </Section>

        <Section id='exhibition'>
          <Chapter subTitle='Exhibition' title='Access via QR Code' />
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '07.jpg'} alt='memeproject07' caption='Exhibition Space' />
            <P>The project’s website is accessible via QR code in the exhibition space.</P>
          </Paragpraph>
          <Chapter subTitle='Demo Video' title='Project Summary Video' />
          <Paragpraph left={null}>
            <MotionDiv>
              <div className='w-full aspect-video'>
                <iframe
                  title='vimeo-player'
                  src='https://player.vimeo.com/video/1000663988?h=b0f97e3fee&title=0&byline=0&portrait=0&badge=0&dnt=1'
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
      <div className='sticky bottom-0 flex h-[40dvh] w-full items-center justify-center bg-black'></div>
    </>
  )
}
