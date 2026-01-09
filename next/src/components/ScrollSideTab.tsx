'use client'

import classNames from 'classnames'
import { useState, useEffect } from 'react'
import { HEADER_HEIGHT } from '@/constants'

interface ScrollSideTabProps {
  activeSection: string
  sectionIds: string[]
}

export const ScrollSideTab = ({ activeSection, sectionIds }: ScrollSideTabProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className={`absolute top-14 xl:top-[${HEADER_HEIGHT}px] py-2 w-full right-0 overflow-x-scroll bg-white pb-3 xl:overflow-auto xl:w-fit h-fit z-10 px-4 md:px-8`}
    >
      <div className='w-fit h-fit flex flex-row xl:flex-col gap-4 justify-start items-end'>
        {sectionIds.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={classNames(
              'capitalize text-base md:text-lg transition-colors duration-300',
              activeSection === section ? 'text-black font-bold' : 'text-black/40 hover:text-black',
            )}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  )
}
