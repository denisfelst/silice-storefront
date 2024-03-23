import {
  useProductActions,
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
  CombinationValueEnum,
  ProfileValueEnum,
  RowValueEnum,
  MatchingRowsBySize,
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

  const { addAdditionalInfo } = useStore()

  // {format, type, size, engraving}
  const [selectedOptions, setSelectedOptions] = useState<SelectOptions>(
    new SelectOptions()
  )
  const [showLetterInput, setShowLetterInput] = useState<boolean>(false)
  const [currentInfo, setCurrentInfo] = useState<string>("")
  const [infoObject, setInfoObject] = useState<InfoObjectType>()

  useEffect(() => {
    // Show letter input -> Single OR Group cases
    if (
      ( 
        selectedOptions.format === FormatValueEnum.Group && 
        selectedOptions.combination !== NullValue &&
        selectedOptions.engraving === EngravingEnum.Yes
      ) || ( 
        selectedOptions.format === FormatValueEnum.Single && 
        selectedOptions.profile !== NullValue &&
        selectedOptions.size !== NullValue &&
        selectedOptions.row !== NullValue &&
        selectedOptions.engraving === EngravingEnum.Yes 
      )
    ) {
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

  const updateSelectionHandler = (selectedValue: string, option: Record<string, string>): void => {
    if (!selectedValue || !option) {
      console.error("Undefined selection value")
    }
      
    const newSelectedOptions = new SelectOptions({
      format: selectedOptions.format,
      profile: selectedOptions.profile,
      size: selectedOptions.size,
      row: selectedOptions.row,
      combination: selectedOptions.combination,
      engraving: selectedOptions.engraving,
    })

    updateOptions('dummy', option) // add new selection to options
    newSelectedOptions.setValue(selectedValue)
    setSelectedOptions(newSelectedOptions)
  }

  const updateOptionsFromSelection = () => {
    let newOptions = Object.assign({}, options)
    let formatKey, profileKey, sizeKey, rowKey, combinationKey, engravingKey // options keys

    for (const key in newOptions) {
      if (newOptions.hasOwnProperty(key) && newOptions[key] === undefined) {
        newOptions[key] = NullValue // set nullValue to undefined options
      } else {
        const value = newOptions[key]

        switch (true) {
          case isValidFormat(value):
            formatKey = key;
            break;
          case isValidCombination(value):
            combinationKey = key;
            break;
          case isValidProfile(value):
            profileKey = key;
            break;
          case isValidSize(value):
            sizeKey = key;
            break;
          case isValidRow(value):
            rowKey = key;
            break;
          case isValidEngraving(value):
            engravingKey = key;
            break;
          default:
            break;
        }
      }
    }

    // update values with selectedOptions
    if (formatKey && newOptions[formatKey] !== selectedOptions.format) {
      newOptions[formatKey] = selectedOptions.format
    }
    if (combinationKey && newOptions[combinationKey] !== selectedOptions.combination) {
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
    if (engravingKey && newOptions[engravingKey] !== selectedOptions.engraving) {
      newOptions[engravingKey] = selectedOptions.engraving
    }

    updateOptions('test12345', newOptions)
  }

  const isValidFormat = (value: string) : boolean => {
    return (
      value === FormatValueEnum.Single || 
      value === FormatValueEnum.Group
    )
  }

  const isValidCombination = (value: string) : boolean => {
    return (
      value === CombinationValueEnum.Asdw ||
      value === CombinationValueEnum.Arrows ||
      value === CombinationValueEnum.FRow || 
      value === CombinationValueEnum.CWA || 
      value === CombinationValueEnum.ModifierLeft || 
      value === CombinationValueEnum.Numpad || 
      value === CombinationValueEnum.SpecialsLeft
    )
  }

  const isValidSize = (value: string) : boolean => {
    return (
      value === SizeValueEnum.Unit ||
      value === SizeValueEnum.Spacebar ||
      value === SizeValueEnum.Shift ||
      value === SizeValueEnum.Ctrl
    )
  }
  
  const isValidProfile = (value: string) : boolean => {
    return (
      value === ProfileValueEnum.SA || 
      value === ProfileValueEnum.OEM
    )
  }

  const isValidRow = (value: string) : boolean => {
    return (
      value === RowValueEnum.R1 || 
      value === RowValueEnum.R2 || 
      value === RowValueEnum.R3 || 
      value === RowValueEnum.R4
    )
  }
  const isValidEngraving = (value: string) : boolean => {
    return (
      value === EngravingEnum.Yes || value === EngravingEnum.No
    )
  }

  // should show element option (e.g. size) depending on what is already selected
  const showOption = (option: string): boolean => {
    if (option === OptionsEnum.Format) {
      return true
    } 
    
    else if (option === OptionsEnum.Combination) {
      if (selectedOptions.format === FormatValueEnum.Group) {
        return true
      }
      return false
    } 
    
    else if (option === OptionsEnum.Profile) {
      if (selectedOptions.format === FormatValueEnum.Single) {
        return true
      }
      return false
    } 
    
    else if (option === OptionsEnum.Size) {
      if (selectedOptions.format === FormatValueEnum.Single && selectedOptions.profile !== NullValue ) {
        return true
      }
      return false
    }

    else if (option === OptionsEnum.Row) {
      if (selectedOptions.format === FormatValueEnum.Single && selectedOptions.profile !== NullValue && selectedOptions.size !== NullValue) {
        return true
      }
      return false
    } 
    
    else if (option === OptionsEnum.Engraving) {
      if (
        selectedOptions.combination !== NullValue ||
        (selectedOptions.profile !== NullValue &&
        selectedOptions.size !== NullValue &&
        selectedOptions.row !== NullValue)
      ) {
        return true
      }
      return false
    } 
    
    else return true
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
    selectedOptions.resetAllOptions()
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

  // given an option, set which values will be displayed. If all of them, omit  
  const checkIfFilterOutValues = (title: string, selectableOptions: string[]): any[] => {
    if(title === OptionsEnum.Row){
      switch(true){
        case selectedOptions.size === SizeValueEnum.Ctrl:
          return MatchingRowsBySize.Ctrl           
        case selectedOptions.size === SizeValueEnum.Spacebar:
          return MatchingRowsBySize.Spacebar 
        case selectedOptions.size === SizeValueEnum.Shift:
          return MatchingRowsBySize.Shift 
      }
    }
    return selectableOptions;
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {product.collection && (
        <Link
          href={`/collections/${product.collection.handle}`}
          className="text-small-regular text-gray-700"
        >
          {product.collection.title}
        </Link>
      )}

      {product.variants.length > 0 && (
        <div className="my-4 flex flex-col gap-y-4 rounded bg-slate-100 p-4 w-full">
          {getOrderedProductOptions().map((option) => {
            return showOption(option.title) ? (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={updateSelectionHandler}
                  title={option.title}
                  checkIfFilterOutValues={checkIfFilterOutValues}
                />
              </div>
            ) : null
          })}
          {showLetterInput && (
            <div>
              <AdditionalInfo
                ref={additionalInfoRef}
                getInfo={setAdditionalInfo}
              />
            </div>
          )}
          {!selectedOptions.isSelectionComplete(currentInfo) && (
            <span className="text-rose-600">Select all options</span>
          )}
        </div>
      )}

      {selectedPrice && (
        <div className="mb-4">
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
        </div>
      )}

      {selectedOptions.isSelectionComplete(currentInfo) && (
        <Button onClick={handleAddToCart}>
          {/* {!inStock ? "Out of stock" : "Add to cart"} */}
          Add to cart
        </Button>
      )}
    </div>
  )
}

export default ProductActions
