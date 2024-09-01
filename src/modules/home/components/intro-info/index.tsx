import { Heading } from "@medusajs/ui"

const IntroInfo = () => {
  return (
    <section className="info-section max-w-screen-xl bg-white p-8 mx-4 text-center border border-gray-200 rounded-lg shadow-sm mb-4">
      <Heading
        level="h2"
        className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight"
      >
        Get Your Glass Keycaps Individually
      </Heading>
      <div className="border-t-2 border-gray-300 mx-auto w-24 my-4 md: my-4"></div>
      <p className="text-base md:text-lg text-gray-700 leading-relaxed mx-4 md:mx-8">
        Each keycap is uniquely crafted and can be customized with various
        sizes, profiles, and finishes. Personalize each keycap with unique
        engravings and effects to suit your preferences.
      </p>
    </section>
  )
}

export default IntroInfo

//Customize Your Keycaps Individually

//Select individual keycaps or custom groups, and choose from various sizes, profiles, and effects. Personalize with engravings or finishes to perfectly match your style
