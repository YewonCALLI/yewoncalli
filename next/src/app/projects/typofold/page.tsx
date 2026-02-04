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
          <Chapter subTitle='Background' title="Why don't digital creations feel like my own?" />
          <Paragpraph left={null}>
            <P>
              As digital creation tools become faster and more automated, creative efficiency increases, but we lose
              authorship consciousness and sense of ownership. According to prior research, automation tends to hide
              visible effort and weaken psychological ownership without improving idea quality.
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
                      Graphics made with digital tools feel like code files floating on a screen. They're just
                      temporarily rendered images, and they don't really feel like mine.
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
                      All I did was write a few prompts, so I wondered if I could even call this my work.{' '}
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

          <Chapter subTitle='Desk Research' title='How AI Automation Affects Creative Ownership and Idea Quality' />
          <Paragpraph>
            <P>
              To explore the problem space more deeply, I conducted desk research to gather actionable insights. The
              research revealed that as digital creative tools become faster and more automated, creators experience
              increased efficiency—but at the cost of authorship and ownership. Prior studies show that automation often
              hides the visible effort behind creative work, weakening psychological ownership without actually
              improving the quality of ideas.
            </P>
            <Paragpraph>
              <div className='w-full pt-12 flex flex-col md:flex-row gap-12'>
                <div className='flex flex-col'>
                  <H3>1. Brainstorming feels more effective with conversational AI</H3>
                  <P>
                    Participants were able to explore ideas more quickly through iterative conversations with AI and
                    responded that it was more helpful in the brainstorming process.
                  </P>
                </div>
                <MotionImg src={imagePath + '02.png'} alt='Draw the Beat' className='w-full py-4 h-fit' />
              </div>
            </Paragpraph>

            <Paragpraph>
              <div className='w-full pt-12 flex flex-col md:flex-row gap-12'>
                <div className='flex flex-col'>
                  <H3>2. Idea quality did not significantly differ</H3>
                  <P>
                    Creators reported that there was no significant difference in idea quality between conditions with
                    and without AI use.
                  </P>
                </div>
                <MotionImg src={imagePath + '03.png'} alt='Draw the Beat' className='w-full py-4 h-fit' />
              </div>
            </Paragpraph>

            <Paragpraph>
              <div className='w-full pt-12 flex flex-col md:flex-row gap-12'>
                <div className='flex flex-col'>
                  <H3>3. Automation reduces authorship and ownership</H3>
                  <P>
                    When measuring sense of ownership over creations on a 1-7 scale, as AI involvement increased, the
                    sense of ownership felt by creators dropped sharply.
                  </P>
                </div>
                <MotionImg src={imagePath + '04.png'} alt='Draw the Beat' className='w-full py-4 h-fit' />
              </div>
            </Paragpraph>
          </Paragpraph>

          <Paragpraph>
            <H2>Key Insight</H2>
            <H3>
              Automated tools increase efficiency and convenience, but they don't elevate the quality of ideas. Rather,
              creators often lose their sense of ownership in this process. Therefore, when designing automated tools,
              it's important to design interactions that allow creators to actively engage and perceive their own
              effort.
            </H3>
          </Paragpraph>
        </Section>

        <Section id='design'>
          <Chapter subTitle='Design Motivation' title='Where does the sense of ownership over creations come from?' />
          <Paragpraph>
            <MotionImg src={imagePath + '05.png'} alt='Draw the Beat' className='w-full h-fit p-4 bg-[#0058AB]' />
            <MotionImg
              src={imagePath + '06.png'}
              alt='Draw the Beat'
              bgcolor='bg-[#0058AB]'
              className='w-full h-fit bg-[#0058AB] !-mt-1 px-8'
            />
            <P>
              According to the IKEA effect, people assign higher value to outcomes they've personally invested effort in
              and feel a stronger sense of ownership. Noting that automation increases efficiency but weakens ownership,
              I sought to apply the IKEA effect to creative coding tools.
            </P>
          </Paragpraph>

          <Paragpraph>
            <H2>What creates ownership?</H2>
            <P>
              <span className='font-medium'>Effort and time | </span> People value creations more when they've invested
              significant effort and time into making them.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H2>Design implication</H2>
            <H3>
              Sense of ownership emerges when the process of effort, judgment, and revision is visible. This suggests
              that automation should not replace the act of making, but rather assist in the process of making.
            </H3>
          </Paragpraph>

          <Chapter subTitle='Concept Framing' title='Transforming digital creation into a hands-on experience' />
          <Paragpraph>
            <P>
              Based on insights from desk research and direct observation of creative coding classes, I reframed my
              approach to digital making. Instead of one-click automatic generation, I shifted toward a
              construction-based approach where students put in effort and assemble things themselves.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H1>Key Question</H1>
            <H3>Reframing digital making through effort and assembly</H3>
            <H1>
              &quot;How can we provide the convenience of automation while not losing the sense of having made it
              yourself?&quot;
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
              Inspired by the IKEA effect, origami, and paper craft templates, I designed a tool that allows users to
              create digital outputs through hands-on experience.
            </P>
          </Paragpraph>

          <Chapter subTitle='Design Direction' title='Designing for ownership in TypoFold' />
          <Paragpraph>
            <P>Based on the research, I established three design principles for TypoFold.</P>
          </Paragpraph>

          <Paragpraph>
            <div className='flex flex-col md:flex-row gap-12'>
              <div className='flex flex-col'>
                <P className='border border-black w-fit px-2 py-1'>Make structure visible</P>
                <H3>Provide paper craft templates that can be assembled by hand, instead of finished products.</H3>
                <P>
                  Rather than hiding the generation process, I made it so users can directly see and manipulate how
                  forms are created.
                </P>
              </div>

              <MotionImg src={imagePath + '09.jpg'} alt='' className='md:max-w-[300px] h-fit' />
            </div>
          </Paragpraph>

          <Paragpraph>
            <div className='flex flex-col md:flex-row gap-12'>
              <div className='flex flex-col'>
                <P className='border border-black w-fit px-2 py-1'>Design for meaningful effort</P>
                <H3>Sense of ownership comes not from the result, but from the process of making.</H3>
                <P>
                  I designed an experience where users make things themselves through folding, assembling, and choosing,
                  rather than simply receiving the final product.
                </P>
              </div>
              <MotionImg src={imagePath + '10.jpg'} alt='' className='md:max-w-[300px] h-fit' />
            </div>
          </Paragpraph>

          <Paragpraph>
            <div className='flex flex-col md:flex-row gap-12'>
              <div className='flex flex-col'>
                <P className='border border-black w-fit px-2 py-1'>Supportive</P>
                <H3>Automation doesn't mean making it for you; it means enabling you to make it yourself.</H3>
                <P>Automation is used to generate structures that users can transform, combine, and modify.</P>
              </div>
              <MotionImg src={imagePath + '11.jpg'} alt='' className='md:max-w-[300px] h-fit' />
            </div>
          </Paragpraph>

          <Chapter
            subTitle='User Scenario'
            title='Creating a pipeline to generate paper craft templates from 3D models'
          />
          <Paragpraph>
            <P>
              I chose the alphabet as the first application case. Letters can form various words, and each one functions
              as a module. Additionally, they can accommodate various languages and typefaces, offering a wide range of
              variations. Based on this first case, I plan to expand to 3D models beyond the alphabet in the future.
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
              After reconstructing the perceptual faces, another problem came up during net generation. When unfolding
              them into 2D layouts, internal surfaces were still included, which caused overlaps and made physical
              assembly impossible. This meant I needed a more selective approach to unfolding.
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
              To solve this, I sorted the faces by their orientation and used a DFS algorithm that skips internal faces.
              This ensures the generated paper nets don't overlap and can actually be assembled by hand.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '17.png'} alt='' className='w-full h-fit' />
          </Paragpraph>

          <Chapter
            subTitle='Usability Testing'
            title='Finding a paper craft template method suitable for actual assembly'
          />
          <Paragpraph>
            <P>
              After solving structural issues in template generation, I examined how the cutting and folding process
              differs depending on the unfolding method. I conducted a user preference test to determine which method is
              most suitable for assembly.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H1>Key Question</H1>
            <H1>&quot;Which unfolding method is easiest to cut, fold, and assemble?&quot;</H1>
            <P>
              Participants preferred the side-priority unfolding method and responded that it was easier to cut and
              assemble. Based on these results, TypoFold adopted side-priority unfolding as the default method.
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
          <Chapter subTitle='Final Design' title='TypoFold, a design tool that converts 3D models into paper crafts' />
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
            <MotionImg src={imagePath + '22.jpg'} alt='' className='w-full h-fit' />
            <MotionImg src={imagePath + '23.jpg'} alt='' className='w-full h-fit' />
            <MotionImg src={imagePath + 'Untitled-118.jpeg'} alt='' className='w-full h-fit' />
            <MotionImg src={imagePath + 'cover.jpg'} alt='' className='w-full h-fit' />
            <MotionImg src={imagePath + '24.jpg'} alt='' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph>
            <A href='https://typofold.vercel.app/'>Visit TypoFold Website</A>
          </Paragpraph>
        </Section>

        <Section id='workshop'>
          <Chapter subTitle='Workshop' title='Cutting and folding by hand creates attachment to the result' />
          <Paragpraph>
            <P>
              TypoFold met users through the HCI Korea 2025 workshop. Participants learned simple p5.js syntax to create
              their own patterns, selected their desired alphabet, and made keychains.
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
              Through a subsequent survey, I confirmed that the process of assembling by hand increased both enjoyment
              and sense of ownership.
            </P>
            <p>*18 participants responded to the post-workshop survey</p>
          </Paragpraph>

          <Paragpraph>
            <div className='w-full h-fit flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4'>
              <div className='space-y-4'>
                <MotionImg src={imagePath + '28.png'} alt='' className='w-[50%] md:w-full h-fit' />
              </div>
            </div>
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
              This shift turns TypoFold from a typography-focused prototype into a broader method for converting digital
              3D models into foldable physical structures. At the same time, it revealed new challenges around face
              segmentation, overlap handling, and maintaining consistency at scale.
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
