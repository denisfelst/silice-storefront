import { Heading } from "@medusajs/ui"

const IntroInfo = () => {
  return (
    <section className="info-section max-w-screen-xl bg-white p-8 text-center border border-gray-200 rounded-lg shadow-sm my-2 mx-2 md:mx-4">
      <Heading
        level="h2"
        className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight"
      >
        Get Your Glass Keycaps Individually
      </Heading>
      <div className="border-t-2 border-gray-300 mx-auto w-24 my-4"></div>
      <p className="text-base md:text-lg text-gray-700 leading-relaxed mx-4 md:mx-8">
        <span className="font-bold">Each keycap is uniquely crafted</span> and
        can be customized with various{" "}
        <span className="font-bold">sizes, profiles, and finishes.</span>{" "}
        Personalize each keycap with unique{" "}
        <span className="font-bold">engravings and transparency effects</span>.
      </p>
    </section>
  )
}

export default IntroInfo

//Customize Your Keycaps Individually

//Select individual keycaps or custom groups, and choose from various sizes, profiles, and effects. Personalize with engravings or finishes to perfectly match your style
