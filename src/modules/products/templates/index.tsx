"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  ProductProvider,
  useProductActions,
} from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import ProductInfo from "@modules/products/templates/product-info"
import ProductTabs from "@modules/products/components/product-tabs"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ProductActions from "../components/product-actions"
import ImageCarousel from "../components/image-carousel"
import useProductPrice from "@lib/hooks/use-product-price"

type ProductTemplateProps = {
  product: PricedProduct
}

const ProductTemplateInner: React.FC<ProductTemplateProps> = ({ product }) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false)

  const infoRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(infoRef, "0px")
  const { variant } = useProductActions()
  const price = useProductPrice({ id: product.id!, variantId: variant?.id })
  const cheapestPrice = price?.cheapestPrice?.calculated_price

  useEffect(() => {
    const onboarding = window.sessionStorage.getItem("onboarding")
    setIsOnboarding(onboarding === "true")
  }, [])

  return (
    <ProductProvider product={product}>
      <div className="content-container flex flex-col w-11/12 items-start py-6 relative">
        <div className="info-and-carousel w-full  flex flex-col lg:flex-row lg:h-1/2 lg:mb-6">
          <div className="carousel-container w-full max-h-screen lg:w-1/2">
            <ImageCarousel images={product.images}></ImageCarousel>
          </div>
          <div className="w-full flex flex-col items-start p-3 lg:py-8 lg:px-10 lg:w-1/2">
            <ProductInfo
              product={product}
              include={{ title: true, subtitle: true }}
            />
            {cheapestPrice && <span>From {cheapestPrice}</span>}
            <div className="w-full flex flex-col lg:top-48 lg:py-0 py-2 gap-y-12">
              {isOnboarding && <ProductOnboardingCta />}
              <ProductActions product={product} />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col lg:top-48 py-6 gap-y-6 lg:py-8">
          <ProductTabs product={product} />
        </div>
      </div>
    </ProductProvider>
  )
}

// MOBILE OPTIONS MODAL POPUP & RELATED PRODUCTS
// {/* Dont show related products */}
// {/* <div className="content-container my-16 px-6 sm:px-8 sm:my-32">
//   <RelatedProducts product={product} />
// </div> */}
// {/* <MobileActions product={product} show={!inView} /> */}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => (
  <ProductProvider product={product}>
    <ProductTemplateInner product={product} />
  </ProductProvider>
)

export default ProductTemplate
