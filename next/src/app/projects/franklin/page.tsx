'use client'

import { Section, ScrollSideTab, MotionImg, MotionDiv } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../projectlist'

export default function ProjectDetailPage() {
  const project = projects.find((p) => p.slug === 'franklin')
  const imagePath = '/images/projects/franklin/'

  const sectionIds = ['overview', 'research', 'process', 'outcome']
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
          <Chapter subTitle='Project' title='Franklin' />
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '01.jpg'} alt='Franklin' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph left={null}>
            <P>
              A gender-neutral Korean fairy tale generator using KoGPT2, addressing social biases in children’s
              literature.
            </P>
            <p className='italic text-sm md:text-base text-neutral-500'>
              HCI Korea Creative Awards (Excellence Awards) - 2023 / Funded by Smilegate Group
              <br />
              Jiin An*, Saetbyeol Leeyouk*, Yewon Jang*, & Dasaem Jeong. (2023). Construction of Debiased Korean AI
              Fairytale Generator, Journal of Digital Contents Society
            </p>
          </Paragpraph>

          <Chapter subTitle='Brief' title='What it is' />
          <Paragpraph left={null}>
            <P>
              Developed ‘Franklin,’ an AI storyteller built on language models trained to self-diagnose bias. Franklin
              reimagines fairy tales through an equitable lens and engages users in collaborative storytelling,
              promoting empathetic and non-hierarchical relationships between humans and AI.
            </P>
          </Paragpraph>
        </Section>

        <Section id='research'>
          <Chapter subTitle='Background' title='Why Franklin' />
          <Paragpraph left={null}>
            <P>
              Despite the growing diversity of fairy tale formats, Korean fairy tales still carry biased clichés and
              stereotypes.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <div className='flex flex-row gap-6 justify-between items-start'>
              <MotionImg src={imagePath + '02.png'} alt='Franklin' className='w-2/5 md:w-1/2 h-auto aspect-square' />
              <Div className='w-full flex flex-col gap-4 bg-neutral-100 rounded-lg px-4 py-2 justify-start items-start relative'>
                <p className='text-sm md:text-base'>
                  &quot;Upon hearing that sailors were searching for a maiden to offer, Sim Cheong selflessly
                  volunteered to sell herself in exchange for three hundred sacks of rice as an offering.&quot;
                </p>
                <p className='italic text-sm md:text-base text-neutral-500'>- The Tale of Shim Chong (효녀 심청) -</p>
                {/* triangle for text bubble */}
                <svg
                  className='w-12 h-12 absolute -bottom-5 -z-10 left-3'
                  viewBox='0 0 100 100'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <polygon points='0,0 100,0 0,100' fill='#f3f4f6' />
                </svg>
              </Div>
            </div>
          </Paragpraph>
          <Chapter subTitle='Goals' title='Technical Goals' />
          <Paragpraph>
            <P className='px-4 py-2 bg-gray-100 rounded-lg'>
              <strong>Enable</strong> two-way interaction between users and AI language models through an interactive
              web interface, moving beyond one-way communication.
            </P>
          </Paragpraph>
          <Paragpraph>
            <P className='px-4 py-2 bg-gray-100 rounded-lg'>
              <strong>Prevent</strong> children from internalizing or relearning societal prejudices through story
              content.
            </P>
          </Paragpraph>
          <Paragpraph>
            <P className='px-4 py-2 bg-gray-100 rounded-lg'>
              <strong>Provide</strong> narratives that encourage self-expression rather than conforming to gender
              stereotypes (e.g., &quot;feminine&quot; or &quot;masculine&quot; norms).
            </P>
          </Paragpraph>
          <Paragpraph>
            <P className='px-4 py-2 bg-gray-100 rounded-lg'>
              <strong>Address</strong> the issue of language generation models inheriting hate speech and bias from
              training datasets.
            </P>
          </Paragpraph>
        </Section>

        <Section id='process'>
          <Chapter subTitle='Dataset' title='Unsmile Dataset (997 tales)' />
          <Paragpraph>
            <P>Copyright-free Korean Fairy Tales / Used a total 997 fairy tales as a dataset.</P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '03.png'} alt='Franklin' className='w-full h-fit' />
          </Paragpraph>
          <Chapter subTitle='Debiasing' title='Hard Debiasing in Korean Embeddings' />
          <Paragpraph>
            <P>
              <span className='text-blue-500'>Direct gender words</span> are explicit terms that directly refer to a
              person&apos;s gender (ex. 여자-남자, 할머니, 할아버지)
            </P>
            <P>
              <span className='text-red-500'>Indirect gender words</span> are terms that implicitly suggest or are
              associated with a specific gender through cultural or social contexts (ex. 부엌, 미술)
            </P>
          </Paragpraph>
          <Paragpraph>
            <H3>1. Define Gender Axis</H3>
            <P>
              Define the gender axis as the vector difference between{' '}
              <span className='text-blue-500'>direct gender</span> word pairs.
            </P>
            <MotionImg src={imagePath + '04.png'} alt='Franklin' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph>
            <H3>2. Neutralizing the words</H3>
            <P>
              Project and remove the gender axis component from{' '}
              <span className='text-red-500'>indirect gender-related words</span> to neutralize bias.
            </P>
            <MotionImg src={imagePath + '05.png'} alt='Franklin' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph>
            <H3>3. Before Hard Debiasing</H3>
            <P>
              Observe that <span className='text-blue-500'>direct gender</span> word pairs are positioned at unequal
              distances from the gender axis.
            </P>
            <MotionImg src={imagePath + '06.png'} alt='Franklin' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph>
            <H3>4. After Hard Debiasing</H3>
            <P>
              Adjust these <span className='text-blue-500'>direct pairs</span> so that they are equidistant from the
              gender axis, preserving semantic balance.
            </P>
            <MotionImg src={imagePath + '07.png'} alt='Franklin' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph>
            <p className='text-sm md:text-base italic text-neutral-500'>
              T. Bolukbasi 외 “Man is to Computer Programmer as Woman is to Homemaker? Debiasing Word Embeddings,” in
              Proceedings of the 30th International Conference on Neural Information Processing Systems (NIPS’16),
              Barcelona, Spain, pp. 4356-4364, December 2016.에서 언급된 Debiasing 방법론을 한국어 임베딩에
              적용하였습니다.
            </p>
          </Paragpraph>

          <Chapter subTitle='Web Flow' title='Collaborative Writing Interface (8 rounds)' />
          <Paragpraph left={null}>
            <P>
              An entity extractor was used to identify places, settings, characters, and keywords from the original
              fairy tales.
            </P>
            <MotionImg src={imagePath + '08.png'} alt='Franklin' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph left={null}>
            <P>
              Based on this, I developed a website where users can collaboratively write fairy tales using the Franklin
              model.
            </P>
            <MotionImg src={imagePath + '09.png'} alt='Franklin' className='w-full h-fit' />
            <P>
              Through an interactive writing process, users co-create their stories with Franklin. The collaboration
              begins when users input key narrative elements: the story’s title, the protagonist’s name, the setting,
              three descriptive keywords, and the opening sentence. Franklin then generates the next sentence, which
              users can review, accept, or revise. This iterative exchange continues for eight rounds, allowing users to
              shape the narrative while leveraging Franklin’s generative capabilities to support creative storytelling.
            </P>
          </Paragpraph>
        </Section>

        <Section id='outcome'>
          <Chapter subTitle='Example' title='Human-written vs Franklin-written' />
          <Paragpraph left={null}>
            <H3>The Prince Who Wanted to Wear Heels</H3>
            <MotionImg src={imagePath + '10.jpg'} alt='Franklin' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph
            left={
              <>
                <P>◼︎ Human-written</P>
                <P className='text-blue-700'>◼︎ Franklin-written</P>
              </>
            }
          >
            <P>
              Once upon a time, there was a prince named &apos;Louis&apos; who wanted to wear heels. However,
              Louis&apos;s parents took away his heels, saying that heels were for girls to wear. One day, Louis
              followed to Princess&apos;s party.{' '}
              <span className='text-blue-700'>
                There, Louis got to see beautiful red heels. Looking at the red heels and watching the dancing and
                celebrations, Louis would murmur while crying or smiling, &quot;Even if someone tries to steal
                them!&quot;
              </span>{' '}
              When Louis wore the red heels,{' '}
              <span className='text-blue-700'>he felt confident that he could dance well.</span>
              <br />
              <br />
              As tears fell, he smiled. &quot;I won&apos;t be able to dance again, will I?&quot;
              <br />
              <br />
              <span className='text-blue-700'>So the princess said, &quot;You will come back...&quot;</span>
              <br />
              <br />
              <span className='text-blue-700'>
                The princess wanted to make sure Louis could dance, and she gave Louis the red heels to wear.
              </span>
            </P>
          </Paragpraph>

          <Chapter subTitle='Showcase' title='Public Engagement' />
          <Paragpraph left={null}>
            <P>
              ‘Franklin’ was showcased at the OnDream Society pop-up exhibition and the 2023 HCI Re:Union, where it
              engaged with the public.
            </P>
            <MotionImg src={imagePath + '11.jpg'} alt='Franklin' className='w-full h-fit' />
          </Paragpraph>
        </Section>
      </ParllaxFrame>
      <div className='w-full h-[40dvh] bg-black sticky bottom-0 flex justify-center items-center'></div>
    </>
  )
}
