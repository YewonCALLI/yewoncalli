'use client'

import { Section, ScrollSideTab, MotionImg, ImageSlider } from '@/components'
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
          <Chapter
            subTitle='Background'
            title='Voices surrounding the implementation of AI digital textbooks in South Korea'
          />
          <Paragpraph left={null}>
            <P>
              Since the implementation of AI digital textbooks in 2025, digital infrastructure has been expanded, but
              the quality of educational content has not kept pace. In particular, there is a lack of interactive and
              highly immersive content that leverages the strengths of the digital environment.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H2>01 | Online Survey and Teachers Interview</H2>
          </Paragpraph>
          <Paragpraph left={null}>
            <P>
              What do you think is the most important reason why AI digital textbooks are not as effective as expected?
              (Multiple answers possible) (Multiple responses allowed)
            </P>
            <MotionImg src={imagePath + '01.png'} alt='' className='w-1/2 h-fit mt-4' />
          </Paragpraph>

          <Paragpraph left={null}>
            <MotionImg src={imagePath + '02.png'} alt='' className='w-[55%] h-fit' />
            <H3>Digital Devices ≠ Digital Learning</H3>
            <P>Digital devices are prepared, but the quality of educational content is insufficient</P>
          </Paragpraph>

          {/* Teacher Journey */}
          <Chapter subTitle='Teacher Journey' title='We identified the real problems that teachers face' />
          <Paragpraph>
            <P>
              I conducted a comparative analysis of student and teacher experiences in traditional textbook classes
              versus digital textbook classes. While digital textbooks provide interactive experiences, they actually
              reduce students' active inquiry and increase teachers' lesson preparation burden.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H3>
              Currently used digital textbooks are reducing discussion experiences with peers and replacing them with
              quiz content.
            </H3>
            <P>Traditional Textbooks</P>
            <MotionImg src={imagePath + '03.png'} alt='' className='w-full h-fit !mt-2' />
            <P>Digital Textbooks</P>
            <MotionImg src={imagePath + '04.png'} alt='' className='w-full h-fit !mt-2' />
          </Paragpraph>

          {/* Student Journey */}
          <Chapter subTitle='Student Journey' title='We identified the real problems that students face' />
          <Paragpraph>
            <P>
              I conducted a comparative analysis of student and teacher experiences in traditional textbook classes
              versus digital textbook classes. While digital textbooks provide interactive experiences, they actually
              reduce students' active inquiry and increase teachers' lesson preparation burden.
            </P>
          </Paragpraph>
          <Paragpraph>
            <H3>
              Digital textbooks provide students with interactive experiences, but they also increase the burden of
              device management for teachers.
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

            <MotionImg src={imagePath + '07.png'} alt='' className='max-w-[800px] h-fit' />
          </Paragpraph>

          <Paragpraph>
            <H2>02 | Research Question</H2>
            <H1>
              &quot;How can we design digital textbook content to reduce the burden on teachers and students and
              transform passive learning into active inquiry experiences?&quot;
            </H1>
          </Paragpraph>
        </Section>

        <Section id='development'>
          {/* MVP List */}
          <Chapter subTitle='MVP List' title='What We’re Building' />
          <Paragpraph>
            <P>
              After identifying the key constraints in the classroom setting and the gaps in student learning, I created
              an MVP to rank and prioritize features based on their importance. The main focus was on features that
              directly support inquiry-based science learning while still being practical for everyday classroom use.
            </P>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '08.png'} alt='' className='w-full h-fit' />
          </Paragpraph>

          {/* Design Direction */}
          <Chapter subTitle='Design Direction' title='Three Design Directions for the XR Museum' />
          <Paragpraph>
            <P>
              I organized the problems that teachers and students face into three design directions aligned with the MVP
              list. At the same time, I divided 14 experiments into four experiment types and created reusable XR
              templates for each prototype.
            </P>
          </Paragpraph>

          <Paragpraph>
            <MotionImg src={imagePath + 'Frame 1618873179.png'} alt='' className='w-full hidden md:block h-fit' />
          </Paragpraph>

          <Paragpraph>
            <div className='md:hidden w-full grid grid-cols-[2fr_1fr] grid-rows-[auto_auto_auto] gap-4'>
              <H2 className='border border-black px-2 py-1 w-fit h-fit'>Inquiry</H2>
              <div className='w-full min-w-0 h-full row-span-3 p-2 md:p-4 lg:p-8 flex justify-center items-center'>
                <MotionImg src={imagePath + '09.png'} alt='' className='w-full !h-auto aspect-square' />
              </div>
              <H3 className='min-w-0'>
                Shifts digital science classes from watching explanations to running manipulable experiments.
              </H3>
              <P className='min-w-0'>
                • 360º viewing, zoom, pause/rewind
                <br />
                • Visualization of otherwise invisible phenomena
                <br />• Incorporates gamification elements
              </P>
            </div>
          </Paragpraph>
          <Paragpraph>
            <div className='md:hidden w-full grid grid-cols-[2fr_1fr] grid-rows-[auto_auto_auto] gap-4'>
              <H2 className='border border-black px-2 py-1 w-fit h-fit'>Accessibility</H2>
              <div className='w-full min-w-0 h-full row-span-3 p-2 md:p-4 lg:p-8 flex justify-center items-center'>
                <MotionImg src={imagePath + '10.png'} alt='' className='w-full !h-auto aspect-square' />
              </div>
              <H3 className='min-w-0'>
                Makes dense science content usable for diverse literacy levels and device conditions.
              </H3>
              <P className='min-w-0'>
                • High-contrast design <br />
                • 20pt+ typography
                <br />
                • Clear non-transparent buttons <br />• Audio narration with interruption handling
              </P>
            </div>
          </Paragpraph>
          <Paragpraph>
            <div className='md:hidden w-full grid grid-cols-[2fr_1fr] grid-rows-[auto_auto_auto] gap-4'>
              <H2 className='border border-black px-2 py-1 w-fit h-fit'>Guidance</H2>
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
          <Chapter subTitle='Technical Implementation' title='From textbook experiments to web simulations' />
          <Paragpraph left={null}>
            <P>
              To implement experiments from paper-based textbooks as web-based interactive simulations, I modeled and
              simulated how the experiments work and rendered them in real-time using 3D/graphics technology.
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
            <P>I created video data by filming scenes of grilling meat and fish with a thermal camera.</P>
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
            <div className='w-full h-fit grid grid-cols-3 gap-6'>
              <div className='w-full h-fit space-y-4'>
                <H3>Issue 1</H3>
                <P>Text is too small for 5th-6th grade students.</P>
                <p className='opacity-50 text-sm md:text-base'>Editorial Team</p>
              </div>
              <div className='w-full h-fit space-y-4'>
                <H3>Issue 2</H3>
                <P>
                  Transparent buttons are not recognized as clickable elements and have poor touch accuracy, making them
                  unsuitable for children's tablet use.
                </P>
                <p className='opacity-50 text-sm md:text-base'>Project Managers</p>
              </div>
              <div className='w-full h-fit space-y-4'>
                <H3>Issue 3</H3>
                <P>Button animations and visual effects create unnecessary visual noise for elementary students.</P>
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
            <div className='w-full h-fit grid grid-cols-3 gap-6'>
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

          <Chapter
            subTitle='Wireframes & Layout'
            title='I created interaction and UI design guides based on experiment types.'
          />
          <Paragpraph>
            <P>I grouped the curriculum into four experiment types and created interaction and UI design guides.</P>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-4'>
              <MotionImg src={imagePath + '50.png'} alt='' className='w-full !h-auto !aspect-[875/384]' />
              <MotionImg src={imagePath + '51.png'} alt='' className='w-full !h-auto !aspect-[875/384]' />
              <MotionImg src={imagePath + '52.png'} alt='' className='w-full !h-auto !aspect-[875/352]' />
              <MotionImg src={imagePath + '53.png'} alt='' className='w-full !h-auto !aspect-[875/352]' />
            </div>
          </Paragpraph>
        </Section>

        <Section id='output'>
          {/* <Paragpraph>
            <MotionImg src={imagePath + '54.jpg'} alt='' className='w-full h-fit' />
          </Paragpraph> */}
          <MotionImg magnify={false} src={imagePath + 'finaldesign1.png'} alt='' className='w-full' />
          <Chapter subTitle='Final Design' title='Experiment Setup & Objectives' />
          <Paragpraph>
            <P>
              XR Science Museum begins each activity by orienting learners to the experiment, clarifying its goal and
              overall flow before hands-on exploration starts.
            </P>
          </Paragpraph>
          <Paragpraph>
            <P>
              I created an activity guide for each experiment. This activity guide can access by {"'Activity Guide'"}{' '}
              button on the intro screen.
            </P>
            <div className='w-full aspect-[416/221]'>
              <ImageSlider
                images={[
                  imagePath + '56.png',
                  imagePath + '57.png',
                  imagePath + '58.png',
                  imagePath + '59.png',
                  imagePath + '60.png',
                  imagePath + '61.png',
                  imagePath + '62.png',
                  imagePath + '63.png',
                  imagePath + '64.png',
                ]}
                autoPlay
                autoPlayInterval={3000}
              />
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
            <div className='w-full aspect-[416/221]'>
              <ImageSlider
                images={[
                  imagePath + 'solution_guides/1.jpg',
                  imagePath + 'solution_guides/2.jpg',
                  imagePath + 'solution_guides/3.jpg',
                  imagePath + 'solution_guides/4.jpg',
                  imagePath + 'solution_guides/5.jpg',
                  imagePath + 'solution_guides/6.jpg',
                  imagePath + 'solution_guides/7.jpg',
                ]}
                autoPlay
                autoPlayInterval={3000}
              />
            </div>
          </Paragpraph>
          <Chapter subTitle='Final Design' title='Solution 2. State Change Simulations' />
          <Paragpraph>
            <P>
              State-change type of simulations let students directly manipulate components to compare discrete
              conditions side by side. By toggling elements such as switches, batteries, or bulbs, students can observe
              immediate cause-and-effect relationships between system states.
            </P>
            <div className='w-full aspect-[416/221]'>
              <ImageSlider
                images={[
                  imagePath + 'solution_guides/8.jpg',
                  imagePath + 'solution_guides/9.jpg',
                  imagePath + 'solution_guides/10.jpg',
                  imagePath + 'solution_guides/12.jpg',
                ]}
                autoPlay
                autoPlayInterval={3000}
              />
            </div>
          </Paragpraph>

          <Chapter subTitle='Final Design' title='Solution 3. Comparison & Classification' />
          <Paragpraph>
            <P>
              Comparison and classification simulations type of simulation allows students directly manipulate objects
              to test how they behave under different conditions. By dragging items between containers, removing them,
              and trying again, students can compare outcomes, identify patterns, and build their own sequences of
              classification through repeated testing.
            </P>
            <div className='w-full aspect-[416/221]'>
              <ImageSlider
                images={[
                  imagePath + 'solution_guides/13.jpg',
                  imagePath + 'solution_guides/14.jpg',
                  imagePath + 'solution_guides/15.jpg',
                  imagePath + 'solution_guides/16.jpg',
                  imagePath + 'solution_guides/17.jpg',
                  imagePath + 'solution_guides/18.jpg',
                  imagePath + 'solution_guides/19.jpg',
                  imagePath + 'solution_guides/20.jpg',
                ]}
                autoPlay
                autoPlayInterval={3000}
              />
            </div>
          </Paragpraph>

          <Chapter subTitle='Final Design' title='Solution 4. 3D structure and observation simulations' />
          <Paragpraph>
            <P>
              3D structure and observation simulations allow students to explore spatial relationships by viewing
              phenomena from multiple perspectives. By rotating the scene and adjusting light sources, students can
              observe how visibility and alignment change across positions, helping them reason about spatial structure
              and relative motion.
            </P>
            <div className='w-full aspect-[416/221]'>
              <ImageSlider
                images={[
                  imagePath + 'solution_guides/21.jpg',
                  imagePath + 'solution_guides/22.jpg',
                  imagePath + 'solution_guides/23.jpg',
                  imagePath + 'solution_guides/24.jpg',
                  imagePath + 'solution_guides/25.jpg',
                  imagePath + 'solution_guides/26.jpg',
                  imagePath + 'solution_guides/27.jpg',
                ]}
                autoPlay
                autoPlayInterval={3000}
              />
            </div>
          </Paragpraph>
          <MotionImg magnify={false} src={imagePath + 'finaldesign2.png'} alt='' className='w-full' />

          <Chapter subTitle='Final Design' title='Curriculum' />
          <Paragpraph>
            <P>
              By analyzing recurring patterns across curriculum-based experiments, I translated diverse science content
              into four reusable XR interaction templates—creating a scalable system that supports inquiry, comparison,
              and observation across grade levels.
            </P>
          </Paragpraph>
          <Paragpraph>
            <div className='flex flex-row'>
              <MotionImg src={imagePath + '74.png'} alt='' className='w-full md:max-w-[60%] h-fit' />
              <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-4'>
                <MotionImg src={imagePath + '75.png'} alt='' className='w-full h-fit' />
                <MotionImg src={imagePath + '76.png'} alt='' className='w-full h-fit' />
                <MotionImg src={imagePath + '77.png'} alt='' className='w-full h-fit' />
                <MotionImg src={imagePath + '78.png'} alt='' className='w-full h-fit' />
              </div>
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
