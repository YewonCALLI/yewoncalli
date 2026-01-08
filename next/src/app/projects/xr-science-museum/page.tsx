'use client'

import { Section, ScrollSideTab, MotionImg } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div, H2 } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../projectlist'

export default function ProjectDetailPage() {
  const project = projects.find((p) => p.slug === 'xr-science-museum')
  const imagePath = '/images/projects/xr-science-museum/'

  const sectionIds = ['research', 'development', 'output', 'reflection']
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
          {/* Background */}
          <Chapter subTitle='Background' title='Voices Around the Adoption of Digital Textbooks' />
          <Paragpraph left={null}>
            <P>
              As digital textbooks become more common in classrooms, teachers raise concerns about learning
              effectiveness, literacy development, and the limits of screen-based instruction. Survey results and
              interview excerpts below reflect how educators experience these changes in practice.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H2>01 | While Digital Device Usage Grows, Literacy Skills Continue to Decline</H2>
          </Paragpraph>
          <Paragpraph left={null}>
            <P>
              What are the anticipated negative impacts of adopting AI digital textbooks? <br />
              (Multiple responses allowed)
            </P>
            <MotionImg src={imagePath + '01.png'} alt='' className='w-full h-fit mt-4' />
          </Paragpraph>

          <Paragpraph left={null}>
            <H2>02 | Still Screen-Bound Learning</H2>
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '02.png'} alt='' className='w-full h-fit' />
            <H3>Digital Devices ≠ Digital Learning</H3>
            <P>Infinite potential in learning experience confined to a flat screen.</P>
          </Paragpraph>

          {/* Teacher Journey */}
          <Chapter subTitle='Teacher Journey' title='The Hidden Work Behind Digital Textbooks' />
          <Paragpraph>
            <P>
              Following initial research and classroom observations, I mapped a workflow to examine how the introduction
              of digital textbooks changes how teachers prepare, deliver, and assess lessons compared to traditional
              classroom teaching.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H3>Digital textbooks add interactivity, but they also add invisible prep work for teachers.</H3>
            <P>Traditional Textbooks</P>
            <MotionImg src={imagePath + '03.png'} alt='' className='w-full h-fit !mt-2' />
            <P>Digital Textbooks</P>
            <MotionImg src={imagePath + '04.png'} alt='' className='w-full h-fit !mt-2' />
          </Paragpraph>

          {/* Student Journey */}
          <Chapter subTitle='Student Journey' title='What Gets Reduced in Digital Textbooks' />
          <Paragpraph>
            <P>
              Looking at the student side of the same teaching flow highlights how learning experiences shift when
              digital textbooks are introduced—particularly in interaction, feedback, and collaboration compared to
              traditional classrooms.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H3>
              Digital textbooks reduced peer interaction and replaced qualitative teacher feedback with automated quiz
              scores.
            </H3>
            <P>Traditional Textbooks</P>
            <MotionImg src={imagePath + '05.png'} alt='' className='w-full h-fit !mt-2' />
            <P>Digital Textbooks</P>
            <MotionImg src={imagePath + '06.png'} alt='' className='w-full h-fit !mt-2' />
          </Paragpraph>

          {/* Problem Framing */}
          <Chapter subTitle='Problem Framing' title='What Gets Reduced in Digital Textbooks' />
          <Paragpraph left={null}>
            <P>
              As digital textbooks become more common in science classrooms, efficiency gains often come with
              tradeoffs—reducing peer interaction, limiting inquiry time, and shifting learning toward answer-checking
              rather than exploration.
            </P>
          </Paragpraph>

          <Paragpraph>
            <H2>01 | Problem Definition</H2>

            <MotionImg src={imagePath + '07.png'} alt='' className='w-full h-fit' />
          </Paragpraph>

          <Paragpraph>
            <H2>02 | Research Question</H2>
            <H1>
              &quot;What interaction design principles lower teacher-student usage barriers while shifting digital
              science classes from answer-checking to inquiry and experimentation?&quot;
            </H1>
          </Paragpraph>
        </Section>

        <Section id='development'>
          {/* MVP List */}
          <Chapter subTitle='MVP List' title='What We’re Building' />
          <Paragpraph>
            <P>
              Based on the identified classroom constraints and learning gaps, I defined an MVP to sort and prioritize
              features from most to least critical—focusing on those that directly support inquiry-based science
              learning while remaining feasible for real classroom use.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '08.png'} alt='' className='w-full h-fit' />
          </Paragpraph>

          {/* Design Direction */}
          <Chapter subTitle='Design Direction' title='Three Design Directions for the XR Museum' />
          <Paragpraph>
            <P>
              Synthesizing teacher and student pain points with the defined MVP scope led to three design directions
              that guide how XR should support inquiry, accessibility, and classroom flow.
            </P>
          </Paragpraph>

          <Paragpraph>
            <div className='w-full grid grid-cols-[2fr_1fr] grid-rows-[auto_auto_auto] gap-4'>
              <P className='border border-black px-2 py-1 w-fit h-fit'>Inquiry</P>
              <div className='w-full min-w-0 h-full row-span-3 p-2 md:p-4 lg:p-8 flex justify-center items-center'>
                <MotionImg src={imagePath + '09.png'} alt='' className='w-full !h-auto aspect-square' />
              </div>
              <H3 className='min-w-0'>
                Shifts digital science classes from watching explanations to running manipulable experiments.
              </H3>
              <P className='min-w-0'>
                360º viewing, zoom, pause/rewind
                <br />
                Visualization of otherwise invisible phenomena
                <br />
                Incorporates gamification elements
              </P>
            </div>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full grid grid-cols-[2fr_1fr] grid-rows-[auto_auto_auto] gap-4'>
              <P className='border border-black px-2 py-1 w-fit h-fit'>Accessibility</P>
              <div className='w-full min-w-0 h-full row-span-3 p-2 md:p-4 lg:p-8 flex justify-center items-center'>
                <MotionImg src={imagePath + '10.png'} alt='' className='w-full !h-auto aspect-square' />
              </div>
              <H3 className='min-w-0'>
                Makes dense science content usable for diverse literacy levels and device conditions.
              </H3>
              <P className='min-w-0'>
                High-contrast design, 20pt+ typography, clear non-transparent buttons <br />
                Audio narration with interruption handling
              </P>
            </div>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full grid grid-cols-[2fr_1fr] grid-rows-[auto_auto_auto] gap-4'>
              <P className='border border-black px-2 py-1 w-fit h-fit'>Guidance</P>
              <div className='w-full min-w-0 h-full row-span-3 p-2 md:p-4 lg:p-8 flex justify-center items-center'>
                <MotionImg src={imagePath + '11.png'} alt='' className='w-full !h-auto aspect-square' />
              </div>
              <H3 className='w-full min-w-0'>
                Reduces teacher setup burden by building the class flow into the interface.
              </H3>
              <P className='w-full min-w-0'>
                Automation does not complete the outcome on behalf of the user. <br />
                Instead, it generates structures and forms that users can actively work with.
              </P>
            </div>
          </Paragpraph>

          {/* To-Be Scenario */}
          <Chapter subTitle='To-Be Scenario' title='Teaching with the XR Science Museum' />
          <Paragpraph>
            <P>
              Reflecting on insights from earlier research and the defined design directions, I mapped an ideal teacher
              journey to show how lesson preparation, delivery, and assessment change with the introduction of digital
              textbooks.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H2>Teacher Flow</H2>
            <P>
              Teachers shift from troubleshooting devices to facilitating inquiry by using step-by-step guides and
              built-in measurement tools.
            </P>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full h-fit grid grid-cols-2 md:grid-cols-4 gap-4'>
              <MotionImg src={imagePath + '12.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '13.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '14.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '15.png'} alt='' className='w-full h-fit' />
            </div>
          </Paragpraph>

          <Chapter subTitle='To-Be Scenario' title='What Learning Looks Like with XR' />
          <Paragpraph>
            <P>
              Building on the proposal from same design directions, I mapped an ideal student journey to illustrate how
              learning activities, interaction, and feedback differ between traditional classrooms and digital
              textbook-based learning.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H2>Student Flow</H2>
            <P>
              Students move from reading and clicking to manipulating parameters, observing change, and testing
              hypotheses.
            </P>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full h-fit grid grid-cols-2 md:grid-cols-4 gap-4'>
              <MotionImg src={imagePath + '16.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '17.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '18.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '19.png'} alt='' className='w-full h-fit' />
            </div>
          </Paragpraph>

          {/* Technical Implementation */}
          <Chapter subTitle='Technical Implementation' title='From Experiment Narrative to Web Simulation' />
          <Paragpraph left={null}>
            <P>
              To translate classroom experiments into interactive web simulations, physical processes were modeled,
              simulated, and rendered in real time using web-based 3D and graphics technologies.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H2>Sketching</H2>
            <div className='w-full h-fit flex flex-col md:flex-row justify-between items-start gap-4'>
              <MotionImg src={imagePath + '20.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '21.png'} alt='' className='w-full h-fit' />
            </div>
          </Paragpraph>
          <Paragpraph>
            <H2>3D Modeling</H2>
            <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-4'>
              <MotionImg src={imagePath + '22.jpg'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '23.jpg'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '24.jpg'} alt='' className='w-full h-fit' />
            </div>
          </Paragpraph>
          <Paragpraph>
            <H2>Computer Graphics</H2>
            <MotionImg src={imagePath + '25.png'} alt='' className='!w-2/3 !md:w-1/2 h-fit' />
            <P>I created video data by grilling meat and fish using a thermal imaging camera.</P>
            <MotionImg src={imagePath + '26.png'} alt='' className='w-full h-fit' />
            <P>Based on the video data, I developed a thermal camera mode simulation using GLSL shaders.</P>
          </Paragpraph>

          <Chapter subTitle='Feedbacks from Stakeholders' title='From Feedback to Fixes' />
          <Paragpraph>
            <P>
              Stakeholder feedback from MiraeN’s editorial and product teams informed targeted UI refinements, with a
              focus on readability, clarity, and usability for elementary students using tablets in classrooms.
            </P>
          </Paragpraph>

          <Paragpraph>
            <div className='w-full h-fit grid grid-cols-1 gap-6'>
              <div className='w-full h-fit space-y-4'>
                <H3>Issue 1</H3>
                <P>The text is too small for 5th-6th graders reading on tablets from a distance.</P>
                <p className='opacity-50 text-sm md:text-base'>Editorial Team</p>
              </div>
              <div className='w-full h-fit space-y-4'>
                <H3>Issue 2</H3>
                <P>
                  Transparent buttons often fail to read as actionable elements and reduce touch accuracy, making them
                  unsuitable for children’s tablet use.
                </P>
                <p className='opacity-50 text-sm md:text-base'>Project Managers</p>
              </div>
              <div className='w-full h-fit space-y-4'>
                <H3>Issue 3</H3>
                <P>Button animations and visual effects introduce unnecessary visual noise for elementary students.</P>
                <p className='opacity-50 text-sm md:text-base'>Editorial Team</p>
              </div>
            </div>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='w-full h-fit space-y-4'>
                <H3>Before</H3>
                <MotionImg src={imagePath + '27.png'} alt='' className='w-full h-fit' />
              </div>
              <div className='w-full h-fit space-y-4'>
                <H3>After</H3>
                <MotionImg src={imagePath + '28.png'} alt='' className='w-full h-fit' />
              </div>
            </div>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full h-fit grid grid-cols-1 gap-6'>
              <div className='w-full h-fit space-y-4'>
                <H3>Revision 1</H3>
                <P>Increased all text sizes by 40%</P>
              </div>
              <div className='w-full h-fit space-y-4'>
                <H3>Revision 2</H3>
                <P>Changed transparent buttons to colored buttons</P>
              </div>
              <div className='w-full h-fit space-y-4'>
                <H3>Revision 3</H3>
                <P>Removed all transition effects on buttons</P>
              </div>
            </div>
          </Paragpraph>

          <Chapter subTitle='Interaction Design for Inquiry' title='How Inquiry Is Made Interactive' />
          <Paragpraph>
            <P>
              Based on earlier analysis of classroom workflows and inquiry breakdowns in digital textbooks, I designed
              interaction patterns around recurring inquiry structures found across science units, including time-based
              change, state comparison, and spatial observation.
            </P>
          </Paragpraph>

          <Paragpraph left={null}>
            <H2>Group 1 | Time Change Simulations</H2>
            <P>Slider → Scene/Graph changes → Read Values</P>

            <div className='w-full h-fit grid grid-cols-2 md:grid-cols-3 gap-4'>
              <MotionImg src={imagePath + '29.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '30.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '31.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '32.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '33.png'} alt='' className='w-full h-fit' />
            </div>
            <P>
              Learners adjust time by tapping or dragging the slider horizontally or vertically, use play and pause to
              fine-tune moments, zoom to read angular values, and record sun altitude, shadow length, and temperature at
              fixed intervals.
            </P>
          </Paragpraph>

          <Paragpraph left={null}>
            <H2>Group 2 | State Change Simulations</H2>
            <P>Tap 3D Objects → State Changes → Read Outcomes</P>

            <div className='w-full h-fit grid grid-cols-2 md:grid-cols-3 gap-4'>
              <MotionImg src={imagePath + '34.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '35.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '36.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '37.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '38.png'} alt='' className='w-full h-fit' />
            </div>
            <P>
              Learners tap 3D components to set up comparable experimental groups, keep variables constant, and run the
              same experiment across conditions to compare outcomes and reason about controlled variables.
            </P>
          </Paragpraph>

          <Chapter subTitle='Interaction Design for Inquiry' title='How Inquiry Is Made Interactive' />
          <Paragpraph>
            <P>
              We implemented interaction patterns that operationalize inquiry by allowing learners to change conditions
              and observe outcomes.
            </P>
          </Paragpraph>

          <Paragpraph left={null}>
            <H2>Group 3 | Comparison & Classification</H2>
            <P>Drag Objects → Observe Differences → Review Results</P>
            <div className='w-full h-fit grid grid-cols-2 md:grid-cols-3 gap-4'>
              <MotionImg src={imagePath + '39.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '40.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '41.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '42.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '43.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '44.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '45.png'} alt='' className='w-full h-fit' />
            </div>
            <P>
              Learners create comparison groups, move objects between conditions, observe behavioral differences, and
              review results after each observation cycle.
            </P>
          </Paragpraph>

          <Paragpraph left={null}>
            <H2>Group 4 | 3D Structure & Observation</H2>
            <P>Rotate & Zoom → Reveal Hotspots → Read Explanations</P>

            <div className='w-full h-fit grid grid-cols-2 md:grid-cols-3 gap-4'>
              <MotionImg src={imagePath + '46.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '47.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '48.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '49.png'} alt='' className='w-full h-fit' />
            </div>
            <P>
              Learners rotate and zoom the 3D scene to inspect structures from multiple angles, toggle hidden elements,
              and access contextual explanations embedded within the model.
            </P>
          </Paragpraph>

          <Chapter subTitle='Wireframes & Layout' title='Clustering interaction types' />
          <Paragpraph>
            <P>
              To avoid one-off designs for each unit, textbook content was grouped by shared phenomena and interaction
              patterns.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '50.png'} alt='' className='w-full !h-auto !aspect-[875/385]' />
            <MotionImg src={imagePath + '51.png'} alt='' className='w-full !h-auto !aspect-[875/385]' />
            <MotionImg src={imagePath + '52.png'} alt='' className='w-full !h-auto !aspect-[875/385]' />
            <MotionImg src={imagePath + '53.png'} alt='' className='w-full !h-auto !aspect-[875/385]' />
          </Paragpraph>
        </Section>

        <Section id='output'>
          {/* <Paragpraph>
            <MotionImg src={imagePath + '54.jpg'} alt='' className='w-full h-fit' />
          </Paragpraph> */}

          <Chapter subTitle='Final Design' title='Experiment Setup & Objectives' />
          <Paragpraph>
            <P>
              XR Science Museum begins each activity by orienting learners to the experiment, clarifying its goal and
              overall flow before hands-on exploration starts.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '55.jpg'} alt='' className='w-full h-fit' />
            <P>I created an activity guide for each experiment.</P>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full h-fit grid grid-cols-2 md:grid-cols-3 gap-4'>
              <MotionImg src={imagePath + '56.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '57.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '58.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '59.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '60.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '61.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '62.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '63.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '64.png'} alt='' className='w-full h-fit' />
            </div>
          </Paragpraph>

          <Chapter subTitle='Final Design' title='Conducting the Experiment' />
          <Paragpraph>
            <P>
              During curriculum-based experiments, the system visualizes changes in real time and provides continuous
              feedback that helps students track progress, interpret results, and recognize when a trial is complete.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '65.png'} alt='' className='w-full h-fit' />
          </Paragpraph>

          <Chapter subTitle='Final Design' title='Solution 1. Time-Based Simulations' />
          <Paragpraph>
            <P>
              Time-based simulation supports inquiry by allowing students to observe how variables change over time
              rather than relying on static snapshots. By controlling time directly, students can pause, rewind, and
              compare moments to reason about change through repeated observation and measurement.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '66.png'} alt='' className='w-full h-fit' />
            <MotionImg src={imagePath + '67.png '} alt='' className='w-full h-fit' />
          </Paragpraph>

          <Chapter subTitle='Final Design' title='Solution 2. State Change Simulations' />
          <Paragpraph>
            <P>
              State-change type of simulations let students directly manipulate components to compare discrete
              conditions side by side. By toggling elements such as switches, batteries, or bulbs, students can observe
              immediate cause-and-effect relationships between system states.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '68.png'} alt='' className='w-full h-fit' />
            <MotionImg src={imagePath + '69.png '} alt='' className='w-full h-fit' />
          </Paragpraph>

          <Chapter subTitle='Final Design' title='Solution 3. Comparison & Classification' />
          <Paragpraph>
            <P>
              Comparison and classification simulations type of simulation allows students directly manipulate objects
              to test how they behave under different conditions. By dragging items between containers, removing them,
              and trying again, students can compare outcomes, identify patterns, and build their own sequences of
              classification through repeated testing.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '70.png'} alt='' className='w-full h-fit' />
            <MotionImg src={imagePath + '71.png'} alt='' className='w-full h-fit' />
          </Paragpraph>

          <Chapter subTitle='Final Design' title='Solution 4. 3D structure and observation simulations' />
          <Paragpraph>
            <P>
              3D structure and observation simulations allow students to explore spatial relationships by viewing
              phenomena from multiple perspectives. By rotating the scene and adjusting light sources, students can
              observe how visibility and alignment change across positions, helping them reason about spatial structure
              and relative motion.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '72.png'} alt='' className='w-full h-fit' />
            <MotionImg src={imagePath + '73.png'} alt='' className='w-full h-fit' />
          </Paragpraph>

          <Chapter subTitle='Final Design' title='Curriculum' />
          <Paragpraph>
            <P>
              By analyzing recurring patterns across curriculum-based experiments, I translated diverse science content
              into four reusable XR interaction templates—creating a scalable system that supports inquiry, comparison,
              and observation across grade levels.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '74.png'} alt='' className='w-full h-fit' />
            <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-4'>
              <MotionImg src={imagePath + '75.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '76.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '77.png'} alt='' className='w-full h-fit' />
              <MotionImg src={imagePath + '78.png'} alt='' className='w-full h-fit' />
            </div>
            <P>Each category informed a consistent XR layout and simulation logic.</P>
          </Paragpraph>
        </Section>

        <Section id='reflection'>
          <Chapter subTitle='Reflection' title='Future Steps' />
          <Paragpraph>
            <P>
              XR Science Museum will launch in March 2026 and be deployed across multiple classrooms. This rollout
              enables validation beyond prototyping—allowing us to evaluate learning impact, classroom usability, and
              system reliability in real instructional contexts. Post-launch, we will analyze usage data, teacher
              feedback, and student work to assess the following questions.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H3>01 | Does XR interaction support conceptual understanding—not just engagement?</H3>
            <P>
              - Whether students can describe, predict, and compare phenomena using their own words based on observed
              outcomes
              <br />- Whether XR interactions help reduce common misconceptions found in textbook-based instruction
            </P>
          </Paragpraph>
          <Paragpraph>
            <H3>02 | Does the system reduce instructional friction for teachers?</H3>
            <P>
              - How much the system reduces time spent on setup, explanation, transitions, and resets compared to
              existing materials
              <br />- Which workflows or features become classroom bottlenecks and should be prioritized for iteration
            </P>
          </Paragpraph>
          <Paragpraph>
            <H3>03 | Is the system reliable under real classroom constraints?</H3>
            <P>
              - Whether loading time, frame rate, and interaction responsiveness remain stable across devices and
              networks
              <br />- How performance issues affect learning behaviors such as drop-off, retries, and task abandonment
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg
              src={imagePath + '79.png'}
              alt=''
              className='w-full h-fit'
              caption='2026 MiraeN Science Textbook Overview Video'
            />
            <P>
              Together, these evaluations will inform how XR can move from experimental novelty to a dependable learning
              tool in everyday classrooms.
            </P>
          </Paragpraph>
        </Section>
      </ParllaxFrame>
      <div className='w-full h-[40dvh] bg-black sticky bottom-0 flex justify-center items-center'></div>
    </>
  )
}
