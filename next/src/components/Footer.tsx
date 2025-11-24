import classNames from 'classnames'

export function Footer() {
  const snsLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/yewon.calli/' },
    { name: 'Github', url: 'https://github.com/YewonCALLI' },
  ]

  return (
    <div
      className={classNames(
        'w-full flex flex-col-reverse md:flex-row justify-between items-center',
        'px-4 py-10 md:px-6 md:py-4 gap-4 md:gap-6',
      )}
    >
      <div className='justify-start text-sm text-center font-normal capitalize leading-normal'>
        © {new Date().getFullYear()} Yewon Jang
      </div>
      <div className='w-fit inline-flex justify-center items-center gap-4 md:gap-10'>
        {snsLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target='_blank'
            rel='noopener noreferrer'
            className='justify-start text-sm font-medium underline uppercase leading-tight hover:opacity-70 active:scale-95 transition-all'
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  )
}
