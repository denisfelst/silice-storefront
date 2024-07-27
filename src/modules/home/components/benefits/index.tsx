import {  Heading } from "@medusajs/ui"


const Benefits = () => {

  return (
    <section className="main-benefits-container text-white flex flex-col md:flex-row">

      <div className="h-[30vh] max-h-[450px] w-full bg-[#454855] transition-colors duration-300 ease-linear hover:bg-[#555865] md:h-[40vh] lg:max-h-none">
        <div className="flex justify-center items-center text-center w-full h-full overflow-hidden">
          <span>
            <Heading level="h3">Material</Heading>
          </span>
        </div>
      </div>

      <div className="h-[30vh] max-h-[450px] w-full relative bg-[#737ca1] transition-colors duration-300 ease-linear hover:bg-[#838cb1] md:h-[40vh] lg:max-h-none">
        <div className="flex justify-center items-center text-center w-full h-full overflow-hidden">
          <span>
            <Heading level="h3">Artisan Process</Heading>
          </span>
        </div>
      </div>

      <div className="h-[30vh] max-h-[450px] w-full relative bg-[#bdc4e0] transition-colors duration-300 ease-linear hover:bg-[#adb4d0] md:h-[40vh] lg:max-h-none">
        <div className="flex justify-center items-center text-center w-full h-full overflow-hidden">
          <span>
            <Heading level="h3">Exclusive & Custom</Heading>
          </span>
        </div>
      </div>
  
    </section>
  )
}

export default Benefits
