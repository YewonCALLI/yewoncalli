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
          image: '/images/projects/xr-science-museum/cover.jpg',
          title: 'XR Science \nMuseum',
          description: 'A 3D simulation-based learning experience for MiraeN, Korea’s leading textbook publisher',
          subTitle: 'January 1, 2024',
        }}
      >
        <ScrollSideTab activeSection={activeSection} sectionIds={sectionIds} />

        <Section id='research'>
          {/* Background */}
          <Chapter subTitle='Background' title='Voices Around the Adoption of Digital Textbooks' />
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

          {/* Teacher Journey */}
          <Chapter subTitle='Teacher Journey' title='The Hidden Work Behind Digital Textbooks' />
          <Paragpraph left={null}>
            <P>
              While digital textbooks increase interactivity, they also introduce additional, often invisible
              preparation and management work for teachers.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>Digital textbooks add interactivity, but they also add invisible prep work for teachers.</H3>
            <Div></Div>
          </Paragpraph>

          {/* Student Journey */}
          <Chapter subTitle='Student Journey' title='What Gets Reduced in Digital Textbooks' />
          <Paragpraph left={null}>
            <P>
              Digital textbooks streamline learning flows, but often reduce peer interaction and replace qualitative
              teacher feedback with automated scores.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>
              Digital textbooks reduced peer interaction and replaced qualitative teacher feedback with automated quiz
              scores.
            </H3>
            <Div></Div>
          </Paragpraph>

          {/* Problem Framing */}
          <Chapter subTitle='Problem Framing' title='What Gets Reduced in Digital Textbooks' />
          <Paragpraph left={null}>
            <P>
              Digital textbooks streamline learning flows, but often reduce peer interaction and replace qualitative
              teacher feedback with automated scores.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>01 | Problem Definition</H3>
            <Div></Div>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>02 | Research Question</H3>
            <Div></Div>
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

          {/* Design Direction */}
          <Chapter subTitle='Design Direction' title='Three Design Directions for the XR Museum' />
          <Paragpraph left={null}>
            <P>
              By synthesizing teacher and student pain points with the MVP scope, I defined three design directions that
              address the core barriers in digital science classes.
            </P>
          </Paragpraph>
          <Paragpraph
            left={
              <>
                <H3>Inquiry</H3>
                <P>Shifts digital science classes from watching explanations to running manipulable experiments.</P>
              </>
            }
          >
            <Div></Div>
          </Paragpraph>
          <Paragpraph
            left={
              <>
                <H3>Accessibility</H3>
                <P>Makes dense science content usable for diverse literacy levels and device conditions.</P>
              </>
            }
          >
            <Div></Div>
          </Paragpraph>
          <Paragpraph
            left={
              <>
                <H3>Guidance</H3>
                <P>Reduces teacher setup burden by building the class flow into the interface.</P>
              </>
            }
          >
            <Div></Div>
          </Paragpraph>

          {/* To-Be Scenario */}
          <Chapter subTitle='To-Be Scenario' title='Teaching with the XR Science Museum' />
          <Paragpraph left={null}>
            <P>
              With built-in guides and measurement tools, teachers shift their focus from troubleshooting technology to
              leading scientific inquiry.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>Teacher Flow</H3>
            <P>
              Teachers shift from troubleshooting devices to facilitating inquiry by using step-by-step guides and
              built-in measurement tools.
            </P>
          </Paragpraph>
          <Paragpraph left={<H3>#1 Select the unit</H3>}>
            <Div></Div>
          </Paragpraph>
          <Paragpraph left={<H3>#2 Pose inquiry question</H3>}>
            <Div></Div>
          </Paragpraph>
          <Paragpraph left={<H3>#3 Guide students through steps</H3>}>
            <Div></Div>
          </Paragpraph>
          <Paragpraph left={<H3>#4 Facilitate discussion & reflection</H3>}>
            <Div></Div>
          </Paragpraph>

          {/* To-Be Scenario */}
          <Chapter subTitle='To-Be Scenario' title='What Learning Looks Like with XR' />
          <Paragpraph left={null}>
            <P>Students move through a hands-on flow of exploration, observation, and hypothesis testing.</P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>Student Flow</H3>
            <P>
              Students move from reading and clicking to manipulating parameters, observing change, and testing
              hypotheses.
            </P>
          </Paragpraph>
          <Paragpraph left={<H3>#1 Enter XR Scene</H3>}>
            <Div></Div>
          </Paragpraph>
          <Paragpraph left={<H3>#2 Manipulate 3D Model</H3>}>
            <Div></Div>
          </Paragpraph>
          <Paragpraph left={<H3>#3 Observe & Record</H3>}>
            <Div></Div>
          </Paragpraph>
          <Paragpraph left={<H3>#4 Reset and Test a New Hypothesis</H3>}>
            <Div></Div>
          </Paragpraph>

          {/* Technical Implementation */}
          <Chapter subTitle='Technical Implementation' title='From Experiment Narrative to Web Simulation' />
          <Paragpraph left={null}>
            <P>
              3D models created in Blender were imported into the web with Three.js, where real-time simulations were
              implemented using GLSL shaders and native Three.js features.
            </P>
          </Paragpraph>
          <Paragpraph left={<H3>Sketching</H3>}>
            <Div></Div>
          </Paragpraph>
          <Paragpraph left={<H3>3D Modeling</H3>}>
            <Div></Div>
          </Paragpraph>
          <Paragpraph left={<H3>Computer Graphics</H3>}>
            <Div></Div>
          </Paragpraph>
        </Section>

        <Section id='development'>
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
      <div className='w-full h-[40dvh] bg-black sticky bottom-0 flex justify-center items-center'></div>
    </>
  )
}
