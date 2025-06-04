'use client'
import { useAuth } from '@/components/AuthContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isAdmin } = useAuth()
  if (!isAdmin) {
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }
  return <>{children}</>
}
