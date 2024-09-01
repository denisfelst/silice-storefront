import { Heading } from "@medusajs/ui"
import Image from "next/image"

const AboutUsSection = () => {
  return (
    <section className="about-us-section w-full bg-white py-16 px-8">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 order-2 md:order-1 text-center md:text-left md:pr-8 mt-8 md:mt-0">
          <Heading
            level="h2"
            className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900"
          >
            Who We Are
          </Heading>
          <div className="border-t-2 border-[#87c4ef] w-24 my-4"></div>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            We're a passionate team of glassmakers, designers, and keycap
            enthusiasts, who came together with a unique vision:{" "}
            <span className="font-bold">
              creating keycaps entirely out of glass.
            </span>
            <br />
            Since then, we've dedicated ourselves to crafting this powerful
            material into beautiful keycaps for the community.
          </p>
        </div>
        <div className="md:w-1/2 order-1 md:order-2 mb-8 md:mb-0">
          <Image
            draggable={false}
            className="w-full h-auto rounded-tl-[80px] shadow-lg"
            src="/about-us1.jpg"
            width={0}
            height={0}
            sizes="100vw"
            quality="100"
            alt="about us image"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutUsSection
