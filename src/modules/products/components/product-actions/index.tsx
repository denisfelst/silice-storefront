import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useMemo, useState } from "react"

type ProductActionsProps = {
  product: PricedProduct
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()
  
  const Options = {
    format: {
      group: 'group',
      single: 'single',
    },
    groupType: {
      asdw: 'asdw',
      arrows: 'arrows',
      fRow: 'f-row'
    },
    size: {
      tab: 'tab',
      unit: 'unit',
      spacebar: 'spacebar'
    },
    null: 'null',
  } 
    
  const [selectedOptions, setSelectedOptions] = useState(['', '', '']);  // format, type, size, 
  
  const price = useProductPrice({ id: product.id!, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const updateSelectionHandler = (title: string, option: Record<string, string>): void => {
    updateOptions(option);

    title = title.toLowerCase();

    let updatedItems = [...selectedOptions];

    if (title === Options.format.group || title === Options.format.single) {
      setSelectedOptions(['', '', '']);
      updatedItems[0] = title;
    }

    else if (title === Options.groupType.asdw || title === Options.groupType.arrows || title === Options.groupType.fRow) {
      updatedItems[1] = title;
    }
    
    else if (title === Options.size.unit || title === Options.size.spacebar || title.toLowerCase() === Options.size.tab) {
      updatedItems[2] = title;
    }

    setSelectedOptions(updatedItems);

    setTimeout(() => {
      console.log('selectedOptions => ', selectedOptions);
    }, 30);
  }

  const handleCase = (title: string): boolean => {
    title = title.toLowerCase();

    if (title === 'format') {
      return true;
    }

    else if (title === 'group_type') {
      if (selectedOptions[0] === Options.format.group) {
        return true;
      }
      return false;
    }

    else if (title === 'size') {
      if (selectedOptions[0] === Options.format.single) {
        return true;
      }
      return false;
    }
    return true;
  }

  const handleAddToCart = () => {
    const formatKey = 'opt_01HD6W19FS2X7FT4889W4G2RQP';
    const groupTypeKey = 'opt_01HD6XVASZ7YRMSPDGQ3E2RKRM';
    const sizeKey = 'opt_01HD6ZYKWXQA0K8SVEC7T16S6M';
    
    if (options[formatKey].toLowerCase() === Options.format.group) {
      options[sizeKey] = 'null';
    }
    else if (options[formatKey].toLowerCase() === Options.format.single) { 
      options[groupTypeKey] = 'null';
    }
    
    for (const key in options) {
      updateOptions({key: options[key]});
    }

    setSelectedOptions(['', '', '']);

    addToCart();
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
            return handleCase(option.title) ? (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={updateSelectionHandler}
                  title={option.title}
                />
              </div>
            ) : null;
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
            { !(selectedOptions[1] == '' && selectedOptions[2] == '') ? selectedPrice.calculated_price: 'To Be Defined...'}
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
