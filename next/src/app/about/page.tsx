'use client'

import { InViewDiv, MotionImg, PageTitleArea } from '@/components'
import Marquee from 'react-fast-marquee'
import classNames from 'classnames'
import React from 'react'
import { HistoryList, NameSection, RelatedLinks } from './components'
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri'

const DESCRIPTION = `Hi.👋 I'm Yewon, based in Seoul, South Korea. Welcome to my place! Glad to show my projects. I am a technologist focused on developing tools that bridge computational methods with artistic expression. My work enables users to explore new forms of expression through generative arts, music, papercraft, and AI writing. I also do commercial work with code art.

I've loved physics since I was young, and I create works that incorporate physical laws.`

const ESSAY = `I'm passionate about creating technology that brings art and computation together in new ways. 
Over the years, I've focused on making complex tech more approachable - turning things like natural language processing and computer graphics into tools that anyone can use to create. 
I love seeing how people light up when they discover new ways to express themselves, whether it's through generating unique graphics, crafting with paper, or telling stories with AI.`

const RELATED_LINKS = [
  {
    name: 'Email',
    value: 'mailto:blockbwriting@gmail.com',
  },
  { name: 'GitHub', value: 'https://github.com/yewoncalli' },
  { name: 'LinkedIn', value: 'https://www.linkedin.com/in/yewon-jang-9270962ba' },
  { name: 'Instagram', value: 'https://www.instagram.com/yewon.calli' },
  { name: 'CV', value: 'https://drive.google.com/file/d/18pTggjeqoG4pwBCx8NIJvVRszwibIx-r/view' },
]

const EDUCATION = {
  category: 'Education',
  items: [
    {
      subject: {
        text: 'Sogang University',
        link: 'https://www.sogang.ac.kr',
      },
      period: 'Mar 2020 - Feb 2025',
      list: [
        {
          content: 'Bachelor of Arts and Science in Art&Technology',
        },
        {
          content: 'Bachelor of Science in Convergence Software',
        },
      ],
    },
  ],
}

const RESEARCH_EXPERIENCE = {
  category: 'Research Experience',
  items: [
    {
      subject: {
        text: 'Sogang University, Graduate School of Management of Technology | Research Assistant',
      },
      period: 'Mar 2024 – Apr 2025',
      list: [
        {
          content: 'Built an NLP pipeline to analyze industry–academia collaboration using BERT/SBERT embeddings.',
        },
        {
          content: 'Handled preprocessing, evaluation, and pattern analysis for computational social science research.',
        },
        {
          content: 'Advised by Prof. Kyootai Lee.',
        },
      ],
    },
    {
      subject: {
        text: 'Total Museum of Contemporary Art | Researcher in Digital Literacy',
      },
      period: 'Jul 2023 – Jan 2024',
      list: [
        {
          content:
            'Led participatory design research with adults 60+ in Hongjae-dong to study digital literacy barriers.',
        },
        {
          content:
            'Ran interviews, contextual inquiry, and diary studies; insights informed the Silver Bell senior fitness app.',
        },
        {
          content: 'Built and deployed the Android app in React Native.',
        },
        {
          content: 'Advised by Nathalie Boseul Shin.',
        },
      ],
    },
  ],
}

const WORK_EXPERIENCE = {
  category: 'Work Experience',
  items: [
    {
      subject: {
        text: 'Engineering6 | 3D Web Frontend Engineer, UX/UI Designer',
      },
      period: 'April 2025 - Dec 2025',
      list: [
        {
          content: 'Developed a WebXR science learning platform with real-time 3D simulations (Three.js/WebGL/GLSL).',
        },
        {
          content:
            'Partnered with curriculum teams to translate textbook content into interactive, spatial learning activities.',
        },
      ],
    },
    {
      subject: {
        text: 'Naver Connect Foundation | Product Manager Internship',
      },
      period: 'May 2023 - Sep 2023',
      list: [
        {
          content: 'Produced UX writing guidelines and wireframes for the SEF2023 site, serving 205K+ visitors.',
        },
        {
          content: 'Coordinated livestream integration to ensure stable delivery across four live sessions.',
        },
      ],
    },
    {
      subject: {
        text: 'Smilegate Membership for AI | Lead Researcher in Text Generation Coherence',
      },
      period: 'Jul 2022 - Nov 2022',
      list: [
        {
          content:
            'Applied reinforcement learning to improve narrative coherence and reduce cultural/gender bias in Korean fairytale generation.',
        },
        {
          content: 'Built sentiment and hate-speech evaluation modules to support responsible text generation.',
        },
      ],
    },
    {
      subject: {
        text: 'Freelance | UX/UI Designer, Frontend Developer',
      },
      period: 'Jan 2023 - Present',
      list: [
        {
          content: 'Samsung Design Membership: Launched a React/TS online exhibition for 9 projects (6.2K+ visitors).',
          link: 'https://www.newformative.com/',
        },
        {
          content:
            'Smilegate Future Lab: Audited and redesigned key flows for the Future Bee Challenge (UN SDG projects).',
        },
        {
          content:
            'SEED Youth Programs: Facilitated digital citizenship workshops and coached student-led web projects.',
        },
        {
          content: 'Smilegate: Built a learning platform with video CMS, progress tracking, and participant analytics.',
        },
      ],
    },
  ],
}

