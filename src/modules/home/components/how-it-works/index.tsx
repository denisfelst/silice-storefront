import { Heading } from "@medusajs/ui"

const HowItWorks = () => {
  return (
    <section className="main-intro-container w-full max-w-screen-xl bg-gray-100 p-8 rounded-lg shadow-md">
      <div className="flex flex-col min-h-[20vh]">
        <Heading
          className="self-center mb-6 text-2xl font-semibold text-gray-800"
          level="h3"
        >
          How we operate:
        </Heading>
        <div className="flex flex-col justify-evenly items-center h-full space-y-6 md:flex-row md:space-y-0 md:space-x-6">
          <div className="flex flex-col justify-center items-center text-center h-full w-full md:w-44 p-4 bg-white rounded-lg shadow-sm">
            <span className="text-lg font-bold mb-2">1</span>
            <span>Choose your favorite keycap(s).</span>
          </div>
          <div className="flex flex-col justify-center items-center text-center h-full w-full md:w-44 p-4 bg-white rounded-lg shadow-sm">
            <span className="text-lg font-bold mb-2">2</span>
            <span>
              We get your order and start producing as soon as order period
              ends.
            </span>
          </div>
          <div className="flex flex-col justify-center items-center text-center h-2/3 w-full md:w-44 p-4 bg-white rounded-lg shadow-sm">
            <span className="text-lg font-bold mb-2">3</span>
            <span className="px-2">
              As soon as we&apos;ve finished producing it, we&apos;ll ship it to
              you.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
