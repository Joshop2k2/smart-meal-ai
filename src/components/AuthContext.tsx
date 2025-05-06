'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type AuthContextType = {
  isLogin: boolean
  setIsLogin: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(() => {
    const token = localStorage.getItem('token')
    return !!token
  })

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
