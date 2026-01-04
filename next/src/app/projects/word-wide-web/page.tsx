'use client'

import { Section, ScrollSideTab, MotionImg, MotionDiv } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div, A } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../projectlist'

export default function ProjectDetailPage() {
  const project = projects.find((p) => p.slug === 'word-wide-web')
  const imagePath = '/images/projects/word-wide-web/'

  const sectionIds = ['overview', 'dataset', 'tool', 'credits']
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
          <Chapter subTitle='Project' title='Word Wide Web' />
          <Paragpraph left={null}>
            <P>
              Word Wide Web is a word-weaving platform that creates poems through connected synonyms. Inspired by the
              Korean nursery rhyme “Red Like an Apple,” it helps writers create chain poetry by connecting words through
              semantic relationships.
            </P>
            <MotionImg src={imagePath + '01.gif'} alt='word-wide-web01' caption='Interface for weaving chain poetry' />
          </Paragpraph>
        </Section>

        <Section id='dataset'>
          <Chapter subTitle='Background' title='SFPC: Human-Scale Natural Language Processing' />
          <Paragpraph left={null}>
            <P>
              During SFPC&apos;s Human-Scale Natural Language Processing class, our class collaborated to label words
              using a system that breaks down text into 16 parts of speech and 6 criteria pairs (like dog-cat,
              concrete-intangible, utilitarian-romantic). Inspired by this experience, I created a platform that helps
              writers find similar words based on these semantic measurements.
            </P>
          </Paragpraph>
        </Section>

        <Section id='tool'>
          <Chapter subTitle='How it works' title='Write by Connecting Words' />
          <Paragpraph left={null}>
            <P>1. Enter your starting word.</P>
            <P>2. Browse through suggested related words provided by Word Wide Web.</P>
            <P>
              3. You can add your own words if you don&apos;t find what you&apos;re looking for (Note: some words may
              not exist in our database).
            </P>
            <P>4. Continue connecting words to craft your poem.</P>
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg
              src={imagePath + '02.gif'}
              alt='word-wide-web02'
              caption='Word suggestion and addition process'
            />
            <MotionImg src={imagePath + '03.gif'} alt='word-wide-web03' caption='Weaving words into poetry' />
            <A href='https://solarword.vercel.app/'>Visit Word Wide Web Website</A>
          </Paragpraph>

          <Chapter subTitle='What it enables' title='Unexpected Connections' />
          <Paragpraph left={null}>
            <P>
              Through this process, discover unexpected linguistic connections and create poetic expressions that
              challenge our perception of language relationships.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg
              src={imagePath + '04.gif'}
              alt='word-wide-web04'
              caption='Example of unexpected word connections generated'
            />
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg
              src={imagePath + '05.png'}
              alt='word-wide-web05'
              caption='Example of unexpected word connections generated'
            />
          </Paragpraph>
        </Section>

        <Section id='credits'>
          <Chapter subTitle='Data contribution' title='Text data contribution, word scoring' />
          <Paragpraph left={null}>
            <P>
              The data and word scoring were collaboratively created by participants, each developing individual
              projects based on this shared dataset.
            </P>
            <H3>
              Ilona Brand, Lillian Hua, Jean Kim, Maya Williams, kathy wu, Joses Ho, Maya Detwiller, Jireh Deng, Ellen
              Fritz, Alice Yuan Zhang, Yewon Jang, Charis Poon, Kimberly Lyle, Hannah Jenkins, Cecilia Knaub, Gabriella
              Chronis, Juliana Gomezr
            </H3>
            <MotionImg
              src={imagePath + '06.gif'}
              alt='word-wide-web06'
              caption='Weaving chain poetry with contributed dataset'
            />
          </Paragpraph>
        </Section>
      </ParllaxFrame>
      <div className='sticky bottom-0 flex h-[40dvh] w-full items-center justify-center bg-black'></div>
    </>
  )
}
