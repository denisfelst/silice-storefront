import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useMemo, useState } from "react"
import { FormatValueEnum, OptionsEnum } from "../model/constants"
import { SelectOptions } from "../model/select-options"

type ProductActionsProps = {
  product: PricedProduct
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  // {format, type, size}
  const [selectedOptions, setSelectedOptions] = useState<SelectOptions>(
    new SelectOptions()
  )

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const updateSelectionHandler = (
    selectedValue: string,
    option: Record<string, string>
  ): void => {
    if (!selectedValue || !option) {
      console.error("Undefined selection value")
    }

    updateOptions(option)

    const newSelectedOptions = new SelectOptions({
      format: selectedOptions.format,
      type: selectedOptions.type,
      size: selectedOptions.size,
    })

    newSelectedOptions.setValue(selectedValue)
    setSelectedOptions(newSelectedOptions)
  }

  // should show element option (e.g. size) depending on what is already selected
  const showOption = (title: string): boolean => {
    title = title.toLowerCase()

    if (title === OptionsEnum.Format) {
      return true
    } else if (title === OptionsEnum.Type) {
      if (selectedOptions.format === FormatValueEnum.Group) {
        return true
      }
      return false
    } else if (title === OptionsEnum.Size) {
      if (selectedOptions.format === FormatValueEnum.Single) {
        return true
      }
      return false
    } else return true
  }

  const handleAddToCart = () => {
    // if (options[FORMAT_KEY].toLowerCase() === OPTION_VALUES.format.group) {
    //   options[SIZE_KEY] = NULL
    // } else if (
    //   options[FORMAT_KEY].toLowerCase() === OPTION_VALUES.format.single
    // ) {
    //   options[GROUP_TYPE_KEY] = NULL
    // }
    // for (const key in options) {
    //   updateOptions({ key: options[key] })
    // }
    // setSelectedOptions(selectedOptions.map((opt) => (opt === "" ? NULL : opt)))
    // addToCart(options)
    // setSelectedOptions(["", "", ""])
  }

  return (
    <div className="flex flex-col gap-y-2">
      {product.collection && (
        <Link
          href={`/collections/${product.collection.handle}`}
          className="text-small-regular text-gray-700"
        >
          {product.collection.title}
        </Link>
      )}
      <h3 className="text-xl-regular">{product.title}</h3>

      <p className="text-base-regular">{product.description}</p>

      {product.variants.length > 1 && (
        <div className="my-8 flex flex-col gap-y-6">
          {(product.options || []).map((option, index) => {
            return showOption(option.title) ? (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={updateSelectionHandler}
                  title={option.title}
                />
              </div>
            ) : null
          })}
        </div>
      )}

      <div className="mb-4">
        {selectedPrice ? (
          <div className="flex flex-col text-gray-700">
            <span
              className={clsx("text-xl-semi", {
                "text-rose-600": selectedPrice.price_type === "sale",
              })}
            >
              {/* {!(selectedOptions[1] == "" && selectedOptions[2] == "")
                ? selectedPrice.calculated_price
                : "To Be Defined..."} */}
            </span>
            {selectedPrice.price_type === "sale" && (
              <>
                <p>
                  <span className="text-gray-500">Original: </span>
                  <span className="line-through">
                    {selectedPrice.original_price}
                  </span>
                </p>
                <span className="text-rose-600">
                  -{selectedPrice.percentage_diff}%
                </span>
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <Button onClick={handleAddToCart}>
        {!inStock ? "Out of stock" : "Add to cart"}
      </Button>
    </div>
  )
}

export default ProductActions
