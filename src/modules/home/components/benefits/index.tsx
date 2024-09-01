import { Heading } from "@medusajs/ui"
import Image from "next/image"

const Benefits = () => {
  return (
    <section className="main-benefits-container flex flex-col md:flex-row w-screen-xl max-w-screen-xl w-full py-4 md:p-4 space-y-6 md:space-y-0 md:space-x-6">
      {/* Benefit Card 1 */}
      <div className="relative w-full bg-gray-100 md:rounded-sm overflow-hidden">
        <Image
          src="/glass1-small.jpg"
          alt="Glass texture"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white">
          <div className="text-center p-6">
            <Heading
              level="h2"
              className="mb-4 text-3xl font-semibold leading-none"
            >
              Material
            </Heading>
            <p className="text-lg">
              Crafted from premium glass, elevate your typing experience.
            </p>
          </div>
        </div>
      </div>

      {/* Benefit Card 2 */}
      <div className="relative w-full bg-gray-100 md:rounded-sm overflow-hidden">
        <Image
          src="/taller2.jpg"
          alt="Artisan process"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white">
          <div className="text-center p-6">
            <Heading
              level="h2"
              className="mb-4 text-3xl font-semibold leading-none"
            >
              Artisan Process
            </Heading>
            <p className="text-lg">
              Handcrafted by skilled artisans, every piece is a unique work of
              art.
            </p>
          </div>
        </div>
      </div>

      {/* Benefit Card 3 */}
      <div className="relative w-full bg-gray-100 md:rounded-sm overflow-hidden">
        <Image
          src="/glass3.jpg"
          alt="Custom keyboard"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white">
          <div className="text-center p-6">
            <Heading
              level="h2"
              className="mb-4 text-3xl font-semibold leading-none"
            >
              Exclusive & Custom
            </Heading>
            <p className="text-lg">
              Choose your design and size combination for a unique keyboard
              setup.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
