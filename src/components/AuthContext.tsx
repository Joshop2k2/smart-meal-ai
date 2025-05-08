'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type AuthContextType = {
  isLogin: boolean
  setIsLogin: (value: boolean) => void
  logout: () => void
  user: {
    _id: string
    firstName: string
    lastName: string
    email: string
    birthDate: string
    phone: string
    createdAt: string
    updatedAt: string
    id: string
  }
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
  const [user, setName] = useState(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : {}
    }
    return ''
  })

  const logout = () => {
    localStorage.removeItem('token')
    setIsLogin(false)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
