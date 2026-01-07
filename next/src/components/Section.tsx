'use client'

import classNames from 'classnames'

type InViewFrameProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  className?: string
}

export function Section({ children, className, ...rest }: InViewFrameProps) {
  return (
    <div
      className={classNames(
        'w-full relative flex flex-col items-center justify-start',
        className ? className : 'pt-16 pb-16 space-y-4 md:space-y-6',
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
