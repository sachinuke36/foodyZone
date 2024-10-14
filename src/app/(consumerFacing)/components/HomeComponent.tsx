import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const HomeComponent = () => {
  return (
    <div className=' w-[100%] sm:w-[90%] md:w-[80%]  relative border rounded-lg mx-auto '>
        <Image
            src={'/homepage2.jpg'}
            alt=''
            width={10000}
            height={100}
            className='border h-[400px] w-[100%] lg:h-[470px] md:h-[470px] rounded-lg '
        />
        <div className='absolute bottom-[130px] sm:bottom-[150px] md:bottom-[180px] p-2 sm:p-3 md:p-5 flex flex-col gap-1 sm:gap-2 md:gap-4'>
            <h1 className='font-extrabold text-white text-[25px] sm:text-[30px] md:text-[50px] '>Order Your favourite food </h1>
            <p className='text-neutral-400 text-sm md:text-lg'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our meal satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <Button  className='bg-red-500 w-[100px] md:w-[200px] hover:bg-red-300 hover:text-red-900'>View Menu</Button>
        </div>
    </div>
  )
}

export default HomeComponent
