import classNames from 'classnames'

export function Footer2026() {
  return (
    <div
      className={classNames(
        'font-old-standard',
        'w-full absolute bottom-0 z-10 inset-x-0 mix-blend-difference text-white flex flex-col-reverse md:flex-row justify-between items-center',
        'px-4 py-10 md:px-6 md:py-4 gap-4 md:gap-6',
      )}
    >
      <div className='justify-start text-sm text-center font-normal capitalize leading-normal'>
        © {new Date().getFullYear()}. All rights reserved.
      </div>
    </div>
  )
}
