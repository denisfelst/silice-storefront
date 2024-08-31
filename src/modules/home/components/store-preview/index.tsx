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
    <section className="main-store-preview-container max-w-screen overflow-hidden max-w-[100vw]">
      <div className="relative min-h-[30vh] h-full max-h-[35vh] min-w-[400px] max-w-screen-xl">
        <div className="text-container w-full h-full flex flex-col justify-center items-center absolute font-normal text-gray-800">
          <Heading level="h2" className="mb-2 text-xl 2xl:text-2xl 2xl:mb-4">
            Check out our newest release
          </Heading>
          <Heading
            level="h3"
            className="text-md mb-4 md:text-sm xl:text-md 2xl:text-lg 2xl:mb-4"
          >
            The purest expression of our product vision
          </Heading>
          <button
            onClick={handleButtonClick}
            className="relative bg-transparent text-red-500 font-bold border-b-2 border-gray-800 py-2 px-4 transition-colors duration-300 ease-in-out hover:text-yellow-500 hover:border-gray-600"
          >
            <span>Shop</span>
          </button>
        </div>
        <div className="w-full overflow-hidden">
          <Image
            draggable={false}
            className="w-full h-full object-cover"
            src={"/from_side_xl.jpg"}
            quality="100"
            alt="store preview image"
            width={0}
            height={0}
            sizes="fill"
            style={{ width: "100%", height: "auto", minHeight: "30vh" }}
          />
        </div>
      </div>
    </section>
  )
}

export default StorePreview
