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
    <section className="main-store-preview-container w-full overflow-hidden relative">
      <div className="relative min-h-[30vh] max-h-[50vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            draggable={false}
            className="w-full h-full object-cover"
            src="/from_side_xl.jpg"
            quality="100"
            alt="store preview image"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Text Container */}
        <div className="relative z-10 flex flex-col items-center text-center text-white p-6 md:p-12">
          <Heading
            level="h2"
            className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6 leading-snug md:leading-normal"
          >
            Discover Our Latest Release
          </Heading>
          <Heading
            level="h3"
            className="text-lg md:text-xl font-light mb-6 leading-snug md:leading-normal"
          >
            The pinnacle of our design and craftsmanship
          </Heading>

          {/* CTA Button */}
          <button
            onClick={handleButtonClick}
            className="flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 transition-colors duration-300 shadow-md"
            style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)" }}
          >
            <span className="font-medium text-sm md:text-base uppercase">
              Explore Now
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default StorePreview
//    Classic: The purest expression of our product vision. <br /> More coming soon.
