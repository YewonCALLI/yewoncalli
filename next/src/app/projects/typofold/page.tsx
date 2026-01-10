'use client'

import { Section, ScrollSideTab, MotionImg, MotionDiv } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div, H2, A } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../projectlist'

export default function ProjectDetailPage() {
  const project = projects.find((p) => p.slug === 'typofold')
  const imagePath = '/images/projects/typofold/'

  const sectionIds = ['research', 'design', 'development', 'output', 'workshop']
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

        <Section id='research'>
          <Chapter subTitle='Background' title='Why does digital creative work often feel intangible?' />
          <Paragpraph left={null}>
            <P>
              I run a creative coding club called TypeLab. While running it, I noticed a recurring frustration:
              code-generated work often felt fleeting—more like a temporary rendering than something creators could
              hold, share, or claim as their own. This raised a broader question about what kind of material presence
              digital work can have, and how creators might regain a sense of ownership over what they make.
            </P>
          </Paragpraph>

          <Paragpraph>
            <H3>Seoul-based creative coding club, TypeLab</H3>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full h-fit relative flex justify-center items-center'>
              <div className='w-full h-fit px-12 py-48 sm:py-40 md:py-24 lg:py-12 flex justify-center items-center'>
                <MotionImg src={imagePath + '01.jpg'} alt='Draw the Beat' className='w-full h-fit' />
              </div>
              <div className='w-[100%] h-[100%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col pointer-events-none'>
                <div className='w-full h-full flex flex-row justify-between items-start'>
                  <div className='w-full h-fit flex flex-col gap-4 bg-white px-4 py-2 rounded-lg shadow-xl'>
                    <p className='text-sm md:text-base'>
                      Is there any way to meaningfully distribute artworks made with creative coding?
                    </p>
                    <span className='text-xs md:text-sm font-medium'>Member Jang</span>
                  </div>
                  <div className='w-1/4 lg:w-full h-full'></div>
                  <div className='w-full h-fit flex flex-col gap-4 bg-white px-4 py-2 rounded-lg shadow-xl'>
                    <p className='text-sm md:text-base'>
                      More like a code file floating on a screen, a momentary rendering that I don’t truly hold or own.
                    </p>
                    <span className='text-xs md:text-sm font-medium'>Member Lee</span>
                  </div>
                </div>

                <div className='w-full h-full'></div>

                <div className='w-full h-full flex flex-row justify-between items-end'>
                  <div className='w-1/2 lg:w-[90%] h-full'></div>

                  <div className='w-full h-fit flex flex-col gap-4 bg-white px-4 py-2 rounded-lg shadow-xl'>
                    <p className='text-sm md:text-base'>
                      But honestly, I keep wondering—why do images made with creative coding sometimes feel so distant?
                    </p>
                    <span className='text-xs md:text-sm font-medium'>Member Kim</span>
                  </div>
                  <div className='w-1/2 lg:w-[90%] h-full'></div>
                </div>
              </div>
            </div>
          </Paragpraph>
          <Paragpraph>
            <P>
              We shared a recurring feeling that code art can seem distant. We started asking what kind of materiality
              code art can have, and what realistic ways there are to distribute it. I wanted to unpack the questions we
              raised together that day.
            </P>
          </Paragpraph>

          <Chapter subTitle='Desk Research' title='The cost of efficiency in digital creation' />
          <Paragpraph>
            <P>
              To explore the problem space more deeply, I conducted desk research to gather actionable insights. The
              research revealed that as digital creative tools become faster and more automated, creators experience
              increased efficiency—but at the cost of authorship and ownership. Prior studies show that automation often
              hides the visible effort behind creative work, weakening psychological ownership without actually
              improving the quality of ideas.
            </P>
            <Paragpraph>
              <div className='w-full pt-12 flex flex-row gap-12'>
                <div className='flex flex-col'>
                  <H3>1. Brainstorming feels more effective with conversational AI</H3>
                  <P>
                    Participants reported that back-and-forth interaction with AI supported ideation by helping them
                    explore ideas faster and iterate more fluidly during brainstorming.
                  </P>
                </div>
                <MotionImg src={imagePath + '02.png'} alt='Draw the Beat' className='w-full py-4 h-fit' />
              </div>
            </Paragpraph>

            <Paragpraph>
              <div className='w-full pt-12 flex flex-row gap-12'>
                <div className='flex flex-col'>
                  <H3>2. Quality of ideas remains largely unchanged</H3>
                  <P>
                    Self-reported idea quality showed little difference between no-AI and human-AI collaboration,
                    despite noticeable changes in workflow and speed.
                  </P>
                </div>
                <MotionImg src={imagePath + '03.png'} alt='Draw the Beat' className='w-full py-4 h-fit' />
              </div>
            </Paragpraph>

            <Paragpraph>
              <div className='w-full pt-12 flex flex-row gap-12'>
                <div className='flex flex-col'>
                  <H3>3. Automation reduces authorship and ownership</H3>
                  <P>
                    On a 1-7 scale measuring perceived authorship, creators reported a sharp drop in ownership as AI
                    took over more of the writing.
                  </P>
                </div>
                <MotionImg src={imagePath + '04.png'} alt='Draw the Beat' className='w-full py-4 h-fit' />
              </div>
            </Paragpraph>
          </Paragpraph>

          <Paragpraph>
            <H2>Key Insight</H2>
            <H3>
              Automation can increase efficiency and perceived usefulness without improving idea quality—often at the
              cost of creator ownership, making it essential for tools to intentionally preserve agency, effort, and
              authorship through interaction.
            </H3>
          </Paragpraph>
        </Section>

        <Section id='design'>
          <Chapter subTitle='Design Motivation' title='Why ownership grows through making' />
          <Paragpraph>
            <MotionImg src={imagePath + '05.png'} alt='Draw the Beat' className='w-full h-fit p-4 bg-[#0058AB]' />
            <MotionImg
              src={imagePath + '06.png'}
              alt='Draw the Beat'
              bgcolor='bg-[#0058AB]'
              className='w-full h-fit bg-[#0058AB] !-mt-1 px-8'
            />
            <P>
              From observing how automation improved efficiency yet weakened creators’ sense of ownership, I was
              motivated to look deeper into the IKEA Effect as a way to understand how effort contributes to value and
              authorship.
            </P>
          </Paragpraph>

          <Paragpraph>
            <H2>What creates ownership?</H2>
            <P>
              <span className='font-medium'>Effortful contribution | </span>
              Physical assembly, Visible mistakes and corrections, Time and cognitive investment
            </P>
          </Paragpraph>
          <Paragpraph>
            <H2>What often disappears in digital tools?</H2>
            <P>
              <span className='font-medium'>Effort and visibility | </span> One-click results, Hidden intermediate
              steps, Minimal personal trace
            </P>
          </Paragpraph>
          <Paragpraph>
            <H2>Design implication</H2>
            <H3>
              Ownership emerges when tools make effort, decisions, and corrections visible—suggesting that automation
              should support making, not replace it.
            </H3>
          </Paragpraph>

          <Chapter subTitle='Concept Framing' title='Translating the IKEA Effect into digital making' />
          <Paragpraph>
            <P>
              Synthesizing insights from desk research and first-hand observations within a creative coding practice, I
              reframed digital making around effort and assembly—shifting away from one-click generation toward hands-on
              construction.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H1>Key Question</H1>
            <H3>Reframing digital making through effort and assembly</H3>
            <H1>
              &quot;How might a creative coding tool preserve effort, decision-making, and authorship instead of
              collapsing them into one-click outputs?&quot;
            </H1>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '07.jpg'} alt='p5.js editor' className='w-full h-fit' />
            <P>One of the representative creative coding platform, p5.js editor</P>
          </Paragpraph>

          <Paragpraph>
            <H1>Ideation Leap</H1>
            <H3>From Generation to Assembly</H3>
          </Paragpraph>
          <Paragpraph>
            <P className='!-mt-8'>Shifting digital creation toward hands-on construction</P>
            <MotionImg src={imagePath + '08.png'} alt='' className='w-full h-fit bg-gray-100 p-4' />
            <P>
              I translated ownership-through-effort into a computational model by treating digital outputs as
              assemblable structures—drawing from physical assembly (IKEA), hands-on craft (origami), and printable
              nets.
            </P>
          </Paragpraph>

          <Chapter subTitle='Design Direction' title='Designing for ownership in TypoFold' />
          <Paragpraph>
            <P>
              Building on research findings and synthesis, TypoFold is guided by three principles: making structure
              visible, treating effort as meaningful rather than friction, and reframing automation as material that
              supports—not replaces—user participation.
            </P>
          </Paragpraph>

          <Paragpraph>
            <div className='flex flex-col md:flex-row gap-12'>
              <div className='flex flex-col'>
                <P className='border border-black w-fit px-2 py-1'>Make structure visible</P>
                <H3>TypoFold presents assemblable structures rather than finished results</H3>
                <P>
                  Instead of hiding generative logic behind final outputs, TypoFold exposes structures as nets—allowing
                  users to see, understand, and work with how forms are constructed.
                </P>
              </div>

              <MotionImg src={imagePath + '09.jpg'} alt='' className='md:max-w-[300px] h-fit' />
            </div>
          </Paragpraph>

          <Paragpraph>
            <div className='flex flex-col md:flex-row gap-12'>
              <div className='flex flex-col'>
                <P className='border border-black w-fit px-2 py-1'>Design for meaningful effort</P>
                <H3>Effort is not a barrier, but a key driver of ownership.</H3>
                <P>
                  Rather than minimizing effort entirely, TypoFold requires folding, assembling, and choosing—so users
                  actively shape the making process instead of passively receiving results.
                </P>
              </div>
              <MotionImg src={imagePath + '10.jpg'} alt='' className='md:max-w-[300px] h-fit' />
            </div>
          </Paragpraph>

          <Paragpraph>
            <div className='flex flex-col md:flex-row gap-12'>
              <div className='flex flex-col'>
                <P className='border border-black w-fit px-2 py-1'>Reframe automation as material</P>
                <H3>Automation is not about making for the user, but about enabling the user to make.</H3>
                <P>
                  Instead of completing outcomes automatically, TypoFold uses automation to generate structures that
                  users can manipulate, assemble, and transform.
                </P>
              </div>
              <MotionImg src={imagePath + '11.jpg'} alt='' className='md:max-w-[300px] h-fit' />
            </div>
          </Paragpraph>

          <Chapter subTitle='User Scenario' title='From Code to Fold' />
          <Paragpraph>
            <P>
              TypoFold supports an iterative making flow where users move between writing code, inspecting form, and
              assembling physical outputs—using each step to refine the next.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '12.png'} alt='' className='w-full h-fit' />
          </Paragpraph>
        </Section>

        <Section id='development'>
          <Chapter subTitle='System Pipeline' title='From Mesh to Net: The 3D to 2D Pipeline' />
          <Paragpraph>
            <P>
              To support the iterative making flow shown in the previous scenario, TypoFold translates code-generated 3D
              forms into foldable paper nets through a structured 3D-to-2D pipeline.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '13.png'} alt='' className='w-full h-fit' />
          </Paragpraph>

          <Chapter subTitle='Technical Challenge' title='Perceptual Faces vs. Rendering Geometry' />
          <Paragpraph>
            <P>
              While triangulation is efficient for rendering, it became a critical obstacle when building
              TypoFold—fragmenting perceived surfaces and preventing reliable generation of foldable nets for physical
              assembly.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H1>Problem</H1>
            <H3>Perceptual Surfaces Were Fragmented by Triangulation</H3>
            <P>
              When TypoFold imports 3D letterforms, each surface is automatically triangulated for rendering.While
              efficient computationally, this breaks a single perceived surface into many small faces—making it
              difficult to generate paper nets that align with how users cut, fold, and assemble physical forms.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '14.jpg'} alt='' className='w-full h-fit' />
          </Paragpraph>

          <Paragpraph>
            <H1>Solution</H1>
            <P>
              To address this, I grouped adjacent triangles that{' '}
              <span className='font-semibold'>(1) share edges and</span>{' '}
              <span className='font-semibold'>(2) have aligned surface</span> normals,allowing the system to reconstruct
              perceptually meaningful faces.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '15.png'} alt='' className='w-full h-fit' />
            <P>
              This enables the unfolding process to operate on surfaces as users perceive them—rather than on low-level
              geometric primitives.
            </P>
          </Paragpraph>

          <Chapter subTitle='Technical Challenge' title='Unfolding breaks due to internal faces' />
          <Paragpraph>
            <P>
              After reconstructing perceptual faces, a another issue emerged during net generation. When unfolding these
              faces into 2D layouts, internal surfaces were still included—causing overlaps that broke physical
              assemblability and required a more selective unfolding strategy.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H1>Problem</H1>
            <H3>Unfolding Internal Faces Breaks Physical Assembly</H3>
            <P>
              When unfolding 3D letterforms into paper nets, including all faces caused internal surfaces to overlap in
              the 2D layout. These internal faces do not contribute to physical assembly and instead produce nets that
              cannot be cut, folded, or assembled correctly.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '16.png'} alt='' className='w-full h-fit' />
          </Paragpraph>

          <Paragpraph>
            <H1>Solution</H1>
            <P>
              To address this, I ordered faces by orientation and applied a DFS-based unfolding strategy that skips
              internal faces. This preserves physical assemblability while generating valid, non-overlapping paper nets.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '17.png'} alt='' className='w-full h-fit' />
          </Paragpraph>

          <Chapter subTitle='Usability Testing' title='Evaluating Unfolding Strategies for Physical Assembly' />
          <Paragpraph>
            <P>
              After resolving structural constraints in net generation, I evaluated how different unfolding strategies
              affected real-world cutting and folding. I conducted a usability preference test to identify which
              unfolding method best supports physical assembly.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H1>Key Question</H1>
            <H1>&quot;Which unfolding strategy makes paper craft templates easier to cut, fold, and assemble?&quot;</H1>
            <P>
              Participants consistently preferred side-priority unfolding, reporting that it was easier to follow, cut,
              and assemble. Based on this feedback, TypoFold adopts side-priority unfolding as the default method.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H1>User Test</H1>
            <P>User Preference Survey by Unfolding Method</P>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full h-fit flex flex-row justify-between gap-6 items-start'>
              <MotionImg src={imagePath + '18.png'} alt='' className='w-2/3 h-fit' />
              <MotionImg src={imagePath + '19.jpg'} alt='' className='w-1/3 h-fit' />
            </div>
          </Paragpraph>
        </Section>

        <Section id='output'>
          <Chapter subTitle='Final Design' title='TypoFold 3D Typography to Paper Craft Conversion Tool' />
          <Paragpraph>
            <MotionImg src={imagePath + '21.png'} alt='' className='w-full h-fit' />
            <P>
              {/* 최종적으로 개발완료된 Typofold의 웹 인터페이스입니다. */}
              The final web interface of TypoFold, showcasing its core features and user flow.
            </P>
          </Paragpraph>

          <Paragpraph>
            <MotionImg src={imagePath + '20.jpg'} alt='' className='w-full h-fit' />
            <P>
              {/* 영어 알파벳 A부터 Z까지 typofold로 제작 및 프린트한 종이로 직접 접어 만든 결과물들입니다. */}
              Examples of paper craft outputs created by generating, printing, cutting, folding, and assembling 3D
              letterforms from A to Z using TypoFold.
            </P>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full h-fit flex flex-row justify-between gap-4 items-start'>
              <MotionImg src={imagePath + '22.jpg'} alt='' className='w-full h-fit' />

              <MotionImg src={imagePath + '23.jpg'} alt='' className='w-full h-fit' />
            </div>
            <MotionImg src={imagePath + '24.jpg'} alt='' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph>
            <A href='https://typofold.vercel.app/'>Visit TypoFold Website</A>
          </Paragpraph>
        </Section>

        <Section id='workshop'>
          <Chapter subTitle='Workshop' title='Validating Ownership Through Making' />
          <Paragpraph>
            <P>
              After the solution was developed, I ran a hands-on workshop during HCI Korea 2025 to evaluate how
              TypoFold’s design translated into real user behavior. The workshop focused on whether engaging in the full
              process—generating, assembling, and finishing a single letter—would reinforce users’ sense of ownership
              through effort and physical making.
            </P>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full h-fit flex flex-row justify-between gap-4 items-start'>
              <MotionImg src={imagePath + '25.jpg'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '26.jpg'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '27.jpg'} alt='' className='w-full h-fit' />
            </div>
          </Paragpraph>

          <Chapter subTitle='Workshop Evaluation' title='Ownership Emerges Through Making' />
          <Paragpraph>
            <P>
              Workshop results show that hands-on assembly increased both enjoyment and perceived ownership, supporting
              TypoFold’s goal of reinforcing authorship through effort.
            </P>
            <p>*18 participants responded to the post-workshop survey</p>
          </Paragpraph>

          <Paragpraph>
            <div className='w-full h-fit flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4'>
              <div className='space-y-4'>
                <H2>Overall Experience</H2>
                <MotionImg src={imagePath + '28.png'} alt='' className='w-[80%] md:w-full h-fit' />
              </div>
              <div className='space-y-8 md:space-y-4'>
                <div className='space-y-4'>
                  <H2>Sense of Ownership & Materialityrall Experience</H2>
                  <MotionImg src={imagePath + '29.png'} alt='' className='w-[80%] md:w-full h-fit' />
                </div>

                <div className='space-y-4'>
                  <H2>Potential as a Product</H2>
                  <MotionImg src={imagePath + '30.png'} alt='' className='w-[80%] md:w-full h-fit' />
                </div>

                <div className='space-y-4'>
                  <H2>Tool Usability</H2>
                  <MotionImg src={imagePath + '31.png'} alt='' className='w-[80%] md:w-full h-fit' />
                </div>
              </div>
            </div>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '32.png'} alt='' className='w-full h-fit' />
          </Paragpraph>

          <Paragpraph>
            <P>
              In the next phase, I extended TypoFold beyond letterforms to test how the unfolding pipeline performs
              across more complex 3D geometries.
            </P>
            <P>
              By applying the system to varied shapes with different topology and surface structures, I evaluated
              whether the workflow could generalize beyond typography while maintaining physical assemblability and
              visual coherence.
            </P>
            <P>
              This shift reframes TypoFold from a typography-specific prototype into a broader method for translating
              digital 3D forms into foldable, physical structures—while surfacing new challenges around face
              segmentation, overlap handling, and consistency at scale.
            </P>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full h-fit flex flex-row justify-between gap-4 items-start'>
              <MotionImg src={imagePath + '33.jpg'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '34.jpg'} alt='' className='w-full h-fit' />
            </div>
          </Paragpraph>
        </Section>
      </ParllaxFrame>
      <div className='w-full h-[40dvh] bg-black sticky bottom-0 flex justify-center items-center'></div>
    </>
  )
}
