import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Heading, Text } from "@medusajs/ui"
import Link from "next/link"
import React from "react"

type ProductInfoProps = {
  product: PricedProduct
  include: {
    title?: boolean
    subtitle?: boolean
    description?: boolean
  }
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, include }) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <Link
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </Link>
        )}

        {include?.title && (
          <Heading level="h2" className="text-3xl leading-10 text-ui-fg-base">
            {product.title}
          </Heading>
        )}

        {include?.subtitle && (
          <Heading
            level="h3"
            className="text-medium leading-10 text-ui-fg-base"
          >
            {product.title}
          </Heading>
        )}

        {include?.description && (
          <Text className="text-medium text-ui-fg-subtle">
            {product.description}
          </Text>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
