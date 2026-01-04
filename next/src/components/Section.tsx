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
        className ? className : 'pt-20 pb-24 space-y-2 md:space-y-4',
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