const LEADERSHIP_EXPERIENCE = {
  category: 'Leadership',
  items: [
    {
      subject: {
        text: 'TypeLab, Seoul-based Code Artist Collective',
        link: 'https://typelab-web.vercel.app/',
      },
      period: 'Feb 2025 - Present',
      list: [
        {
          content: 'Co-founder & Organizer',
        },
      ],
    },
    {
      subject: {
        text: 'Processing Foundation',
      },
      period: 'Mar - Apr 2024',
      list: [
        {
          content: 'p5.js Korean Translation Contributor',
          link: 'https://p5js.org/',
        },
      ],
    },
    {
      subject: {
        text: 'Department of Art & Technology, Sogang University',
      },
      period: 'Jun 2022 - Nov 2022',
      list: [
        {
          content:
            'Showcase Team Lead Art&Technology Conference (2021 - 2022) ; Lead Designer, Global Korean Studies Forum (2021)',
        },
      ],
    },
  ],
}

export default function AboutPage() {
  return (
    <>
      <div className='min-h-dvh w-full h-fit pt-14 bg-white z-10'>
        <PageTitleArea title='About' />
        <div className='space-y-20'>
          <InViewDiv className='w-full h-fit p-4 md:p-8 flex flex-col md:flex-row justify-between items-stretch gap-12 md:gap-16'>
            {/* left */}
            <NameSection
              jobs={['Computational', 'Designer/Developer']}
              name='Yewon Jang'
              location='Seoul, South Korea'
            />
            {/* right */}
            <div className='w-full md:w-5/12 aspect-video'>
              <MotionImg
                magnify={false}
                src='/images/about/profile.jpg'
                alt='Yewon Jang'
                className='w-full h-full object-cover object-center'
              />
            </div>
          </InViewDiv>

          <InViewDiv className='w-full p-4 md:p-8 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16'>
            <div className='w-full md:w-7/12 h-fit flex flex-col gap-4 md:gap-8'>
              <span className='font-semibold text-lg md:text-2xl'>Introduce</span>

              {/* Description */}
              <p className={classNames('w-full h-full', 'flex text-base md:text-2xl leading-loose ')}>{DESCRIPTION}</p>
            </div>
            <RelatedLinks links={RELATED_LINKS} />
          </InViewDiv>
          <Marquee speed={50} gradient={false} className='p-4 md:p-8'>
            {['Computational Designer', 'Creative Developer', 'Generative Artist', 'Tech Enthusiast'].map(
              (word, index) => (
                <span key={index} className='text-4xl md:text-6xl font-bold leading-none mx-8 whitespace-nowrap'>
                  {word}
                </span>
              ),
            )}
          </Marquee>

          <InViewDiv className='w-full p-4 md:p-8 flex flex-col xl:flex-row justify-between items-start gap-12 md:gap-32'>
            {/* <div className='w-full md:w-4/12 h-fit'></div> */}
            <div className='w-full xl:w-6/12 h-fit flex flex-col gap-8 md:gap-16'>
              <HistoryList history={EDUCATION} />
              <HistoryList history={RESEARCH_EXPERIENCE} />
            </div>
            <div className='w-full xl:w-6/12 h-fit flex flex-col gap-8 md:gap-16'>
              <HistoryList history={WORK_EXPERIENCE} />
              <HistoryList history={LEADERSHIP_EXPERIENCE} />
            </div>
          </InViewDiv>
          <InViewDiv className='w-full p-4 md:p-8 flex flex-col justify-start items-center gap-4 md:gap-8 bg-gradient-to-t from-gray-100 to-white'>
            <div className='w-full h-fit flex flex-col justify-start items-center gap-4 md:gap-8 py-12 md:py-16'>
              <RiDoubleQuotesL className='text-2xl md:text-4xl' />
              <p className={classNames('w-fit h-full', 'text-center italic flex text-lg md:text-2xl leading-loose ')}>
                {ESSAY}
              </p>
              <RiDoubleQuotesR className='text-2xl md:text-4xl' />
            </div>
          </InViewDiv>
        </div>
      </div>
      <div className='w-full h-[30dvh] p-4 md:p-8 bg-black text-white sticky bottom-0 flex flex-col justify-center items-center'></div>
    </>
  )
}
