"use client"

import { useMobileMenu } from "@lib/context/mobile-menu-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import SideMenu from "@modules/layout/components/side-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import Image from "next/image"
import Link from "next/link"

const Nav = () => {
  const { toggle } = useMobileMenu()
  const {
    state: searchModalState,
    close: searchModalClose,
    open: searchModalOpen,
  } = useToggleState()

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-12 px-8 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
            <div className="hidden small:block h-full">
              <SideMenu searchModalOpen={searchModalOpen} />
            </div>
          </div>

          <div className="flex items-center justify-center h-full w-[60px] sm:w-[90px]">
            <Link
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
            >
              <Image
                src={"/logo-long.jpg"}
                alt="logo"
                className=""
                width={0}
                height={0}
                sizes="100vh"
                style={{
                  width: "auto",
                  height: "90%",
                }}
              ></Image>
            </Link>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED === "true" && (
                <DesktopSearchModal
                  state={searchModalState}
                  close={searchModalClose}
                  open={searchModalOpen}
                />
              )}
              <Link className="hover:text-ui-fg-base" href="/account">
                Account
              </Link>
            </div>
            <CartDropdown />
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
  )
}

export default Nav
