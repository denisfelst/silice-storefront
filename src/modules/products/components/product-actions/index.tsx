import { useProductActions } from "@lib/context/product-context"
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
  CombinationValueEnum,
  ProfileValueEnum,
  RowValueEnum,
  MatchingRowsBySize,
  MatteEnum,
} from "@lib/constants"
import { SelectOptions } from "../model/select-options"
import AdditionalInfo, { AdditionalInfoType } from "../product-additional-info"
import { useStore } from "@lib/context/store-context"

type ProductActionsProps = {
  product: PricedProduct
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  const { addAdditionalInfo } = useStore()

  // {format, type, size, engraving}
  const [selectedOptions, setSelectedOptions] = useState<SelectOptions>(
    new SelectOptions()
  )
  const [showLetterInput, setShowLetterInput] = useState<boolean>(false)
  const [currentInfo, setCurrentInfo] = useState<AdditionalInfoType>(
    new AdditionalInfoType("", "")
  )
  const [infoObject, setInfoObject] = useState<InfoObjectType>()

  useEffect(() => {
    // Show letter input -> Single OR Group cases
    if (shouldShowLetterInput()) {
      setShowLetterInput(true)
    } else {
      setShowLetterInput(false)
    }
    updateOptionsFromSelection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions])

  useEffect(() => {
    infoObject && addAdditionalInfo(infoObject)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoObject])

  const additionalInfoRef = useRef(null)

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice } = price
    return variantPrice || null
  }, [price])

  const shouldShowLetterInput = () =>
    // ONLY IF SINGLE
    selectedOptions.format === FormatValueEnum.Single &&
    selectedOptions.profile !== NullValue &&
    selectedOptions.size !== NullValue &&
    selectedOptions.row !== NullValue &&
    selectedOptions.matte !== NullValue &&
    selectedOptions.engraving === EngravingEnum.Yes

  const updateSelectionHandler = (
    selectedValue: string,
    option: Record<string, string>
  ): void => {
    if (!selectedValue || !option) {
      console.error("Undefined selection value")
    }

    const newSelectedOptions = new SelectOptions({
      format: selectedOptions.format,
      profile: selectedOptions.profile,
      size: selectedOptions.size,
      row: selectedOptions.row,
      combination: selectedOptions.combination,
      matte: selectedOptions.matte,
      engraving: selectedOptions.engraving,
    })

    updateOptions("---", option) // add new selection to options
    newSelectedOptions.setValue(selectedValue)
    setSelectedOptions(newSelectedOptions)
  }

  const updateOptionsFromSelection = () => {
    let newOptions = Object.assign({}, options)
    let formatKey,
      profileKey,
      sizeKey,
      rowKey,
      combinationKey,
      matteKey,
      engravingKey // options keys

    for (const key in newOptions) {
      if (newOptions.hasOwnProperty(key) && newOptions[key] === undefined) {
        newOptions[key] = NullValue // set nullValue to undefined options
      } else {
        const value = newOptions[key]

        switch (true) {
          case isValidFormat(value):
            formatKey = key
            break
          case isValidCombination(value):
            combinationKey = key
            break
          case isValidProfile(value):
            profileKey = key
            break
          case isValidSize(value):
            sizeKey = key
            break
          case isValidRow(value):
            rowKey = key
            break
          case isValidEngraving(value):
            engravingKey = key
            break
          case isValidMatte(value):
            matteKey = key
            break
          default:
            break
        }
      }
    }

    // update values with selectedOptions
    if (formatKey && newOptions[formatKey] !== selectedOptions.format) {
      newOptions[formatKey] = selectedOptions.format
    }
    if (
      combinationKey &&
      newOptions[combinationKey] !== selectedOptions.combination
    ) {
      newOptions[combinationKey] = selectedOptions.combination
    }
    if (profileKey && newOptions[profileKey] !== selectedOptions.profile) {
      newOptions[profileKey] = selectedOptions.profile
    }
    if (sizeKey && newOptions[sizeKey] !== selectedOptions.size) {
      newOptions[sizeKey] = selectedOptions.size
    }
    if (rowKey && newOptions[rowKey] !== selectedOptions.row) {
      newOptions[rowKey] = selectedOptions.row
    }
    if (matteKey && newOptions[matteKey]) {
      newOptions[matteKey] = selectedOptions.matte
    }
    if (
      engravingKey &&
      newOptions[engravingKey] !== selectedOptions.engraving
    ) {
      newOptions[engravingKey] = selectedOptions.engraving
    }
  }

  const isValidFormat = (value: string): boolean => {
    return Object.values(FormatValueEnum).includes(value as FormatValueEnum)
  }

  const isValidCombination = (value: string): boolean => {
    return Object.values(CombinationValueEnum).includes(
      value as CombinationValueEnum
    )
  }

  const isValidSize = (value: string): boolean => {
    return Object.values(SizeValueEnum).includes(value as SizeValueEnum)
  }

  const isValidProfile = (value: string): boolean => {
    return Object.values(ProfileValueEnum).includes(value as ProfileValueEnum)
  }

  const isValidRow = (value: string): boolean => {
    return Object.values(RowValueEnum).includes(value as RowValueEnum)
  }
  const isValidMatte = (value: string): boolean => {
    return Object.values(MatteEnum).includes(value as MatteEnum)
  }

  const isValidEngraving = (value: string): boolean => {
    return Object.values(EngravingEnum).includes(value as EngravingEnum)
  }

  // should show element option (e.g. size) depending on what is already selected
  const showOption = (option: string): boolean => {
    if (option === OptionsEnum.Format) {
      return true
    } else if (option === OptionsEnum.Combination) {
      if (selectedOptions.format === FormatValueEnum.Group) {
        return true
      }
      return false
    } else if (option === OptionsEnum.Profile) {
      if (selectedOptions.format === FormatValueEnum.Single) {
        return true
      }
      return false
    } else if (option === OptionsEnum.Size) {
      if (
        selectedOptions.format === FormatValueEnum.Single &&
        selectedOptions.profile !== NullValue
      ) {
        return true
      }
      return false
    } else if (option === OptionsEnum.Row) {
      if (
        selectedOptions.format === FormatValueEnum.Single &&
        selectedOptions.profile !== NullValue &&
        selectedOptions.size !== NullValue
      ) {
        return true
      }
      return false
    } else if (option === OptionsEnum.Matte) {
      if (
        (selectedOptions.format !== NullValue &&
          selectedOptions.combination !== NullValue) ||
        (selectedOptions.format !== NullValue &&
          selectedOptions.profile !== NullValue &&
          selectedOptions.size !== NullValue &&
          selectedOptions.row !== NullValue)
      ) {
        return true
      }

      return false
    } else if (option === OptionsEnum.Engraving) {
      if (
        (selectedOptions.format !== NullValue &&
          selectedOptions.combination !== NullValue &&
          selectedOptions.matte !== NullValue) ||
        (selectedOptions.profile !== NullValue &&
          selectedOptions.size !== NullValue &&
          selectedOptions.row !== NullValue &&
          selectedOptions.matte !== NullValue)
      ) {
        return true
      }
      return false
    } else return true
  }

  const handleAdditionalInfo = () => {
    //@ts-ignore
    // Reset Info
    additionalInfoRef.current?.resetInfo()
    setCurrentInfo(new AdditionalInfoType("", ""))
    setShowLetterInput(false)

    // Trigger additional info addition (local storage etc.) only if any comment or character
    if (currentInfo.character !== "" || currentInfo.comment !== "") {
      setInfoObject({
        variant_id: variant?.id ?? "",
        variant_title: selectedOptions.getFullTitle(),
        letters: currentInfo.character,
        additionalComments: currentInfo.comment,
      })
    }
  }

  const replaceUndefinedValuesToNull = (
    options: Record<string, string | undefined>
  ): Record<string, string> => {
    const result: Record<string, string> = {} // Create a new object to store the result

    for (let key in options) {
      // Assign either the value from options or the NullValue if it's undefined
      result[key] =
        options[key] !== undefined ? (options[key] as string) : NullValue
    }

    return result
  }

  const handleAddToCart = () => {
    const revisedOptions = replaceUndefinedValuesToNull(options)
    addToCart(revisedOptions)
    handleAdditionalInfo()
    selectedOptions.resetAllOptions()
    setSelectedOptions(selectedOptions)
  }

  const setAdditionalInfo = (info: AdditionalInfoType) => {
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

  // given an option, set which values will be displayed. If all of them, omit
  const checkIfFilterOutValues = (
    title: string,
    selectableOptions: string[]
  ): any[] => {
    if (title === OptionsEnum.Row) {
      switch (true) {
        case selectedOptions.size === SizeValueEnum.Ctrl:
          return MatchingRowsBySize.Ctrl
        case selectedOptions.size === SizeValueEnum.Spacebar:
          return MatchingRowsBySize.Spacebar
        case selectedOptions.size === SizeValueEnum.Shift:
          return MatchingRowsBySize.Shift
      }
    }
    return selectableOptions
  }

  return (
    <div className="flex flex-col gap-y-6 w-full max-w-4xl mx-auto">
      {/* Collection Link */}
      {product.collection && (
        <Link
          href={`/collections/${product.collection.handle}`}
          className="text-sm text-gray-900 hover:text-gray-700 transition duration-300"
        >
          {product.collection.title}
        </Link>
      )}

      {/* Product Variants */}
      {product.variants.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-xl">
          {!selectedOptions.isSelectionComplete(currentInfo.character) && (
            <p className="text-red-600 text-center mb-4">
              Complete all selections to continue
            </p>
          )}
          {getOrderedProductOptions().map((option) =>
            showOption(option.title) ? (
              <div
                key={option.id}
                className="border-b border-gray-200 pb-4 mb-2 last:border-none"
              >
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={updateSelectionHandler}
                  title={option.title}
                  checkIfFilterOutValues={checkIfFilterOutValues}
                />
              </div>
            ) : null
          )}
          <AdditionalInfo
            ref={additionalInfoRef}
            getAdditionalInfo={setAdditionalInfo}
            showLetterInput={showLetterInput}
            showCommentInput={selectedOptions.engraving !== NullValue}
            selectedSize={selectedOptions.size}
          />
        </div>
      )}

      {/* Price Information */}
      {selectedPrice && (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="text-gray-800">
            <span className="text-xl font-bold">
              {selectedPrice.calculated_price ??
                "Price shown after adding to cart"}
            </span>
            {selectedPrice.price_type === "sale" && (
              <div className="mt-2">
                <p className="text-gray-700 line-through">
                  {selectedPrice.original_price}
                </p>
                <p className="text-red-600">
                  {selectedPrice.percentage_diff}% off
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      {selectedOptions.isSelectionComplete(currentInfo.character) && (
        <Button
          onClick={handleAddToCart}
          className="flex items-center justify-center px-6 py-3 border-2 border-[#87c4ef] text-white bg-[#87c4ef] rounded-md shadow-lg hover:bg-[#6ba3d2] transition-colors duration-300"
          style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
        >
          <span className="font-medium text-base uppercase">Add to Cart</span>
        </Button>
      )}
    </div>
  )
}

export default ProductActions
