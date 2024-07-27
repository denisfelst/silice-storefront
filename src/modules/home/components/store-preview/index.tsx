'use client';

import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import { useRouter } from 'next/navigation';


const StorePreview = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    // Navigate to another route
    router.push('/products/classic');
  };
  
  return (
    <section className="main-store-preview-container max-w-screen-xl">

      <div className="relative min-h-[30vh] h-full max-h-[35vh] min-w-[400px] max-w-screen-xl 2xl:max-w-screen-2xl">
        <div className="text-container absolute">
          <Heading level="h2" className="font-normal text-white mb-2 text-lg md:text-md xl:text-lg 2xl:text-xl 2xl:mb-4">
            Check out our newest release
          </Heading>
          <Heading level="h3">Our purest expression of our product vision</Heading>
          <button className="relative bg-transparent text-white border-b-2 border-gray-800 py-2 px-4 transition-colors duration-300 ease-in-out hover:text-gray-600 hover:border-gray-600">
            Shop
          </button>
        </div>
        <div className="w-full overflow-hidden">
          <Image className="w-full h-full object-cover" src={"/from_side.jpg"} quality="100" alt="store preview image" width={0} height={0} sizes="fill" style={{ width: '100%', height: 'auto', minHeight: '30vh' }} />
        </div>
      </div>

    </section>
  )
}

export default StorePreview
