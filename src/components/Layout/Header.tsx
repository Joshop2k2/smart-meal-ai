'use client'

import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from '@nextui-org/react'
import clsx from 'clsx'
import { useAuth } from '@/components/AuthContext'

const Header = () => {
  const context = useAuth()

  return (
    <div className="flex justify-center bg-gradient-to-r from-[#F0F9EE] to-[#F9F9F3]">
      <div className="container">
        <Navbar className="w-full">
          <NavbarContent className="flex w-full space-x-20 text-[#529A92]">
            <NavbarBrand>
              <Link href="/#">
                <h2 className="text-2xl font-semibold text-[#0A7770] md:text-3xl">
                  SmartMealAi
                </h2>
              </Link>
            </NavbarBrand>

            <NavbarContent
              className={clsx('my-2 w-full', 'md:flex md:justify-between')}
            >
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
                {context.isLogin && (
                  <NavbarItem>
                    <Link href="quan-ly-thuc-don">
                      <p>Quản lý thực đơn</p>
                    </Link>
                  </NavbarItem>
                )}
              </NavbarContent>
              {!context.isLogin ? (
                <NavbarContent>
                  <Link href="dang-nhap">
                    <p>Đăng nhập/Đăng ký</p>
                  </Link>
                </NavbarContent>
              ) : (
                <NavbarContent>
                  <p>{context.user.firstName}</p>
                  <button
                    onClick={() => {
                      context.logout()
                    }}
                    className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                  >
                    Đăng xuất
                  </button>
                </NavbarContent>
              )}
            </NavbarContent>
          </NavbarContent>
        </Navbar>
      </div>
    </div>
  )
}

export default Header
