import { Heading } from "@medusajs/ui"

const HowItWorks = () => {
  return (
    <section className="how-it-works-container w-full max-w-screen-xl bg-gray-50 p-8 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <Heading
          className="text-3xl font-semibold text-gray-900 mb-8"
          level="h3"
        >
          How It Works
        </Heading>
        <div className="relative">
          <div className="absolute inset-0 flex flex-col items-center">
            <div className="border-l-2 border-gray-300 absolute h-full left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="relative flex flex-col items-center text-center bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-keyboard text-2xl"></i>{" "}
                {/* Font Awesome icon */}
              </div>
              <span className="text-lg font-semibold text-gray-800">
                Choose your favorite keycap(s).
              </span>
            </div>
            <div className="relative flex flex-col items-center text-center bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-cogs text-2xl"></i>{" "}
                {/* Font Awesome icon */}
              </div>
              <span className="text-lg font-semibold text-gray-800">
                We get your order and start producing as soon as the order
                period ends.
              </span>
            </div>
            <div className="relative flex flex-col items-center text-center bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-truck text-2xl"></i>{" "}
                {/* Font Awesome icon */}
              </div>
              <span className="text-lg font-semibold text-gray-800">
                As soon as we’ve finished producing it, we’ll ship it to you.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
