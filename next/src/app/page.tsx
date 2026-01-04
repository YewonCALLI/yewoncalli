import { MotionDiv, MotionImageDiv } from '@/components'

export default function Page() {
  return (
    <>
      <MotionDiv
        vimeoId='1151315926'
        className='px-4 md:px-8 w-full h-dvh flex justify-start items-center'
        text='Yewon Jang is an HCI researcher specializing in human-centered tool design. She is skilled in software
        development that entails novel combinations of machine learning, computer graphics, and digital fabrication. Her work received Creative Awards at HCI Korea (2023, 2025).\nCurrently, she is working as a freelance developer.'
      ></MotionDiv>
      <MotionImageDiv
        className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start'
        images={[
          '/images/projects/typofold/Untitled-118.jpg',
          '/images/projects/typofold/Untitled-119.jpg',
          '/images/projects/typofold/Untitled-112.jpeg',
          '/images/projects/typofold/Untitled-61.jpg',
        ]}
        intervalMs={3000}
        title='TypoFold'
        featured='Creative Awards at HCI Korea 2025'
        text='TypoFold is a creative coding tool that transforms 3D typographic forms into printable paper-craft nets, allowing code-generated designs to be cut, folded, and assembled by hand.'
      ></MotionImageDiv>
      <MotionDiv
        vimeoId='1151315926'
        className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start'
        title='XR Science Museum'
        featured='Client Work | MiraeN'
        text='An immersive XR learning platform designed to support conceptual understanding in science education.'
      ></MotionDiv>
      <MotionImageDiv
        className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start'
        title='Silver Bell'
        images={[
          '/images/projects/silver-bell/cover.jpg',
          '/images/projects/silver-bell/Untitled-120.jpg'
        ]}
        featured='Young Artist Support Platform ‘Hwawon:Hongyeongil’ Residency'
        text='An exercise app designed for older adults in Hongyeon-gil, Seoul'
      ></MotionImageDiv>
      <MotionDiv
        vimeoId='1126413221'
        className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start'
        title='Franklin'
        featured='Creative Awards at HCI Korea 2023\nSmilegate AI Membership 2022'
        text='Gender Debiased Korean Fairytale Generator'
      ></MotionDiv>
      <MotionDiv
        vimeoId='1126413221'
        className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start'
        title='Samsung Design Membership 2025\nOnline Exhibition'
      ></MotionDiv>
      <MotionDiv
        vimeoId='1126413221'
        className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start'
        title='Singlet & Multiplet'
        featured='First Award, Spin Art Contest 2021, Institute for Basic Science (IBS) & Center for Quantum Nanoscience (QNS)'
        text=''
      ></MotionDiv>
      <MotionDiv
        vimeoId='1126413221'
        className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start'
        title='Memeproject'
        featured='Plan T House, Hongcheon Art Museum'
        text='An interactive website that explores meme origins, impact, and replication, and helps users create their own memes.'
      ></MotionDiv>
      <MotionDiv
        vimeoId='1126413221'
        className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start'
        title='Simulating #1,2,3'
        featured='ACC Media Cube, Gwangju'
        text=''
      ></MotionDiv>
      <MotionDiv
        vimeoId='1126413221'
        className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start'
        title='Singlet & Multiplet'
        featured='First Award, Spin Art Contest 2021, Institute for Basic Science (IBS) & Center for Quantum Nanoscience (QNS)'
        text=''
      ></MotionDiv>
    </>
  )
}
