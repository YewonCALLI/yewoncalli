'use client'

import { InViewDiv, MotionImg, PageTitleArea } from '@/components'
import Marquee from 'react-fast-marquee'
import classNames from 'classnames'
import React from 'react'
import { HistoryList, NameSection, RelatedLinks } from './components'
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri'


const DESCRIPTION = `Hi, I’m Yewon. I’m an HCI researcher specializing in human-centered tool design. I build interactive systems that help people create, learn, and take ownership of what they make.

My work has been recognized twice with the HCI Korea Creative Awards: Franklin (2023), a gender-debiased Korean fairytale generator, and TypoFold (2025), a papercraft converter that bridges computational design and physical making. I have investigated factors that increase creators’ ownership when working with automated and generative tools, with a particular focus on digital-physical workflows and paper-based fabrication.

I currently work at Engineering 6 as a 3D Web Frontend Engineer, and I also collaborate as a freelance frontend engineer with industry partners, including Samsung Design Membership and MiraeN. I hold a B.A.S. in Art & Technology and a B.S. in Convergence Software from Sogang University. I previously worked as a Research Assistant at Sogang University’s Graduate School of Management of Technology.`

const ESSAY = `I'm passionate about creating technology that brings art and computation together in new ways. 
Over the years, I've focused on making complex tech more approachable - turning things like natural language processing and computer graphics into tools that anyone can use to create. 
I love seeing how people light up when they discover new ways to express themselves, whether it's through generating unique graphics, crafting with paper, or telling stories with AI.`

const RELATED_LINKS = [
  {
    name: 'Email',
    value: 'mailto:yewon11351@gmail.com',
  },
  { name: 'GitHub', value: 'https://github.com/yewoncalli' },
  { name: 'LinkedIn', value: 'https://www.linkedin.com/in/yewon-jang-9270962ba' },
  { name: 'Instagram', value: 'https://www.instagram.com/yewon.calli' },
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
      list: [],
    },
    {
      subject: {
        text: 'Total Museum of Contemporary Art | Researcher in Digital Literacy',
      },
      period: 'Jul 2023 – Jan 2024',
      list: [],
    },
  ],
}

const RECOGNITION_AND_AWARDS = {
  category: 'Recognition & Awards',
  items: [
    {
      subject: {
        text: 'HCI Korea Creative Awards - TypoFold (2025)',
        link: 'https://conference.hcikorea.org/hcik2025/creative/awarded_CA.asp',
      },
      period: '2025',
      list: [],
    },
    {
      subject: {
        text: 'Yuyeon Foundation Scholarship',
      },
      period: '2024',
      list: [{ content: 'Academic Excellence Scholarship' }],
    },
    {
      subject: {
        text: 'HCI Korea Creative Awards - Franklin (2023)',
        link: 'https://conference.hcikorea.org/hcik2023/creative/awarded_CA.asp',
      },
      period: '2023',
      list: [],
    },
    {
      subject: {
        text: 'Naver SW Scholarship',
      },
      period: '2022',
      list: [],
    },
    {
      subject: {
        text: 'First Award, Spin Art Contest 2021',
        link: 'https://qns.science/spinart/',
      },
      period: '2021',
      list: [{ content: 'Institute for Basic Science (IBS) & Center for Quantum Nanoscience (QNS)' }],
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
      period: 'Apr 2025 - Dec 2025',
      list: [],
    },
    {
      subject: {
        text: 'Naver Connect Foundation | Product Manager Internship',
      },
      period: 'May 2023 - Sep 2023',
      list: [],
    },
    {
      subject: {
        text: 'Smilegate Membership for AI | Lead Researcher in Text Generation Coherence',
      },
      period: 'Jul 2022 - Nov 2022',
      list: [],
    },
    {
      subject: {
        text: 'Freelance | UX/UI Designer, Frontend Developer',
      },
      period: 'Jan 2023 - Present',
      list: [],
    },
  ],
}

