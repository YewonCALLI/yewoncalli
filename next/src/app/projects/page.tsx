import { Section } from '@/components'

export default function Page() {
  return (
    <>
      <Section className='px-4 md:px-6 bg-red-100 h-dvh'>
        <h1 className='text-5xl'>Welcome</h1>
      </Section>
      <Section className='px-4 md:px-6 bg-orange-100 h-dvh'>
        <h1 className='text-5xl'>Welcome</h1>
      </Section>
      <Section className='px-4 md:px-6 bg-yellow-100 h-dvh'>
        <h1 className='text-5xl'>Welcome</h1>
      </Section>
      <Section className='px-4 md:px-6 bg-green-100 h-dvh'>
        <h1 className='text-5xl'>Welcome</h1>
      </Section>
    </>
  )
}
