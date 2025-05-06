'use client'

import { Image, Input, Button, Link } from '@nextui-org/react'
import { useState } from 'react'
import { validEmail } from '@/helpers'
import { login } from '@/services/api'
import { toastError } from '@/services/toastify'
import clsx from 'clsx'

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
      const response = await login({
        email,
        password,
      })
      console.log('response: ', response)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setLoading(false)

      window.location.href = '/'
    } catch (error: any) {
      console.log(error.message)
      toastError(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen md:grid md:grid-cols-2">
      <Image
        src="images/login.jpg"
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
              <div className="flex items-center">
                <Link className="font-bold text-white">Quên mật khẩu?</Link>
              </div>
            </div>
            <div className="flex w-80 flex-col items-center justify-center px-4">
              <p className="mt-10 rounded-sm border border-white px-2 py-1 text-center text-sm text-[#FFB82E]">
                Tạo tài khoản để quản lý và lưu trữ thực đơn một cách đơn giản
                hơn.
              </p>
              <Link
                href="/tao-tai-khoan"
                className={clsx(
                  'mt-5 flex w-full justify-center rounded-tl-2xl rounded-br-2xl border-2 border-[#0A7770] bg-white px-3 py-1 text-lg font-semibold text-[#0A7770] shadow-2xl',
                  'hover:bg-[#FFB82E]',
                )}
              >
                TẠO TÀI KHOẢN
              </Link>
              <Link
                href="/#"
                className={clsx(
                  'mt-5 flex w-full justify-center rounded-tl-2xl rounded-br-2xl border-2 border-[#0A7770] bg-white px-3 py-1 text-lg font-semibold text-[#0A7770] shadow-2xl',
                  'hover:bg-[#FFB82E]',
                )}
              >
                QUAY VỀ TRANG CHỦ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