const LEADERSHIP_EXPERIENCE = {
  category: 'Leadership',
  items: [
    {
      subject: {
        text: 'TypeLab, Seoul-based Code Artist Collective',
        link: 'https://typelab.cc/',
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
  ],
}

const PUBLICATIONS = {
  category: 'Publications',
  items: [
    {
      subject: {
        text: 'TypoFold: A Creative Tool for Converting Code-Art based 3D Typography into Paper craft. Proceedings of HCI Korea, 2025.',
      },
      period: '',
      list: [],
    },
    {
      subject: {
        text: 'Construction of Debiased Korean AI Fairytale Generator. Journal of Digital Contents Society with collaborator Jiin Ahn, Saetbyeol Leeyouk, 2023.',
      },
      period: '',
      list: [],
    },
    {
      subject: {
        text: 'Debiased Korean AI fairytale generator,<Franklin>. Proceedings of HCI Korea with collaborator Jiin Ahn, Saetbyeol Leeyouk, 2023.',
      },
      period: '',
      list: [],
    },
  ],
}

const SELECTED_EXHIBITIONS = {
  category: 'Selected Exhibitions & Screenings',
  items: [
    {
      subject: {
        text: "Upon Hestia's Hearth. Group Exhibition",
      },
      period: '2025',
      list: [{ content: 'Kim Hee Soo Art Center Art Gallery 2' }],
    },
    {
      subject: {
        text: 'The Silver Bell Challenge. Group Exhibition',
      },
      period: '2024',
      list: [{ content: 'ten to the n' }],
    },
    {
      subject: {
        text: 'The 8th International Exhibition on New Media Art',
      },
      period: '2022',
      list: [{ content: 'CICA Museum' }],
    },
    {
      subject: {
        text: 'The 1st Joongang Media Art Competition',
      },
      period: '2022',
      list: [{ content: 'Coex Media Tower/Parnas Media Tower' }],
    },
  ],
}

export default function AboutPage() {
  return (
    <>
      <div className='min-h-dvh w-full h-fit pt-14 md:px-20 bg-white z-10'>
        {/* <PageTitleArea title='About' /> */}
        <div className='flex flex-col w-full h-fit gap-0'>
          <InViewDiv className='w-full h-fit p-8 md:p-8 flex flex-col-reverse md:flex-row justify-between items-stretch gap-12 md:gap-16'>
            {/* left */}
            {/* <NameSection
              jobs={['Computational', 'Designer/Developer']}
              name='Yewon Jang'
              location='Seoul, South Korea'
            /> */}
            <div className='w-full h-full md:w-1/3'>
              <MotionImg
                magnify={false}
                src='/images/about/profile2.jpg'
                alt='Yewon Jang'
                className='w-full aspect-square'
              />
              <InViewDiv className='w-full h-fit flex flex-col pt-4 md:pt-4 md:flex-row justify-end items-start gap-12 md:gap-16'>
                <RelatedLinks links={RELATED_LINKS} />
              </InViewDiv>
            </div>

            <div className='w-full md:w-2/3 flex flex-col'>
              <p className={classNames('w-full h-full', 'text-base md:text-lg leading-2 ')}>{DESCRIPTION}</p>
            </div>
          </InViewDiv>

          <InViewDiv className='w-full h-fit p-8 md:p-8 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16'>
            {/* left */}
            <div className='w-full w-full flex flex-col'>
              <span className='font-semibold text-lg md:text-xl'>Clients</span>
              <Marquee speed={50} gradient={false} className='p-4 md:p-8'>
                {['/images/clients/frame.png', '/images/clients/frame-1.png', '/images/clients/frame-2.png', '/images/clients/frame-3.png', '/images/clients/frame-4.png','/images/clients/frame-5.png','/images/clients/frame-6.png','/images/clients/frame-7.png'].map(
                  (imagePath, index) => (
                    <img
                      key={index}
                      src={imagePath}
                      alt={`Client ${index + 1}`}
                      className='h-44 md:h-44 w-auto mx-8 object-contain'
                    />
                  ),
                )}
              </Marquee>
            </div>
          </InViewDiv>

          <InViewDiv className='w-full p-8 pb-20 md:px-8 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between items-start gap-12 md:gap-16'>
            <div className='flex flex-col gap-8'>
              <HistoryList history={EDUCATION} />
              <HistoryList history={RESEARCH_EXPERIENCE} />
            </div>
            <HistoryList history={RECOGNITION_AND_AWARDS} />
            <div className='flex flex-col gap-8'>
              <HistoryList history={WORK_EXPERIENCE} />
              <HistoryList history={LEADERSHIP_EXPERIENCE} />
            </div>
            <div className='flex flex-col gap-8'>
              <HistoryList history={PUBLICATIONS} />
              <HistoryList history={SELECTED_EXHIBITIONS} />
            </div>
          </InViewDiv>
        </div>
      </div>
      <div className='w-full h-[30dvh] p-8 md:p-8 bg-black text-white sticky bottom-0 flex flex-col justify-center items-center'></div>
    </>
  )
}
