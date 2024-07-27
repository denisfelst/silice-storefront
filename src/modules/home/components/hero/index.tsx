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
    <section className="main-hero-container h-[60vh] max-h-[650px] w-full bg-black relative md:h-[65vh] lg:max-h-none">
      <div className="absolute z-10 flex flex-col justify-end items-end text-center w-full h-full overflow-hidden">
        <div className="image-container absolute min-w-[750px] max-w-screen-xl 2xl:max-w-screen-2xl">
          <Image src={"/hero.jpg"} quality="100" alt="hero image" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="inside-hero relative mb-4 z-10 w-full flex flex-col justify-start items-center xl:h-1/3 xl:w-1/2  2xl:h-1/2">
          <Heading
            level="h1"
            className="leading-10 text-ui-fg-base font-normal text-white mb-2 text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl 2xl:mb-4"
          >
            Glass Crafted Keycaps
          </Heading>
          <Heading
            level="h2"
            className="text-md leading-6 text-ui-fg-subtle font-normal text-gray-200 mb-4 md:text-xl xl:text-2xl xl:mb-4"
            >
            The First and Only Glass Keycaps in the Market.<br/>
            Now at Your Fingertips.
          </Heading>
          <button onClick={handleButtonClick} className="relative flex items-center justify-center p-2 w-36 h-12 bg-red-500 rounded-full hover:bg-red-400 transition-colors duration-300">
            <span className="font-medium text-white text-sm md:text-base uppercase">Shop Now</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
