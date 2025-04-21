'use client'

import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from '@nextui-org/react'
import { Bars3Icon } from '@heroicons/react/24/outline'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  console.log('isMenuOpen: ', isMenuOpen)

  return (
    <div className="flex justify-center bg-[#F9F9F3]">
      <div className="container">
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          onScrollPositionChange={() => {
            setIsMenuOpen(false)
          }}
          className="w-full"
        >
          <NavbarContent className="flex space-x-20 text-[#529A92]">
            <NavbarBrand>
              <Link href="/#">
                <h2 className="text-2xl font-semibold text-[#0A7770] md:text-3xl">
                  SmartMealAi
                </h2>
              </Link>
            </NavbarBrand>

            <NavbarContent className="my-2 hidden md:flex">
              <NavbarContent className="space-x-6">
                <NavbarItem>
                  <Link href="gioi-thieu">
                    <p>Giới thiệu</p>
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link href="xay-dung-thuc-don">
                    <p>Thực đơn thông minh</p>
                  </Link>
                </NavbarItem>
              </NavbarContent>
            </NavbarContent>
          </NavbarContent>

          <NavbarContent
            className="flex cursor-pointer md:hidden"
            justify="end"
          >
            <NavbarMenuToggle
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              icon={<Bars3Icon className="h-10 w-10" />}
            >
              <span className="sr-only"></span>
            </NavbarMenuToggle>
          </NavbarContent>

          {isMenuOpen && (
            <NavbarMenu className="absolute bottom-0 z-40 container w-full bg-amber-50">
              <NavbarMenuItem>
                <Link href="gioi-thieu">
                  <p>Giới thiệu</p>
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="xay-dung-thuc-don">
                  <p>Thực đơn thông minh</p>
                </Link>
              </NavbarMenuItem>
            </NavbarMenu>
          )}
        </Navbar>
      </div>
    </div>
  )
}

export default Header
