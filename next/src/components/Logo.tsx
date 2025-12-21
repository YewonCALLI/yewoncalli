interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export const Logo = ({ size = 'md' }: LogoProps) => {
  const commonClasses = 'font-medium leading-none inline-block'

  const Main = () => {
    return <span className=''>Yewon Jang</span>
  }

  if (size === 'xs') {
    return (
      <span className={`text-sm ${commonClasses}`}>
        <Main />
      </span>
    )
  } else if (size === 'sm') {
    return (
      <span className={`text-base ${commonClasses}`}>
        <Main />
      </span>
    )
  } else if (size === 'md') {
    return (
      <span className={`text-lg ${commonClasses}`}>
        <Main />
      </span>
    )
  } else if (size === 'lg') {
    return (
      <span className={`text-xl ${commonClasses}`}>
        <Main />
      </span>
    )
  }
}
