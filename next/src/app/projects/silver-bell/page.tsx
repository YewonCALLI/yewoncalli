'use client'

import { Section, ScrollSideTab, MotionImg } from '@/components'
import { Chapter, Paragpraph, H1, H3, P, Div, H2, A } from '@/components/details'
import { ParllaxFrame } from '@/components/ParllaxFrame'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../projectlist'
import { PiNumberCircleOneFill, PiNumberCircleThreeFill, PiNumberCircleTwoFill } from 'react-icons/pi'

export default function ProjectDetailPage() {
  const project = projects.find((p) => p.slug === 'silver-bell')
  const imagePath = '/images/projects/silver-bell/'

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
          <Chapter subTitle='Background' title='Rapid Aging in an Emerging Cultural Hub' />
          <Paragpraph left={null}>
            <P>
              During the Hwayeon: Hongyeon-gil residency (Sep 2023 to Jan 2024), we observed rapid gentrification and
              the growth of cultural infrastructure. However, older residents were largely absent from these emerging
              cultural routes.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg src={imagePath + '01.png'} alt='background1' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph
            left={
              <>
                <H3>Key Observations</H3>
                <p className='text-sm md:text-base italic text-neutral-500'>
                  * Seoul Open Data Plaza (Seoul Statistics), Dependency Ratio and Aging Index (by dong), 2021.
                </p>
              </>
            }
          >
            <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='bg-gray-100 rounded-lg px-4 py-3 h-full w-full flex flex-col justify-between items-start gap-4'>
                <div className='w-full h-fit flex flex-row gap-1 justify-start items-center'>
                  <H3 className='text-[#521FB6] !mt-0'>
                    <PiNumberCircleOneFill className='inline-block -translate-y-0.5' /> Aging is concentrated
                  </H3>
                </div>
                <div className='w-full h-full grid grid-cols-2 md:grid-cols-1 grid-rows-1 md:grid-rows-2 gap-6'>
                  <div className='w-full h-fit flex flex-col justify-start items-start'>
                    <H2 className='!mb-0'>236.8%</H2>
                    <P>Aging Index</P>
                    <p className='text-sm md:text-base text-neutral-500'>(Hongyeon-gil, 2021)</p>
                  </div>
                  <div className='w-full h-fit flex flex-col justify-start items-start'>
                    <H2 className='!mb-0'>168.03%</H2>
                    <P>Aging Index</P>
                    <p className='text-sm md:text-base text-neutral-500'>(Seoul average)</p>
                  </div>
                </div>
              </div>

              <div className='bg-gray-100 rounded-lg px-4 py-3 h-full w-full flex flex-col justify-between items-start gap-4'>
                <div className='w-full h-fit flex flex-row gap-1 justify-start items-center'>
                  <H3 className='text-[#521FB6] !mt-0'>
                    <PiNumberCircleTwoFill className='inline-block -translate-y-0.5' /> Becoming a cultural hub
                  </H3>
                </div>
                <div className='w-full h-full grid grid-cols-2 md:grid-cols-1 grid-rows-1 md:grid-rows-2 gap-6'>
                  <div className='w-full h-fit flex flex-col justify-start items-start'>
                    <H2 className='!mb-0'>13</H2>
                    <P>The number of Galleries</P>
                  </div>
                  <div className='w-full h-fit flex flex-col justify-start items-start'>
                    <H2 className='!mb-0'>250</H2>
                    <P>The number of Artists</P>
                    <p className='text-sm md:text-base text-neutral-500'>(Yeonhui Art Fair, 2022)</p>
                  </div>
                </div>
              </div>

              <div className='bg-gray-100 rounded-lg px-4 py-3 h-full w-full flex flex-col justify-between items-start gap-4'>
                <div className='w-full h-fit flex flex-row gap-1 justify-start items-center'>
                  <H3 className='text-[#521FB6] !mt-0'>
                    <PiNumberCircleThreeFill className='inline-block -translate-y-0.5' /> The area is changing rapidly
                  </H3>
                </div>
                <div className='w-full h-full grid grid-cols-2 md:grid-cols-1 grid-rows-1 md:grid-rows-2 gap-6'>
                  <div className='w-full h-fit flex flex-col justify-start items-start'>
                    <H2 className='!mb-0'>49,745㎡</H2>
                    <P>Public redevelopment area</P>
                  </div>
                  <div className='w-full h-fit flex flex-col justify-start items-start'>
                    <H2 className='!mb-0'>1,094</H2>
                    <P>Planned Housing Units</P>
                    <p className='text-sm md:text-base text-neutral-500'>(Public Redevelopment Plan)</p>
                  </div>
                </div>
              </div>
            </div>
          </Paragpraph>

          <Paragpraph left={<H3>Summary</H3>}>
            <H3>Cultural growth is accelerating, but older residents remain largely excluded from participation.</H3>
          </Paragpraph>

          {/* Field Research1 */}
          <Chapter subTitle='Field Research' title='How we collected field insights' />
          <Paragpraph left={null}>
            <P>
              We mapped how younger residents describe Hongyeon-gil—and whether older adults appear in that narrative.
            </P>
          </Paragpraph>

          <Paragpraph>
            <H1>01. Research Process - Online Survey</H1>
          </Paragpraph>
          <Paragpraph>
            <H2>Online Survey through Instagram</H2>
            <p className='text-sm md:text-base text-neutral-500'>
              (Collaborated with Hongyeon-gil influencer, @hongyeongil_seoul)
            </p>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '02.png'} alt='survey' className='w-full h-fit' />
            <P>
              We used an online survey to capture <span className='text-purple-700'>local knowledge</span> and{' '}
              <span>how younger residents perceive older adults</span> in Hongyeon-gil.
            </P>
          </Paragpraph>

          <Paragpraph>
            <H2>Survey Results</H2>
            <P>Participants : 34</P>
          </Paragpraph>
          <Paragpraph>
            <div className='w-fit h-fit flex flex-col md:flex-row gap-4 md:gap-6 justify-start md:justify-between items-start'>
              <MotionImg src={imagePath + '03-1.jpg'} alt='chart' className='w-full h-fit' />
              <MotionImg src={imagePath + '03-2.jpg'} alt='chart' className='w-full h-fit' />
            </div>
          </Paragpraph>
          <Paragpraph>
            <div className='w-full h-fit flex flex-col gap-4 md:gap-6'>
              <div className='w-fit h-fit flex flex-col md:flex-row gap-4 md:gap-6 justify-start md:justify-between items-start'>
                <MotionImg
                  src={imagePath + '04.jpg'}
                  alt='chart'
                  className='w-full scale-75 md:scale-100 md:w-1/2 h-auto flex-shrink-0'
                />
                <P>
                  <span className='font-medium'>
                    1. Older adults were rarely mentioned in how people described Hongyeon-gil.
                  </span>
                  <br />
                  Word cloud based on the response sheet
                </P>
              </div>
              <div className='w-fit h-fit flex flex-col md:flex-row gap-4 md:gap-6 justify-start md:justify-between items-start'>
                <MotionImg
                  src={imagePath + '05.jpg'}
                  alt='chart'
                  className='w-full scale-75 md:scale-100 md:w-1/2 h-auto flex-shrink-0'
                />
                <P>
                  <span className='font-medium'>2. Hongyeon-gil is remembered through commercial leisure venues.</span>
                  <br />
                  All top 4 venues are cafes and exhibition spaces in Hongyeon-gil.
                </P>
              </div>
            </div>
          </Paragpraph>

          {/* Field Research2 */}
          <Paragpraph>
            <H1>02. Research Process - Interviews</H1>
          </Paragpraph>
          <Paragpraph>
            <H2>Survey Results</H2>
            <P>Participants : 42</P>
            <P>
              We conducted in-person interviews to gather information about older adults who are not visible in online
              surveys.
            </P>
          </Paragpraph>
          <Paragpraph>
            <div className='w-fit h-fit flex flex-col md:flex-row gap-4 md:gap-6 justify-start md:justify-between items-start'>
              <MotionImg src={imagePath + '06-1.jpg'} alt='chart' className='w-full h-fit' />
              <MotionImg src={imagePath + '06-2.jpg'} alt='chart' className='w-full h-fit' />
            </div>
          </Paragpraph>
          <Paragpraph>
            <MotionImg src={imagePath + '07.jpg'} alt='chart' className='w-full h-fit' />
          </Paragpraph>

          {/* Field Research3 */}
          <Chapter subTitle='Field Research' title='Three Barriers in Everyday Routines' />
          <Paragpraph left={<></>}>
            <P>
              By combining the online survey (how people describe Hongyeon-gil) and offline interviews (how older adults
              live day-to-day), we identified three barriers that prevent older residents from participating—even when
              cultural infrastructure grows.
            </P>
          </Paragpraph>
          {[
            {
              title: 'Older adults are absent from Hongyeon-gil’s mainstream narrative',
              item: [
                {
                  icon: imagePath + 'computer.png',
                  text: 'The first elderly-related term appeared at rank 38 (“older adults”), and it was mentioned 12 times.',
                },
                {
                  icon: imagePath + 'mic.png',
                  text: `“I've never been to any galleries in Hongyeon-gil since I moved here in 1985. We have nothing to do with art." \n\n-Hongyeon senior center member A`,
                },
              ],
              insight: `Cultural infrastructure did not translate into perceived access for seniors.`,
            },
            {
              title: `“Going out” is a high-cost action`,
              item: [
                {
                  icon: imagePath + 'computer.png',
                  text: `Hongyeon-gil is known for its cafés and galleries, but these aren't places seniors usually visit.`,
                },
                {
                  icon: imagePath + 'mic.png',
                  text: `"Many elderly residents in Hongyeon-dong have mobility issues. The area has a lot of steep hills. Some seniors can't even make it here to Hongyeon Market where the hospital is located." \n\n-Director of Saecheonnyeon Clinic at Hongyeon Market`,
                },
              ],
              insight: `Participation must be home-based, low-effort, and safe for limited mobility.`,
            },
            {
              title: `The phone is reliable, but access is notification-led`,
              item: [
                {
                  icon: imagePath + 'mic.png',
                  text: `"Many older adults spend time watching YouTube and short videos on their phones." \n\n-A Pharmacist who runs Hongyeon-Pharmacy`,
                },
                {
                  icon: imagePath + 'mic.png',
                  text: `"I only use it for phone calls really, trying to learn bit by bit. I check messages, that's about it." \n\n-Hongyeon senior center member B`,
                },
              ],
              insight: `Design should be notification-first and delivered in familiar video-based cues.`,
            },
          ].map((barrier, index) => (
            <Paragpraph
              left={
                <div className='hidden md:block'>
                  <p className='text-sm text-[#521FB6] md:text-base mt-8 px-1'>Insights</p>
                  <div className='border bg-[#521FB6] mt-1 text-white rounded-lg p-2'>
                    <p className='text-sm md:text-base'>{barrier.insight}</p>
                  </div>
                </div>
              }
              key={index}
            >
              <div className='w-full h-fit space-y-6'>
                <H3>{barrier.title}</H3>
                {barrier.item.map((it, idx) => (
                  <div
                    key={idx}
                    className='w-full h-fit flex flex-row gap-4 px-5 py-3 bg-gray-100 rounded-lg justify-start items-start mb-4'
                  >
                    <MotionImg src={it.icon} alt={`barrier-icon-${idx}`} className='!w-10 !h-10 flex-shrink-0' />
                    <P className='w-full h-fit'>{it.text}</P>
                  </div>
                ))}
              </div>
              <div className='block md:hidden'>
                <P className='text-[#521FB6] px-1'>Insights</P>
                <div className='border bg-[#521FB6] mt-1 text-white rounded-lg p-2'>
                  <P>{barrier.insight}</P>
                </div>
              </div>
            </Paragpraph>
          ))}

          <Chapter subTitle='Problem Framing' title='Exercise initiation is the bottleneck' />
          <Paragpraph left={null}>
            <P>
              Interviews suggest barriers are less about motivation and more about effort, risk, and decision-making at
              the moment of starting.
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>Key Question</H3>
            <P>
              How can mobile interfaces reduce exercise initiation costs for older adults with limited mobility in
              everyday life?
            </P>
          </Paragpraph>
          <Paragpraph left={null}>
            <H3>What makes starting hard?</H3>
            <P>
              01. In Hongyeon-gil, steep hills make it difficult for older adults to reach exercise programs at senior
              centers or swimming pools.
            </P>
            <P>
              02. Many older residents have limited mobility, which makes leaving home and moving around physically
              demanding.
            </P>
            <P>03. Many older adults were unsure when to exercise or what kind of exercises to do.</P>
          </Paragpraph>
          <Paragpraph left={null}>
            <MotionImg
              src={imagePath + '11.png'}
              alt='image'
              className='w-full h-fit'
              caption='(left) An older resident in Hongyeon-gil explaining how he uses a smartphone. (right) A steep uphill street in Hongyeon-gil.'
            />
          </Paragpraph>
        </Section>

        <Section id='development'>
          <Chapter subTitle='Design Directions' title='Three Key Principles for Reframing Participation' />
          <Paragpraph left={<></>}>
            <P>Based on field research, we reframed participation to reduce effort, risk, and decision-making.</P>
          </Paragpraph>
          {[
            {
              title: 'Reducing the threshold of participation.',
              item: {
                icon: imagePath + 'step1.png',
                text: 'Participation can begin at the scale of the body, without leaving home.',
              },

              direction: `HOME-BASED PARTICIPATION`,
            },
            {
              title: 'Finding the most safe and familiar movement of the body.',
              item: {
                icon: imagePath + 'step2.png',
                text: 'Among bodily practices, repetitive, familiar movements minimize cognitive and physical load.',
              },

              direction: `FAMILIAR MOVEMENTS`,
            },
            {
              title: 'Finding the medium where bodily practice begins.',
              item: {
                icon: imagePath + 'step3.png',
                text: 'For participation to occur, initiation must not rely on intention, but be triggered externally.',
              },

              direction: `SEND NOTIFICATIONS`,
            },
          ].map((barrier, index) => (
            <Paragpraph key={index}>
              <div className='w-full h-fit grid grid-cols-[1fr_3fr] grid-rows-[auto_auto]  gap-4 justify-start items-start mb-4'>
                <H3 className='col-span-full !mt-0'>
                  {index === 0 && <PiNumberCircleOneFill className='inline -translate-y-0.5 mr-1' />}
                  {index === 1 && <PiNumberCircleTwoFill className='inline -translate-y-0.5 mr-1' />}
                  {index === 2 && <PiNumberCircleThreeFill className='inline -translate-y-0.5 mr-1' />}
                  {barrier.title}
                </H3>
                <MotionImg src={barrier.item.icon} alt={`barrier-icon-${index}`} className='bg-white rounded-md p-2' />
                <div className=''>
                  <P className='text-[#521FB6] font-semibold'>{barrier.direction}</P>
                  <H3 className='w-full h-fit !font-normal pr-8 '>{barrier.item.text}</H3>
                </div>
              </div>
            </Paragpraph>
          ))}

          <Chapter subTitle='Design Process' title='Exercise Routine Design' />
          <Paragpraph left={null}>
            <P>To inform the exercise design, we consulted the pharmacist and the physician in Hongyeon-gil again.</P>
          </Paragpraph>
          <Paragpraph full>
            <MotionImg src={imagePath + '12.png'} alt='image' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph full>
            <MotionImg src={imagePath + '13.png'} alt='image' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph left={<H3>Key Insight</H3>}>
            <H3>
              Design low-intensity exercises based on familiar routines like national calisthenics, accounting for
              individual differences rather than introducing new movements.
            </H3>
          </Paragpraph>

          <Chapter subTitle='Proposed Solution' title='Notification-first Morning Exercise at Home' />
          <Paragpraph left={null}>
            <P>Interviews indicate that notifications are a primary entry point for older adults’ smartphone use.</P>
          </Paragpraph>
          <Paragpraph full className=''>
            <MotionImg src={imagePath + '14.png'} alt='image' className='w-full h-fit md:px-6 pt-8' />
            <p className='text-center py-4'>
              We designed a morning exercise experience that starts the moment older adults tap a notification.
              <br />
              By combining familiar routines with instant video playback, we reduce browsing and decision-making before
              exercise.
            </p>
          </Paragpraph>

          <Chapter subTitle='Design Process' title='Familiar & Readable UI for Hongyeon-gil Seniors' />
          <Paragpraph left={null}>
            <P>Make the interface instantly recognizable and readable for Hongyeon-gil older adults.</P>
          </Paragpraph>
          <Paragpraph full>
            <H3 className='py-4'>01. Interaction Design</H3>
            <MotionImg src={imagePath + '15.png'} alt='image' className='w-full h-fit md:px-6 pt-8' />
          </Paragpraph>

          <Chapter subTitle='Design Process' title='Exercise Routine Design' />
          <Paragpraph left={null}>
            <P>Create a familiar, safe routine older adults can follow without learning new moves.</P>
          </Paragpraph>
          <Paragpraph full>
            <H3 className='py-4'>02. Collaborated with a dance specialist</H3>
            <div className='w-full flex flex-col md:flex-row gap-4 md:gap-12 justify-between items-center  md:px-6 pt-8'>
              <MotionImg src={imagePath + '16.png'} alt='image' className='w-full md:w-[45%] h-fit' />
              <MotionImg src={imagePath + '17.png'} alt='image' className='w-full h-fit' />
            </div>
          </Paragpraph>

          <Chapter subTitle='Design Process' title='Notification Time Planning' />
          <Paragpraph left={null}>
            <P>Send notifications at times when older adults are most likely to notice and act.</P>
          </Paragpraph>
          <Paragpraph full>
            <div className='w-full flex flex-col md:flex-row gap-4 md:gap-12 justify-between items-start pt-8'>
              <MotionImg
                src={imagePath + '18.png'}
                alt='image'
                imagePosition='top'
                className='w-1/2 md:w-[45%] h-auto aspect-square md:aspect-[1/2] md:h-fit'
              />
              <div className='w-full h-full flex flex-col gap-4 md:gap-8 justify-start items-start'>
                <P className='text-[#521FB6] font-medium'>Insights</P>
                <div>
                  <H3 className='!mt-0'>01. Morning Exercise : 10:00AM - 11:00AM</H3>
                </div>
                <div>
                  <H3 className='!mt-0 !mb-0'>02. Lunch Exercise : 2:00 PM</H3>
                  <P>Senior center lunch typically ends around 1:00 PM</P>
                </div>
                <div>
                  <H3 className='!mt-0 !mb-0'>03. Evening Exercise : 8:00 PM</H3>
                  <P>
                    Dinner is usually around 7:30 PM, and many go to bed soon after—so a reminder near the end of the
                    evening routine works best s
                  </P>
                </div>
              </div>
            </div>
          </Paragpraph>
          <Paragpraph left={<P className='text-[#521FB6] font-medium'>Decision</P>}>
            <div className='w-full flex flex-col md:flex-row gap-4 md:gap-12 justify-between items-start md:px-6 pt-8'>
              <div className='w-full h-full flex flex-col gap-4 md:gap-8 justify-start items-start p-4'>
                <MotionImg src={imagePath + '19.png'} alt='image' imagePosition='top' className='w-full h-fit' />
              </div>
            </div>
          </Paragpraph>

          <Chapter subTitle='Design Process' title='Familiar & Readable UI for Hongyeon-gil Seniors' />
          <Paragpraph left={null}>
            <P>Make the interface instantly recognizable and readable for Hongyeon-gil older adults.</P>
          </Paragpraph>
          <Paragpraph full>
            <H3 className='py-4'>03. Color of accessibility for seniors</H3>
            <div className='w-full flex flex-col md:flex-row gap-6'>
              <MotionImg src={imagePath + '20.jpg'} alt='image' className='h-fit' />
              <P className='w-full'>
                Following the guidelines of the {'<'}Color Universal Design Organization research{'>'} by Okabe Masataka
                and Ito Kei, we initially developed our color palette based on the color chart below, which ensures that
                people with color vision deficiency can clearly distinguish the colors.
              </P>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-4 pt-8 md:pt-0'>
              <MotionImg src={imagePath + '21.jpg'} alt='image' className='h-fit' />
              <P className='w-full'>This color chart represents the colors used in the UI.</P>
            </div>
          </Paragpraph>
          <Paragpraph full>
            <MotionImg src={imagePath + '22.png'} alt='image' className='h-fit p-4' />
            <P>
              This is the result of testing the actual screen shown to color-blind people through color-blind
              simulation.
            </P>
          </Paragpraph>

          <Paragpraph full>
            <H3 className='py-4'>04. Design Iteraction</H3>
            <div className='w-full flex flex-col md:flex-row gap-6'>
              <MotionImg src={imagePath + '23.jpg'} alt='image' className='h-fit' />
              <P className='w-full'>
                After applying color-blind friendly colors and conducting QA sessions with actual elderly users, we
                discovered that emphasizing the importance of buttons to be pressed was more critical than color alone.
                As a result, we retained color only for the most frequently used button and removed confusing colors
                elsewhere, significantly improving readability.
              </P>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-4 pt-8 md:pt-0'>
              <MotionImg src={imagePath + '24.jpg'} alt='image' className='h-fit' />
              <P className='w-full'>This color chart represents the colors used in the UI.</P>
            </div>
          </Paragpraph>
          <Paragpraph full>
            <MotionImg src={imagePath + '25.png'} alt='image' className='h-fit p-4' />
            <P>
              This is the result of testing the actual screen shown to color-blind people through color-blind
              simulation.
            </P>
          </Paragpraph>
        </Section>

        <Section id='output'>
          <Chapter subTitle='Final Design' title='Silver Bell: Mobile Exercise for Hongyeon-gil Seniors' />
          <Paragpraph full>
            <MotionImg src={imagePath + '26.jpg'} alt='image' className='w-full h-fit' />
          </Paragpraph>
          <Paragpraph left={<H3>Key Features</H3>}>
            <H3 className='!mb-2'>01. Notification-first start</H3>
            <P>
              Notifications are sent at scheduled times, and exercise begins immediately when the user taps the
              notification.
            </P>
            <H3 className='!mt-6 !mb-2'>02. Time-based routine planning (3 sessions)</H3>
            <P>
              Notifications scheduled at morning (10 AM), lunch (2 PM), and evening (8 PM) to match users{"'"} daily
              routines.
            </P>
            <H3 className='!mt-6 !mb-2'>03. Familiar, low-intensity exercise routines</H3>
            <P>Composed of familiar, low-intensity movements to reduce the burden of learning new exercises.</P>
            <H3 className='!mt-6 !mb-2'>04. Barrier-free UI</H3>
            <P>Color palette adjusted for color blindness accessibility (red shifted to orange, green to teal).</P>
          </Paragpraph>
        </Section>

        <Section id='reflection'>
          <Chapter subTitle='Final Design' title='Silver Bell: Mobile Exercise for Hongyeon-gil Seniors' />
          <Paragpraph full>
            <MotionImg
              src={imagePath + '27.jpg'}
              alt='image'
              className='w-full h-fit'
              caption='The Silver Bell Challenge : Hong Yeon-gil project showcase, tentothen, 2024'
            />
          </Paragpraph>
          <Paragpraph left={<H3>Key Insight 01</H3>}>
            <H3>Interaction Is Notification-Driven, Not Exploratory</H3>
            <P>
              Older adults primarily used their phones to respond to alerts and notifications rather than browsing menus
              or exploring features. Interfaces felt most comfortable when important information was immediately
              visible, supported by bold typography and high-contrast primary actions. As a result, designs that
              surfaced critical actions upfront reduced hesitation and the need for navigation or discovery.
            </P>
          </Paragpraph>
          <Paragpraph left={<H3>Key Insight 02</H3>}>
            <H3>Setup and Onboarding Are the Real Barriers</H3>
            <P>
              Initial installation and setup—not feature complexity—emerged as the largest obstacle to adoption. Many
              participants struggled to download and configure the app independently, even before engaging with its core
              functionality. This showed that onboarding and access, more than feature depth, determined whether the
              system could be used at all in real-world contexts.
            </P>
          </Paragpraph>

          <Paragpraph>
            <A href='https://abt-avatar.vercel.app/'>Visit project archive website</A>
          </Paragpraph>
        </Section>
      </ParllaxFrame>
      <div className='w-full h-[40dvh] bg-black sticky bottom-0 flex justify-center items-center'></div>
    </>
  )
}
