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
    <section className="main-hero-container h-[75vh] max-h-[750px] w-full relative md:h-[65vh] lg:max-h-none overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover w-full h-full opacity-80"
          draggable={false}
          src="/hero.jpg"
          quality="100"
          alt="hero image"
          layout="fill"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full w-full text-center px-6">
        <div className="bg-gradient-to-b from-transparent to-black bg-opacity-70 p-8 rounded-xl max-w-2xl mx-auto">
          {/* Headline */}
          <Heading
            level="h1"
            className="leading-tight text-white font-bold mb-4 text-3xl md:text-4xl xl:text-5xl"
            style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.8)" }}
          >
            Glass Crafted Keycaps
          </Heading>

          {/* Subheadline */}
          <Heading
            level="h2"
            className="text-lg md:text-xl xl:text-2xl text-gray-300 font-light mb-6"
          >
            The First and Only Glass Keycaps in the Market.
            <br />
            Now at Your Fingertips.
          </Heading>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={handleButtonClick}
              className="flex items-center justify-center px-6 py-3 bg-red-600 text-white text-sm md:text-base uppercase font-medium rounded-full shadow-md hover:bg-red-500 hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
