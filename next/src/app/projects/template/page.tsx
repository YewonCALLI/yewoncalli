import { ParllaxFrame } from '@/components/ParllaxFrame'

export default function ProjectDetailPage() {
  return (
    <>
      <ParllaxFrame bannerClassName='bg-black text-white' banner={<h1 className='text-4xl p-8 font-bold'>Banner</h1>}>
        <div className='w-full h-fit flex flex-col justify-start items-start pt-32 pb-8 px-8'>
          <h1 className='text-4xl font-bold mb-12'>Content</h1>

          {[...Array(5)].map((_, i) => (
            <div key={i} className='h-96 mb-12'>
              <p>Scroll down to see the sticky effect in action.</p>
              <p>Keep scrolling...</p>
              <p>Almost there...</p>
              <p>You made it!</p>
            </div>
          ))}
        </div>
      </ParllaxFrame>
      <ParllaxFrame bannerClassName='bg-black text-white' banner={<h1 className='text-4xl p-8 font-bold'>Banner</h1>}>
        <div className='w-full h-fit flex flex-col justify-start items-start pt-32 pb-8 px-8'>
          <h1 className='text-4xl font-bold mb-12'>Content</h1>

          {[...Array(5)].map((_, i) => (
            <div key={i} className='h-96 mb-12'>
              <p>Scroll down to see the sticky effect in action.</p>
              <p>Keep scrolling...</p>
              <p>Almost there...</p>
              <p>You made it!</p>
            </div>
          ))}
        </div>
      </ParllaxFrame>
      <ParllaxFrame bannerClassName='bg-black text-white' banner={<h1 className='text-4xl p-8 font-bold'>Banner</h1>}>
        <div className='w-full h-fit flex flex-col justify-start items-start pt-32 pb-8 px-8'>
          <h1 className='text-4xl font-bold mb-12'>Content</h1>

          {[...Array(5)].map((_, i) => (
            <div key={i} className='h-96 mb-12'>
              <p>Scroll down to see the sticky effect in action.</p>
              <p>Keep scrolling...</p>
              <p>Almost there...</p>
              <p>You made it!</p>
            </div>
          ))}
        </div>
      </ParllaxFrame>
    </>
  )
}
