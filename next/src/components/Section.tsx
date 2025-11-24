'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

type InViewFrameProps = React.ComponentProps<typeof motion.div> & {
  children: React.ReactNode
  className?: string
}

export function Section({ children, className, ...rest }: InViewFrameProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2, once: true })

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.8, // 800ms
        ease: [0.4, 0, 0.2, 1], // cubic-bezier(.4,0,.2,1)
      }}
      className={`w-full relative ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
