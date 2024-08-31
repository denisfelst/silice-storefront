"use client"

import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import { useRouter } from "next/navigation"

const StorePreview = () => {
  const router = useRouter()

  const handleButtonClick = () => {
    // Navigate to another route
    router.push("/products/classic")
  }

  return (
    <section className="main-store-preview-container max-w-[100vw] overflow-hidden relative">
      <div className="relative min-h-[40vh] max-h-[45vh] flex flex-col justify-center items-center">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            draggable={false}
            className="w-full h-full object-cover"
            src="/from_side_xl.jpg"
            quality="100"
            alt="store preview image"
            layout="fill"
          />
        </div>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Text Container */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center text-white p-6 md:p-12">
          <Heading
            level="h2"
            className="text-2xl md:text-3xl font-semibold mb-4"
          >
            Check out our newest release
          </Heading>
          <Heading level="h3" className="text-lg md:text-xl font-normal mb-6">
            The purest expression of our product vision
          </Heading>

          {/* CTA Button */}
          <button
            onClick={handleButtonClick}
            className="relative bg-red-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-red-400 transition-transform transform hover:scale-105 duration-300"
          >
            Shop
          </button>
        </div>
      </div>
    </section>
  )
}

export default StorePreview
