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
    <section className="main-hero-container h-[75vh] max-h-[750px] w-full bg-black relative md:h-[65vh] lg:max-h-none">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover w-full h-full opacity-75"
          draggable={false}
          src="/hero.jpg"
          quality="100"
          alt="hero image"
          layout="fill"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full w-full text-center px-6">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg max-w-lg mx-auto shadow-lg">
          {/* Headline */}
          <Heading
            level="h1"
            className="leading-tight text-ui-fg-base font-semibold text-white mb-4 text-3xl md:text-4xl xl:text-5xl"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)" }}
          >
            Glass Crafted Keycaps
          </Heading>

          {/* Subheadline */}
          <Heading
            level="h2"
            className="text-md leading-6 text-ui-fg-subtle font-normal text-gray-300 mb-6 md:text-lg xl:text-xl"
          >
            The First and Only Glass Keycaps in the Market. <br />
            Now at Your Fingertips.
          </Heading>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={handleButtonClick}
              className="flex items-center justify-center px-6 py-3 bg-red-600 rounded-full hover:bg-red-500 transition-transform transform hover:scale-105 duration-300"
            >
              <span className="font-medium text-white text-sm md:text-base uppercase">
                Shop Now
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
