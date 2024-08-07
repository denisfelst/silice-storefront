import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import { Table, Text, clx } from "@medusajs/ui"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import Link from "next/link"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  type?: "full" | "preview"
}

const Item = ({ item, region, type = "full" }: ItemProps) => {
  const { updateItem, deleteItem, additionalInfo, getCartItemsQuantity } =
    useStore()

  const { handle } = item.variant.product

  const getLetters = (variantId: string | null): string => {
    let letters = ""
    if (!variantId) return letters

    const variantArr = additionalInfo.filter((item: any) =>
      item.variant_id.includes(variantId)
    )

    // get from additionalInfo
    if (variantArr.length === getCartItemsQuantity()) {
      variantArr.forEach((item: any, i: number) => {
        i === variantArr.length - 1
          ? (letters += item.letters)
          : (letters += item.letters + ", ")
      })
    } else {
      // cherrypick content from localStorage
      const localItems = []
      for (let i = 0; i < 50; i++) {
        const value = localStorage.getItem(`item${i}`)
        if (value) localItems.push(value)
      }
      const matchingValues = localItems
        .map((item) => {
          const parts = item.split(" // ")
          return parts.length === 4 && parts[0].includes(variantId) // 4 is with letters + comments. increase if more are added
            ? parts[2].trim()
            : null
        })
        .filter((value) => value !== null)
      letters = matchingValues.join(", ")
    }

    return letters
  }

  const isVariantEngraved = (variantId: string | null): boolean => {
    const isFound = additionalInfo.find(
      (item: any) => item.variant_id === variantId
    )

    const localItems = []
    for (let i = 0; i < 50; i++) {
      const value = localStorage.getItem(`item${i}`)
      if (value && value.includes("Engraving: Yes")) localItems.push(value)
    }
    return !!isFound || localItems.length > 0
  }

  return (
    <Table.Row className="w-full">
      <Table.Cell className="!pl-0 p-4 w-24">
        <Link
          href={`/products/${handle}`}
          className={clx("flex", {
            "w-16": type === "preview",
            "small:w-24 w-12": type === "full",
          })}
        >
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </Link>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text className="txt-medium-plus text-ui-fg-base">{item.title}</Text>
        <LineItemOptions variant={item.variant} />
        {isVariantEngraved(item.variant_id) && (
          <div className="txt-medium text-ui-fg-subtle">
            Engraving Content:{" "}
            <span className="text-red-600">
              {!!getLetters(item.variant_id)
                ? getLetters(item.variant_id)
                : "---"}
            </span>
          </div>
        )}
      </Table.Cell>

      {type === "full" && (
        <Table.Cell>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-x-"
              onClick={() => deleteItem(item.id, item.variant_id ?? undefined)}
            >
              <Trash size={24} />
            </button>
            <CartItemSelect
              value={item.quantity}
              onChange={(value) =>
                updateItem({
                  lineId: item.id,
                  quantity: parseInt(value.target.value),
                })
              }
              className="w-14 h-10 p-4"
            >
              {Array.from(
                [
                  ...Array(
                    item.variant.inventory_quantity > 0
                      ? item.variant.inventory_quantity
                      : 10
                  ),
                ].keys()
              )
                .slice(0, 10)
                .map((i) => {
                  const value = i + 1
                  return (
                    <option value={value} key={i}>
                      {value}
                    </option>
                  )
                })}
            </CartItemSelect>
          </div>
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden small:table-cell">
          <LineItemUnitPrice item={item} region={region} style="tight" />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0">
        <span
          className={clx("!pr-0", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice item={item} region={region} style="tight" />
            </span>
          )}
          <LineItemPrice item={item} region={region} style="tight" />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
