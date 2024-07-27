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
      <div className="absolute z-10 flex flex-col justify-center items-end text-center w-full h-full overflow-hidden">
        <div className="image-container absolute inset-0 min-w-[850px] max-w-screen-xl 2xl:max-w-screen-2xl">
          <Image draggable={false} src={"/hero.jpg"} quality="100" alt="hero image" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div 
          className="inside-hero relative mb-12 z-10 w-full h-full flex flex-col justify-end items-center " 
          style={{textShadow: "2px 2px 2px rgba(0, 0, 0, 0.7)"}}
        >
          <Heading level="h1" className="leading-10 text-ui-fg-base font-normal text-white mb-2 text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl 2xl:mb-4">
            Glass Crafted Keycaps
          </Heading>
          <Heading level="h2" className="text-md leading-6 text-ui-fg-subtle font-normal text-gray-200 mb-4 md:text-xl xl:text-2xl xl:mb-4">
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
