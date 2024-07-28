import { Heading } from "@medusajs/ui"

const Benefits = () => {
  return (
    <section className="main-benefits-container text-white flex flex-col md:flex-row w-screen-xl max-w-screen-xl w-full">
      <div className="w-full bg-[#454855] transition-colors duration-300 ease-linear hover:bg-[#555865] md:h-[40vh] lg:max-h-none">
        <div className="flex flex-col justify-center items-center text-center w-full h-full overflow-hidden p-6 text-white font-medium">
          <Heading level="h2" className="mb-4 font-semibold text-2xl">
            Material
          </Heading>
          <span>
            Crafted from premium glass, elevate your typing experience.
          </span>
          <div className="px-6 mt-3">
            <ul className="list-disc text-left font-normal">
              <li>Premium Glass Billets</li>
              <li>High Durability & Resistance</li>
              <li>Experience: Sight, Touch, Sound</li>
              <li>Innovative Process & Creations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#737ca1] transition-colors duration-300 ease-linear hover:bg-[#838cb1] md:h-[40vh] lg:max-h-none">
        <div className="flex flex-col justify-center items-center text-center w-full h-full overflow-hidden p-6 text-white font-medium">
          <Heading level="h2" className="mb-4 font-semibold text-2xl">
            Artisan Process
          </Heading>
          <span>
            Handcrafted by skilled artisans, every piece is a unique work of
            art.
          </span>
          <div className="px-6 mt-3">
            <ul className="list-disc text-left font-normal">
              <li>Moldmaking</li>
              <li>Glass Casting & Kiln Forming</li>
              <li>Sandering & Polishing </li>
              <li>Engraving</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#bdc4e0] transition-colors duration-300 ease-linear hover:bg-[#adb4d0] md:h-[40vh] lg:max-h-none">
        <div className="flex flex-col justify-center items-center text-center w-full h-full overflow-hidden p-6 text-white font-medium">
          <Heading level="h2" className="mb-4 font-semibold text-2xl">
            Exclusive & Custom
          </Heading>
          <span>
            Choose your design and size combination for a unique keyboard setup.
          </span>
          <div className="px-6 mt-3">
            <ul className="list-disc text-left font-normal">
              <li>Unique in the Market</li>
              <li>100% On Demand</li>
              <li>Highly Customizable</li>
              <li>Limited Time Frame Orders</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
