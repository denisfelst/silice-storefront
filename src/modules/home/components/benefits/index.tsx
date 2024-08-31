import { Heading } from "@medusajs/ui"
import Image from "next/image"

const Benefits = () => {
  return (
    <section className="main-benefits-container flex flex-col md:flex-row w-screen-xl max-w-screen-xl w-full p-6 space-y-6 md:space-y-0 md:space-x-6">
      {/* Benefit Card 1 */}
      <div className="relative w-full bg-white rounded-lg overflow-hidden">
        <Image
          src="/glass1-small.jpg"
          alt="Glass texture"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70"></div>
        <div className="relative flex flex-col justify-center items-center text-center w-full h-full p-6 text-gray-900 font-medium">
          <Heading level="h2" className="mb-4 text-2xl font-semibold">
            Material
          </Heading>
          <span className="mb-4">
            Crafted from premium glass, elevate your typing experience.
          </span>
          <ul className="list-disc text-left space-y-2">
            <li className="flex items-center">
              <i className="fas fa-gem mr-2 text-lg"></i> Premium Glass Billets
            </li>
            <li className="flex items-center">
              <i className="fas fa-shield-alt mr-2 text-lg"></i> High Durability
              & Resistance
            </li>
            <li className="flex items-center">
              <i className="fas fa-eye mr-2 text-lg"></i> Experience: Sight,
              Touch, Sound
            </li>
            <li className="flex items-center">
              <i className="fas fa-lightbulb mr-2 text-lg"></i> Innovative
              Processes & Creations
            </li>
          </ul>
        </div>
      </div>

      {/* Benefit Card 2 */}
      <div className="relative w-full bg-white rounded-lg overflow-hidden">
        <Image
          src="/taller2.jpg"
          alt="Artisan process"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70"></div>
        <div className="relative flex flex-col justify-center items-center text-center w-full h-full p-6 text-gray-900 font-medium">
          <Heading level="h2" className="mb-4 text-2xl font-semibold">
            Artisan Process
          </Heading>
          <span className="mb-4">
            Handcrafted by skilled artisans, every piece is a unique work of
            art.
          </span>
          <ul className="list-disc text-left space-y-2">
            <li className="flex items-center">
              <i className="fas fa-cube mr-2 text-lg"></i> Moldmaking
            </li>
            <li className="flex items-center">
              <i className="fas fa-fire mr-2 text-lg"></i> Glass Casting & Kiln
              Forming
            </li>
            <li className="flex items-center">
              <i className="fas fa-hand-sparkles mr-2 text-lg"></i> Sandering &
              Polishing
            </li>
            <li className="flex items-center">
              <i className="fas fa-pen mr-2 text-lg"></i> Engraving
            </li>
          </ul>
        </div>
      </div>

      {/* Benefit Card 3 */}
      <div className="relative w-full bg-white rounded-lg overflow-hidden">
        <Image
          src="/glass3.jpg"
          alt="Custom keyboard"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70"></div>
        <div className="relative flex flex-col justify-center items-center text-center w-full h-full p-6 text-gray-900 font-medium">
          <Heading level="h2" className="mb-4 text-2xl font-semibold">
            Exclusive & Custom
          </Heading>
          <span className="mb-4">
            Choose your design and size combination for a unique keyboard setup.
          </span>
          <ul className="list-disc text-left space-y-2">
            <li className="flex items-center">
              <i className="fas fa-gem mr-2 text-lg"></i> Unique in the Market
            </li>
            <li className="flex items-center">
              <i className="fas fa-clock mr-2 text-lg"></i> 100% On Demand
            </li>
            <li className="flex items-center">
              <i className="fas fa-sliders-h mr-2 text-lg"></i> Highly
              Customizable
            </li>
            <li className="flex items-center">
              <i className="fas fa-calendar-alt mr-2 text-lg"></i> Limited Time
              Frame Orders
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Benefits
