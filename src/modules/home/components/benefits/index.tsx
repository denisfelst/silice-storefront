import { Heading } from "@medusajs/ui"

const Benefits = () => {
  return (
    <section className="main-benefits-container text-white flex flex-col md:flex-row max-w-screen-xl">
      <div className="h-[30vh] max-h-[370px] w-full bg-[#454855] transition-colors duration-300 ease-linear hover:bg-[#555865] md:h-[40vh] lg:max-h-none">
        <div className="flex flex-col justify-center items-center text-center w-full h-full overflow-hidden p-5 text-white font-medium">
          <Heading level="h2" className="mb-4 font-semibold text-2xl">
            Material
          </Heading>
          <span>
            Crafted from premium glass, our keycaps offer unmatched clarity,
            elegance, and durability, elevating your keyboard with a touch of
            sophistication.
          </span>
          <br />
          <ul>
            <li>Premium Glass Billets</li>
            <li>High Durability & Resistance</li>
            <li>Experience: Sight, Touch, Sound</li>
            <li>Innovative Process & Creations</li>
          </ul>
        </div>
      </div>

      <div className="h-[30vh] max-h-[370px] w-full relative bg-[#737ca1] transition-colors duration-300 ease-linear hover:bg-[#838cb1] md:h-[40vh] lg:max-h-none">
        <div className="flex flex-col justify-center items-center text-center w-full h-full overflow-hidden p-5 text-white font-medium">
          <Heading level="h2" className="mb-4 font-semibold text-2xl">
            Artisan Process
          </Heading>
          <span>
            Handcrafted by skilled artisans, each keycap is a testament to
            precision and quality, ensuring every piece is a unique work of art.
          </span>
          <br />
          <ul>
            <li>Moldmaking</li>
            <li>Glass Casting & Kiln Forming</li>
            <li>Sandering & Polishing </li>
            <li>Engraving</li>
          </ul>
        </div>
      </div>

      <div className="h-[30vh] max-h-[370px] w-full relative bg-[#bdc4e0] transition-colors duration-300 ease-linear hover:bg-[#adb4d0] md:h-[40vh] lg:max-h-none">
        <div className="flex flex-col justify-center items-center text-center w-full h-full overflow-hidden p-5 text-white font-medium">
          <Heading level="h2" className="mb-4 font-semibold text-2xl">
            Exclusive & Custom
          </Heading>
          <span>
            Enjoy customization with our glass keycaps, allowing you to choose
            from different design and size combination for a unique keyboard
            setup
          </span>
          <br />
          <ul>
            <li>Limited Time Frame Orders</li>
            <li>100% On Demand: You Order, We Make it</li>
            <li>Highly Customized keycaps</li>
            <li>The Only Glass Keycaps Available Worldwide</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Benefits
