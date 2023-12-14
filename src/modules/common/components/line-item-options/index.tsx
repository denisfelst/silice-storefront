import { ProductVariant } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

type LineItemOptionsProps = { variant: ProductVariant }

const LineItemOptions = ({ variant }: LineItemOptionsProps) => {
  return (
    <>
      {variant.options?.map((option) => {
        const optionName =
          variant.product.options.find((opt) => opt.id === option.option_id)
            ?.title || "Option"

        if (option.value !== "Null") {
          return (
            <Text key={option.id} className="txt-medium text-ui-fg-subtle">
              {optionName}: {option.value}
            </Text>
          )
        } else {
          return null
        }
      })}
    </>
  )
}

export default LineItemOptions
