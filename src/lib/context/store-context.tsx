"use client"

import { medusaClient } from "@lib/config"
import { handleError } from "@lib/util/handle-error"
import { Region } from "@medusajs/medusa"
import {
  useCart,
  useCreateLineItem,
  useDeleteLineItem,
  useUpdateLineItem,
} from "medusa-react"
import React, { useEffect, useState } from "react"
import { useCartDropdown } from "./cart-dropdown-context"
import { useSearchParams } from "next/navigation"
import { InfoObjectType } from "@lib/constants"

interface VariantInfoProps {
  variantId: string
  quantity: number
}

interface LineInfoProps {
  lineId: string
  quantity: number
}

interface StoreContext {
  countryCode: string | undefined
  additionalInfo: any
  addAdditionalInfo(info: InfoObjectType): void
  removeAllItemsFromStorage: () => void
  setRegion: (regionId: string, countryCode: string) => void
  addItem: (item: VariantInfoProps) => void
  updateItem: (item: LineInfoProps) => void
  deleteItem: (lineId: string, variant_id?: string) => void
  resetCart: () => void
  getCartItemsQuantity: () => number
}

const StoreContext = React.createContext<StoreContext | null>(null)

export const useStore = () => {
  const context = React.useContext(StoreContext)
  if (context === null) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

interface StoreProps {
  children: React.ReactNode
}

const IS_SERVER = typeof window === "undefined"
const CART_KEY = "medusa_cart_id"
const REGION_KEY = "medusa_region"

export const StoreProvider = ({ children }: StoreProps) => {
  const { cart, setCart, createCart, updateCart } = useCart()
  const [countryCode, setCountryCode] = useState<string | undefined>(undefined)
  const [additionalInfo, setAdditionalInfo] = useState<InfoObjectType[]>([])
  const { timedOpen } = useCartDropdown()
  const addLineItem = useCreateLineItem(cart?.id!)
  const removeLineItem = useDeleteLineItem(cart?.id!)
  const adjustLineItem = useUpdateLineItem(cart?.id!)

  // check if the user is onboarding and sets the onboarding session storage
  const searchParams = useSearchParams()
  const onboardingCartId = searchParams && searchParams.get("cart_id")
  const isOnboarding = searchParams && searchParams.get("onboarding")

  useEffect(() => {
    if (isOnboarding === "true") {
      sessionStorage.setItem("onboarding", "true")
    }
  }, [isOnboarding])

  const storeRegion = (regionId: string, countryCode: string) => {
    if (!IS_SERVER) {
      localStorage.setItem(
        REGION_KEY,
        JSON.stringify({ regionId, countryCode })
      )

      setCountryCode(countryCode)
    }
  }

  useEffect(() => {
    if (!IS_SERVER) {
      const storedRegion = localStorage.getItem(REGION_KEY)
      if (storedRegion) {
        const { countryCode } = JSON.parse(storedRegion)
        setCountryCode(countryCode)
      }
    }
  }, [])

  const getRegion = () => {
    if (!IS_SERVER) {
      const region = localStorage.getItem(REGION_KEY)
      if (region) {
        return JSON.parse(region) as { regionId: string; countryCode: string }
      }
    }
    return null
  }

  const setRegion = async (regionId: string, countryCode: string) => {
    await updateCart.mutateAsync(
      {
        region_id: regionId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          storeRegion(regionId, countryCode)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  const addAdditionalInfo = (info: InfoObjectType) => {
    const index = "item"
    let value = additionalInfo.length
    let isSet = false

    while (!isSet) {
      const indexName = `${index}${value}`
      if (!localStorage.getItem(indexName)) {
        localStorage.setItem(
          indexName,
          info.variant_id + " // " + info.variant_title + " // " + info.letters
        )
        isSet = true
      } else value++
    }

    info && setAdditionalInfo([...additionalInfo, info])
  }

  const removeAdditionalInfo = (variantId: string) => {
    const newArray = additionalInfo.filter(
      (item) => !item.variant_id.includes(variantId)
    )
    setAdditionalInfo(newArray)
  }

  const removeAllAdditionalInfos = () => {
    setAdditionalInfo([])
  }

  const ensureRegion = (region: Region, countryCode?: string | null) => {
    if (!IS_SERVER) {
      const { regionId, countryCode: defaultCountryCode } = getRegion() || {
        regionId: region.id,
        countryCode: region.countries[0].iso_2,
      }

      const finalCountryCode = countryCode || defaultCountryCode

      if (regionId !== region.id) {
        setRegion(region.id, finalCountryCode)
      }

      storeRegion(region.id, finalCountryCode)
      setCountryCode(finalCountryCode)
    }
  }

  const storeCart = (id: string) => {
    if (!IS_SERVER) {
      localStorage.setItem(CART_KEY, id)
    }
  }

  const getCart = () => {
    if (!IS_SERVER) {
      return localStorage.getItem(CART_KEY)
    }
    return null
  }

  const deleteCart = () => {
    if (!IS_SERVER) {
      localStorage.removeItem(CART_KEY)
    }
  }

  const deleteRegion = () => {
    if (!IS_SERVER) {
      localStorage.removeItem(REGION_KEY)
    }
  }

  const createNewCart = async (regionId?: string) => {
    await createCart.mutateAsync(
      { region_id: regionId },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          ensureRegion(cart.region, cart.shipping_address?.country_code)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  const resetCart = () => {
    deleteCart()

    const savedRegion = getRegion()

    createCart.mutate(
      {
        region_id: savedRegion?.regionId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          ensureRegion(cart.region, cart.shipping_address?.country_code)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  useEffect(() => {
    const ensureCart = async () => {
      const cartId = onboardingCartId || getCart()
      const region = getRegion()

      if (cartId) {
        const cartRes = await medusaClient.carts
          .retrieve(cartId)
          .then(({ cart }) => {
            return cart
          })
          .catch(async (_) => {
            return null
          })

        if (!cartRes || cartRes.completed_at) {
          deleteCart()
          deleteRegion()
          await createNewCart()
          return
        }

        setCart(cartRes)
        ensureRegion(cartRes.region)
      } else {
        await createNewCart(region?.regionId)
      }
    }

    if (!IS_SERVER && !cart?.id) {
      ensureCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addItem = ({
    variantId,
    quantity,
  }: {
    variantId: string
    quantity: number
  }) => {
    addLineItem.mutate(
      {
        variant_id: variantId,
        quantity: quantity,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          timedOpen()
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }

  const deleteItem = (lineId: string, variant_id?: string) => {
    removeLineItem.mutate(
      {
        lineId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          removeItemFromStorage(variant_id)
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }

  useEffect(() => {
    console.log(additionalInfo)
  }, [additionalInfo])

  const removeItemFromStorage = (variant_id: string | undefined) => {
    if (!variant_id) {
      console.error("Session: undefined variant id")
      return
    }
    deleteStorageItem(variant_id)
    removeAdditionalInfo(variant_id)
  }

  const removeAllItemsFromStorage = () => {
    localStorage.clear()
    removeAllAdditionalInfos()
  }

  const updateItem = ({
    lineId,
    quantity,
  }: {
    lineId: string
    quantity: number
  }) => {
    adjustLineItem.mutate(
      {
        lineId,
        quantity,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }

  const deleteStorageItem = (variant_id: string) => {
    const itemsToDelete: string[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key) {
        console.error("Session: Key not found in for variant id:", variant_id)
        return
      }
      const value = localStorage.getItem(key)

      if (value?.includes(variant_id)) {
        itemsToDelete.push(key)
      }
    }

    itemsToDelete.forEach((item) => {
      localStorage.removeItem(item)
    })
  }

  //get number of items in cart, regardless of duplicated variants
  const getCartItemsQuantity = (): number => {
    let itemCount = 0
    cart?.items.forEach((item) => {
      itemCount += item.quantity
    })
    return itemCount
  }

  return (
    <StoreContext.Provider
      value={{
        countryCode,
        additionalInfo,
        addAdditionalInfo,
        removeAllItemsFromStorage,
        setRegion,
        addItem,
        deleteItem,
        updateItem,
        resetCart,
        getCartItemsQuantity,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
