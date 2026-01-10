import { MotionDiv, MotionImageDiv, MotionYoutubeDiv } from '@/components'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <MotionDiv
        vimeoId='1151315926'
        className='px-4 md:px-8 w-full h-dvh flex justify-start items-center'
        text='Yewon Jang is an HCI researcher specializing in human-centered tool design. She is skilled in software
        development that entails novel combinations of machine learning, computer graphics, and digital fabrication. Her work received Creative Awards at HCI Korea (2023, 2025).\nCurrently, she is working as a freelance developer.'
      ></MotionDiv>

      <Link href='/projects/typofold' className='w-full'>
        <MotionImageDiv
          className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start cursor-pointer hover:opacity-90 transition-opacity'
          images={[
            '/images/projects/typofold/Untitled-118.jpg',
            '/images/projects/typofold/Untitled-119.jpg',
            '/images/projects/typofold/Untitled-112.jpeg',
            '/images/projects/typofold/Untitled-61.jpg',
          ]}
          intervalMs={3000}
          title='TypoFold'
          featured='Creative Award at HCI Korea 2025'
          text='TypoFold is a creative coding tool that transforms 3D typographic forms into printable paper-craft nets, allowing code-generated designs to be cut, folded, and assembled by hand.'
        ></MotionImageDiv>
      </Link>

      <Link href='/projects/xr-science-museum' className='w-full'>
        <MotionDiv
          vimeoId='1151529949'
          className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start cursor-pointer hover:opacity-90 transition-opacity'
          title='XR Science Museum'
          featured='Client Work | MiraeN'
          text='An immersive XR learning platform designed to support conceptual understanding in science education.'
        ></MotionDiv>
      </Link>

      <Link href='/projects/new-formative' className='w-full'>
        <MotionDiv
          vimeoId='1151368571'
          className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start cursor-pointer hover:opacity-90 transition-opacity'
          title='Samsung Design Membership 2025\nOnline Exhibition'
          featured='Client Work | Samsung Design Membership'
        ></MotionDiv>
      </Link>

      <Link href='/projects/silver-bell' className='w-full'>
        <MotionImageDiv
          className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start cursor-pointer hover:opacity-90 transition-opacity'
          title='Silver Bell'
          images={['/images/projects/silver-bell/cover.jpg', '/images/projects/silver-bell/Untitled-120.jpg']}
          featured="Young Artist Support Platform 'Hwawon:Hongyeongil' Residency"
          text='An exercise app designed for older adults in Hongyeongil, Seoul'
        ></MotionImageDiv>
      </Link>

      <Link href='/projects/franklin' className='w-full'>
        <MotionImageDiv
          className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start cursor-pointer hover:opacity-90 transition-opacity'
          title='Franklin'
          images={['/images/projects/franklin/cover.png']}
          featured='Creative Award at HCI Korea 2023\nSmilegate AI Membership 2022'
          text='Gender Debiased Korean Fairytale Generator'
        ></MotionImageDiv>
      </Link>

      <Link href='/projects/simulating-1-2-3' className='w-full'>
        <MotionDiv
          vimeoId='833905494'
          className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start cursor-pointer hover:opacity-90 transition-opacity'
          title='Simulating #1,2,3'
          featured='ACC Media Cube, Gwangju'
          text='A media art that simulates multiple entities attracting one another through gravity, moving and colliding, to explore uncertainty.'
        ></MotionDiv>
      </Link>

      <Link href='/projects/singlet-multiplet' className='w-full'>
        <MotionYoutubeDiv
          youtubeId='pBTghj77Zhg'
          className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start cursor-pointer hover:opacity-90 transition-opacity'
          title='Singlet & Multiplet'
          featured='First Award, Spin Art Contest 2021, Institute for Basic Science (IBS) & Center for Quantum Nanoscience (QNS)'
          text='Quantum physics based media art performance that connects the process of discovering and embracing various aspects of ego.'
        ></MotionYoutubeDiv>
      </Link>

      <Link href='/projects/memeproject' className='w-full'>
        <MotionImageDiv
          images={['/images/projects/memeproject/memeproject1.jpeg', '/images/projects/memeproject/memeproject2.jpeg']}
          className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start cursor-pointer hover:opacity-90 transition-opacity'
          title='Memeproject'
          featured='Plan T House, Hongcheon Art Museum'
          text='An interactive website that explores meme origins, impact, and replication, and helps users create their own memes.'
        ></MotionImageDiv>
      </Link>

      <Link href='/projects/delta-individualism' className='w-full'>
        <MotionDiv
          vimeoId='1151380515'
          className='px-4 md:px-8 w-full h-dvh flex flex-col justify-center items-start cursor-pointer hover:opacity-90 transition-opacity'
          title='delta-individualism'
          text='An installation work that frames modern society as "high-entropy," linking distorted individualism to hatred, discrimination, and isolation, and proposing Tandava as a collective ritual of renewal toward the common good.'
        ></MotionDiv>
      </Link>
    </>
  )
}
    