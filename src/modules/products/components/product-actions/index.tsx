import {
  useProductActions,
  ProductProvider,
} from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  EngravingEnum,
  FormatValueEnum,
  InfoObjectType,
  NullValue,
  OptionsEnum,
  SizeValueEnum,
  TypeValueEnum,
} from "@lib/constants"
import { SelectOptions } from "../model/select-options"
import AdditionalInfo from "../product-additional-info"
import { useStore } from "@lib/context/store-context"

type ProductActionsProps = {
  product: PricedProduct
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  const { updateAdditionalInfo } = useStore()

  // {format, type, size, engraving}
  const [selectedOptions, setSelectedOptions] = useState<SelectOptions>(
    new SelectOptions()
  )
  const [showLetterInput, setShowLetterInput] = useState<boolean>(false)
  const [currentInfo, setCurrentInfo] = useState<string>("")
  const [infoObject, setInfoObject] = useState<InfoObjectType>()

  useEffect(() => {
    if (
      selectedOptions.engraving === EngravingEnum.Yes &&
      selectedOptions.size !== NullValue
    ) {
      setShowLetterInput(true)
    } else {
      setShowLetterInput(false)
    }
    updateOptionsFromSelection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions])

  useEffect(() => {
    infoObject && updateAdditionalInfo(infoObject)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoObject])

  const additionalInfoRef = useRef(null)

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice } = price
    return variantPrice || null
  }, [price])

  const updateSelectionHandler = (
    selectedValue: string,
    option: Record<string, string>
  ): void => {
    if (!selectedValue || !option) {
      console.error("Undefined selection value")
    }

    const newSelectedOptions = new SelectOptions({
      format: selectedOptions.format,
      type: selectedOptions.type,
      size: selectedOptions.size,
      engraving: selectedOptions.engraving,
    })

    updateOptions(option) // add new selection to options
    newSelectedOptions.setValue(selectedValue)
    setSelectedOptions(newSelectedOptions)
  }

  const updateOptionsFromSelection = () => {
    let newOptions = Object.assign({}, options)
    let formatKey, sizeKey, typeKey, engravingKey // options keys

    for (const key in newOptions) {
      if (newOptions.hasOwnProperty(key) && newOptions[key] === undefined) {
        newOptions[key] = NullValue // set nullValue to undefined options
      } else {
        const value = newOptions[key]
        if (
          value === FormatValueEnum.Single ||
          value === FormatValueEnum.Group
        ) {
          formatKey = key
        } else if (
          value === TypeValueEnum.Asdw ||
          value === TypeValueEnum.Arrows ||
          value === TypeValueEnum.FRow
        ) {
          typeKey = key
        } else if (
          value === SizeValueEnum.Unit ||
          value === SizeValueEnum.Spacebar ||
          value === SizeValueEnum.Shift ||
          value === SizeValueEnum.Ctrl
        ) {
          sizeKey = key
        } else if (value === EngravingEnum.Yes || value === EngravingEnum.No) {
          engravingKey = key
        }
      }
    }

    // update values with selectedOptions
    if (formatKey && newOptions[formatKey] !== selectedOptions.format) {
      newOptions[formatKey] = selectedOptions.format
    }
    if (typeKey && newOptions[typeKey] !== selectedOptions.type) {
      newOptions[typeKey] = selectedOptions.type
    }
    if (sizeKey && newOptions[sizeKey] !== selectedOptions.size) {
      newOptions[sizeKey] = selectedOptions.size
    }
    if (
      engravingKey &&
      newOptions[engravingKey] !== selectedOptions.engraving
    ) {
      newOptions[engravingKey] = selectedOptions.engraving
    }

    updateOptions(newOptions)
  }

  // should show element option (e.g. size) depending on what is already selected
  const showOption = (title: string): boolean => {
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
    } else if (title === OptionsEnum.Engraving) {
      if (
        selectedOptions.size !== NullValue ||
        selectedOptions.type !== NullValue
      ) {
        return true
      }
      return false
    } else return true
  }

  const handleAdditionalInfo = () => {
    //@ts-ignore
    // Call resetInfo from AdditionalInfo component
    additionalInfoRef.current?.resetInfo()
    setCurrentInfo("")
    setShowLetterInput(false)

    if (selectedOptions.engraving === EngravingEnum.Yes) {
      setInfoObject({
        variant_id: variant?.id ?? "",
        variant_title: selectedOptions.getFullTitle(),
        letters: currentInfo !== "" ? currentInfo : "",
      })
    }
  }

  const handleAddToCart = () => {
    addToCart(options)
    handleAdditionalInfo()
    selectedOptions.resetOptions()
    setSelectedOptions(selectedOptions)
  }

  const setAdditionalInfo = (info: string) => {
    setCurrentInfo(info)
  }

  // order the way in which the options should be displayed
  const getOrderedProductOptions = (): any[] => {
    const customOrder = selectedOptions.getOrderedOptions()

    const sortedOptions = product?.options
      ? product.options.sort((a, b) => {
          const titleAIndex = customOrder.indexOf(a.title)
          const titleBIndex = customOrder.indexOf(b.title)

          if (titleAIndex !== -1 && titleBIndex !== -1) {
            return titleAIndex - titleBIndex
          }

          if (titleAIndex !== -1) {
            return -1
          }

          if (titleBIndex !== -1) {
            return 1
          }

          return 0
        })
      : []

    return sortedOptions
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

      {product.variants.length > 1 && (
        <div className="my-8 flex flex-col gap-y-6">
          {getOrderedProductOptions().map((option) => {
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

      {showLetterInput && (
        <div>
          <AdditionalInfo ref={additionalInfoRef} getInfo={setAdditionalInfo} />
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
              {selectedPrice.calculated_price ??
                "Price unavailable. Add it to the basket to see its price."}
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

      {selectedOptions.isSelectionComplete(currentInfo) ? (
        <Button onClick={handleAddToCart}>
          {/* {!inStock ? "Out of stock" : "Add to cart"} */}
          Add to cart
        </Button>
      ) : (
        <span className="text-rose-600">Select all options</span>
      )}
    </div>
  )
}

export default ProductActions
