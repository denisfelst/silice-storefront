import { getCollectionsList } from "@lib/data"
import SkeletonHomepageProducts from "@modules/skeletons/components/skeleton-homepage-products"
import { Metadata } from "next"
import { Suspense } from "react"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Benefits from "@modules/home/components/benefits"
import StorePreview from "@modules/home/components/store-preview"

export const metadata: Metadata = {
  title: "Silice - Glass Keycaps",
  description:
    "Official Silice Online Store for Glass Keycaps.",
}

export default async function Home() {
  const { collections, count } = await getCollectionsList(0, 3)

  return (
    <>
      <Suspense fallback={<SkeletonHomepageProducts count={count} />}>
        <div className="w-full flex flex-col items-center">
          <Hero />
          <div className="max-w-screen-2xl ">
            <Benefits />
            <StorePreview />
          </div>
        </div>
        {/* <FeaturedProducts collections={collections} /> */}
      </Suspense>
    </>
  )
}
// pattern-lp-bg 
