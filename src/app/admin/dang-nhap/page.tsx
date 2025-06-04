'use client'

import { Image, Input, Button } from '@nextui-org/react'
import { useState } from 'react'
import { validEmail } from '@/helpers'
import { loginAdmin } from '@/services/api'
import { toastError } from '@/services/toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessagesPass, setErrorMessagesPass] = useState('')
  const [errorMessagesEmail, setErrorMessagesEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (loading) {
      return
    }
    setErrorMessagesEmail('')
    setErrorMessagesPass('')
    if (!validEmail(email)) {
      setErrorMessagesEmail('Địa chỉ email không hợp lệ')
    }
    try {
      setLoading(true)
      const response = await loginAdmin({
        email,
        password,
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setLoading(false)

      window.location.href = '/admin'
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
      }
      if (error && typeof error === 'object' && 'response' in error) {
        if (
          error.response &&
          typeof error.response === 'object' &&
          'data' in error.response
        ) {
          toastError((error.response as { data: { error: string } }).data.error)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen md:grid md:grid-cols-2">
      <Image
        src="/images/login.jpg"
        alt="Login background"
        className="hidden object-none md:block md:h-full"
      ></Image>
      <div className="h-screen bg-[#DFF3E5] p-10">
        <div className="flex h-full items-center justify-center bg-[#529A92]">
          <div className="mt-10 w-80 flex-row space-y-6">
            <div className="flex justify-center">
              <h2 className="text-4xl font-bold text-[#FFB82E]">Đăng nhập</h2>
            </div>
            <Input
              placeholder="E-mail"
              type="email"
              classNames={{
                input:
                  'border-gray-500 !border-2 h-10 rounded-3xl px-4 bg-[#F7F8F3] border-[#0A7770]',
              }}
              onValueChange={setEmail}
              isInvalid={true}
              errorMessage={errorMessagesEmail}
            />
            <Input
              placeholder="Mật khẩu"
              type="password"
              classNames={{
                input:
                  'border-gray-500 !border-2 h-10 rounded-3xl px-4 bg-[#F7F8F3] border-[#0A7770]',
              }}
              onValueChange={setPassword}
              isInvalid={errorMessagesPass !== ''}
            />
            <div className="flex justify-between">
              <Button
                className="cursor-pointer rounded-full bg-[#0A7770] font-bold text-[#FFB82E]"
                onPress={handleSubmit}
              >
                Đăng nhập
              </Button>
              <div className="flex items-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
