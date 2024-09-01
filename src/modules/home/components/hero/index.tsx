"use client"

import { Heading } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Hero = () => {
  const router = useRouter()

  const handleButtonClick = () => {
    // Navigate to another route
    router.push("/products/classic")
  }

  return (
    <section className="main-hero-container h-[75vh] max-h-[750px] w-full bg-black relative mb-4 md:h-[65vh] lg:max-h-none">
      <div className="absolute z-10 flex flex-col justify-center items-end text-center w-full h-full overflow-hidden">
        {/* Image */}
        <div className="image-container absolute inset-0 min-w-[850px] max-w-screen-xl 2xl:max-w-screen-2xl">
          <Image
            className="opacity-80"
            draggable={false}
            src={"/hero.jpg"}
            quality="100"
            alt="hero image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Headlines */}
        <div
          className="inside-hero relative mb-12 z-10 w-full h-full flex flex-col justify-end items-center md:mb-24"
          style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.7)" }}
        >
          <Heading
            level="h1"
            className="leading-10 text-ui-fg-base font-normal text-white mb-2 text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl 2xl:mb-4"
          >
            Glass Crafted Keycaps
          </Heading>
          <Heading
            level="h2"
            className="text-md leading-6 text-ui-fg-subtle font-normal text-gray-200 mb-4 md:text-xl xl:text-2xl xl:mb-4"
          >
            Discover our glass keycaps, meticulously crafted <br />
            to provide a unique tactile experience and aesthetic appeal.
          </Heading>

          {/* CTA Button */}
          <button
            onClick={handleButtonClick}
            className="flex items-center justify-center px-6 py-3 border-2 border-red-500 text-red-500 rounded-full bg-black bg-opacity-25 hover:bg-opacity-50 transition-colors duration-300 shadow-md"
            style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)" }}
          >
            <span className="font-medium text-sm md:text-base uppercase">
              Shop Now
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
