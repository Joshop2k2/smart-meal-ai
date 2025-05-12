'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { UserType } from '@/types/user'

type AuthContextType = {
  isLogin: boolean
  setIsLogin: (value: boolean) => void
  logout: () => void
  user: UserType
  setUser: (user: UserType) => void
  isAdmin: boolean
  setIsAdmin: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      return !!token
    }
    return false
  })
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        const isAdmin = JSON.parse(atob(token.split('.')[1]))?.isAdmin
        return !!isAdmin
      }
    }
    return false
  })
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : {}
    }
    return ''
  })

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setIsLogin(false)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        logout,
        user,
        setUser,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
