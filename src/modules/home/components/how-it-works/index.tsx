import { Heading } from "@medusajs/ui"

const HowItWorks = () => {
  return (
    <section className="how-it-works-container w-full max-w-screen-xl bg-gray-50 p-8 rounded-lg shadow-lg mb-4 md:mx-4">
      <div className="flex flex-col items-center">
        <Heading
          className="text-3xl font-semibold text-gray-900 mb-8"
          level="h3"
        >
          How It Works
        </Heading>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="relative flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-6 flex-1 min-w-[250px] max-w-[300px] min-h-[200px]">
            <div className="w-12 h-12 bg-gray-400 text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <span className="text-lg font-semibold text-gray-800">
              Choose your favorite keycap(s).
            </span>
          </div>
          <div className="relative flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-6 flex-1 min-w-[250px] max-w-[300px] min-h-[200px]">
            <div className="w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <span className="text-lg font-semibold text-gray-800">
              We get your order and start producing as soon as the order period
              ends.
            </span>
          </div>
          <div className="relative flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-6 flex-1 min-w-[250px] max-w-[300px] min-h-[200px]">
            <div className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <span className="text-lg font-semibold text-gray-800">
              As soon as we’ve finished producing it, we’ll ship it to you.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
