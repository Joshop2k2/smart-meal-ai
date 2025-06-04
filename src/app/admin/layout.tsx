'use client'

import MainLayout from '@/components/Layout/MainLayout'
import { AuthProvider } from '@/components/AuthContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <MainLayout>{children}</MainLayout>
    </AuthProvider>
  )
}
