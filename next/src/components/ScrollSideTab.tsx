'use client'

import classNames from 'classnames'
import { useState, useEffect } from 'react'

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
    <div className='fixed top-20 left-0 w-fit h-fit z-20 px-4 md:px-8'>
      <div className='w-fit h-fit flex flex-col gap-4 justify-start items-start'>
        {sectionIds.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={classNames(
              'capitalize text-base md:text-lg transition-colors duration-300',
              activeSection === section ? 'text-black font-semibold' : 'text-black/40 hover:text-black',
            )}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  )
}
