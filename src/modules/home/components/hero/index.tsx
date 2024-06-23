'use client';

import {  Heading } from "@medusajs/ui"
import { useRouter } from 'next/navigation';
import Image from 'next/image';


const Hero = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    // Navigate to another route
    router.push('/products/classic');
  };


  return (
    <div className="main-hero-container h-[70vh] w-full border-b border-ui-border-base bg-ui-bg-subtle bg-black relative lg:overflow-hidden">
      <div className="absolute z-10 flex flex-col justify-end items-end text-center w-full h-full lg:overflow-hidden">
        <Image src={"/hero.jpg"} alt="hero image" width={0} height={0} sizes="100vw" className="absolute inset-0 z-0" style={{ width: '100%', height: 'auto' }}/>
        <div className="inside-hero relative z-10 border border-green-500 lg:border-red-500 w-full h-1/3 flex flex-col justify-start items-center lg:w-1/2 lg:h-1/2 ">
          <span>
            <Heading
              level="h1"
              className="text-3xl leading-10 text-ui-fg-base font-normal text-white mb-2"
            >
              Glass Crafted Keycaps
            </Heading>
            <Heading
              level="h2"
              className="text-xl leading-6 text-ui-fg-subtle font-normal text-gray-100 mb-4"
              >
              The First and Only Glass Keycaps in the Market. <br/>
              Now at Your Fingertips.
            </Heading>
          </span>
            <button onClick={handleButtonClick} className="relative flex flex-col items-start p-1 gap-2 w-36 h-14">
              <div className="flex items-center justify-center p-4 gap-2 w-full h-full rounded-full bg-gradient-to-r from-red-500 to-red-500 hover:to-red-300">
                <span className="font-bold text-white uppercase text-md">Shop Now</span>
              </div>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
