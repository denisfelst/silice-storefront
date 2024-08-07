import { getCollectionsList } from "@lib/data"
import SkeletonHomepageProducts from "@modules/skeletons/components/skeleton-homepage-products"
import { Metadata } from "next"
import { Suspense } from "react"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Benefits from "@modules/home/components/benefits"
import StorePreview from "@modules/home/components/store-preview"
import HowItWorks from "@modules/home/components/how-it-works"
import HomeImageSlider from "@modules/home/components/home-image-slider"

export const metadata: Metadata = {
  title: "Silice - Glass Keycaps",
  description: "Official Silice Online Store for Glass Keycaps.",
}

export default async function Home() {
  const { collections, count } = await getCollectionsList(0, 3)

  return (
    <>
      <Suspense fallback={<SkeletonHomepageProducts count={count} />}>
        <div className="main-page-container w-full flex flex-col items-center">
          <Hero />
          <div className="w-auto max-w-screen-2xl">
            <HomeImageSlider />
            <Benefits />
            <HowItWorks />
            {/* about us */}
            <StorePreview />
          </div>
        </div>
        {/* <FeaturedProducts collections={collections} /> */}
      </Suspense>
    </>
  )
}
// pattern-lp-bg
