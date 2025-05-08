'use client'

import { Input, Button, Link } from '@nextui-org/react'
import { useState } from 'react'
import { validEmail } from '@/helpers'
import { register } from '@/services/api'
import { toastError } from '@/services/toastify'
import clsx from 'clsx'
import { parseDate } from '@/helpers'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [phone, setPhone] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState<'men' | 'women'>('women')

  const [isValidEmail, setIsValidEmail] = useState<boolean | undefined>(
    undefined,
  )
  const [isValidPassword, setIsValidPassword] = useState<boolean | undefined>(
    undefined,
  )
  const [isValidFirstName, setIsValidFirstName] = useState<boolean | undefined>(
    undefined,
  )
  const [isValidPhone, setIsValidPhone] = useState<boolean | undefined>(
    undefined,
  )
  const [isValidLastName, setIsValidLastName] = useState<boolean | undefined>(
    undefined,
  )
  const [isValidBirthDate, setIsValidBirthDate] = useState<boolean | undefined>(
    undefined,
  )

  const handleSubmit = async () => {
    if (loading) {
      return
    }

    try {
      setLoading(true)

      const response = await register({
        email,
        password,
        firstName,
        phone,
        lastName,
        birthDate,
        gender,
      })

      window.location.href = '/dang-nhap'
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
    <div className="flex h-screen justify-center bg-[#DFF3E5]">
      <div className="flex h-full items-center justify-center bg-[#529A92]">
        <div className="mx-10 w-90 flex-row space-y-3">
          <div className="flex justify-center">
            <h2 className="text-4xl font-bold text-[#FFB82E]">
              Đăng ký tài khoản
            </h2>
          </div>

          <Input
            placeholder="Họ"
            value={lastName}
            type="text"
            classNames={{
              input: clsx(
                'border-gray-500 !border-2 h-10 rounded-3xl px-4 bg-[#F7F8F3] border-[#0A7770]',
                isValidLastName === false ? 'border-red-400 bg-red-100' : '',
              ),
            }}
            onValueChange={setLastName}
            onBlur={() => {
              if (lastName.length < 1) {
                setIsValidLastName(false)
              } else {
                setIsValidLastName(true)
              }
            }}
          />
          <Input
            placeholder="Tên"
            value={firstName}
            type="text"
            classNames={{
              input: clsx(
                'border-gray-500 !border-2 h-10 rounded-3xl px-4 bg-[#F7F8F3] border-[#0A7770]',
                isValidFirstName === false ? 'border-red-400 bg-red-100' : '',
              ),
            }}
            onValueChange={setFirstName}
            onBlur={() => {
              if (firstName.length < 1) {
                setIsValidFirstName(false)
              } else {
                setIsValidFirstName(true)
              }
            }}
          />
          <div className="col-span-2 px-3">
            <div className="grid grid-cols-2">
              <Button
                onPress={() => setGender('men')}
                disableAnimation={true}
                className={clsx(
                  'cursor-pointer rounded-l-full bg-[#F9F9F3]',
                  'hover:border-2 hover:border-[#FFB82E] hover:text-black hover:shadow-xl',
                  gender === 'men'
                    ? 'border-2 border-[#FFB82E] text-black shadow-xl'
                    : 'text-gray-400',
                  'focus:ring-0 focus:outline-none focus-visible:z-0 focus-visible:ring-0 focus-visible:outline-none',
                )}
              >
                Nam
              </Button>
              <Button
                onPress={() => setGender('women')}
                disableAnimation={true}
                className={clsx(
                  'cursor-pointer rounded-r-full bg-[#F9F9F3]',
                  'hover:border-2 hover:border-[#FFB82E] hover:text-black hover:shadow-xl',
                  gender === 'women'
                    ? 'border-2 border-[#FFB82E] text-black shadow-xl'
                    : 'text-gray-400',
                  'focus:ring-0 focus:outline-none focus-visible:z-0 focus-visible:ring-0 focus-visible:outline-none',
                )}
              >
                Nữ
              </Button>
            </div>
          </div>
          <Input
            placeholder="Ngày sinh - DD/MM/YYYY"
            value={birthDate}
            type="text"
            classNames={{
              input: clsx(
                'border-gray-500 !border-2 h-10 rounded-3xl px-4 bg-[#F7F8F3] border-[#0A7770]',
                isValidBirthDate === false ? 'border-red-400 bg-red-100' : '',
              ),
            }}
            onValueChange={setBirthDate}
            onBlur={() => {
              const dateRegex =
                /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
              const parsedDate = parseDate(birthDate)
              console.log('parsedDate: ', parsedDate)
              if (
                !dateRegex.test(birthDate) ||
                !parsedDate ||
                parsedDate > new Date()
              ) {
                setIsValidBirthDate(false)
                toastError('Ngày sinh sai định dạng hoặc lớn hơn ngày hôm nay')
              } else {
                setIsValidBirthDate(true)
              }
            }}
          />
          <Input
            placeholder="Số điện thoại"
            maxLength={10}
            type="text"
            value={phone}
            classNames={{
              input: clsx(
                'border-gray-500 !border-2 h-10 rounded-3xl px-4 bg-[#F7F8F3] border-[#0A7770]',
                isValidPhone === false ? 'border-red-400 bg-red-100' : '',
              ),
            }}
            onValueChange={(value) => {
              const numericValue = value.replace(/\D/g, '').slice(0, 10)
              setPhone(numericValue)
            }}
            onBlur={() => {
              if (phone.length < 10) {
                setIsValidPhone(false)
              } else {
                setIsValidPhone(true)
              }
            }}
          />
          <Input
            placeholder="E-mail"
            value={email}
            type="email"
            classNames={{
              input: clsx(
                'border-gray-500 !border-2 h-10 rounded-3xl px-4 bg-[#F7F8F3] border-[#0A7770]',
                isValidEmail === false ? 'border-red-400 bg-red-100' : '',
              ),
            }}
            onValueChange={setEmail}
            onBlur={() => {
              setIsValidEmail(validEmail(email))
            }}
          />
          <Input
            placeholder="Mật khẩu - ít nhất 6 ký tự"
            value={password}
            type="password"
            classNames={{
              input: clsx(
                'border-gray-500 !border-2 h-10 rounded-3xl px-4 bg-[#F7F8F3] border-[#0A7770]',
                isValidPassword === false ? 'border-red-400 bg-red-100' : '',
              ),
            }}
            onValueChange={(value) => {
              setPassword(value)
            }}
            onBlur={() => {
              if (password.length < 6) {
                setIsValidPassword(false)
              } else {
                setIsValidPassword(true)
              }
            }}
          />
          <div className="mt-5 flex justify-between border-b-1 pb-5">
            <Button
              className={clsx(
                'mx-4 w-full rounded-full bg-[#0A7770] font-bold text-[#FFB82E]',
                isValidEmail === false ||
                  isValidFirstName === false ||
                  isValidLastName === false ||
                  isValidPassword === false ||
                  isValidPhone === false
                  ? 'bg-gray-300'
                  : 'cursor-pointer',
              )}
              onPress={handleSubmit}
              isDisabled={
                isValidEmail === false ||
                isValidFirstName === false ||
                isValidLastName === false ||
                isValidPassword === false ||
                isValidPhone === false
              }
            >
              ĐĂNG KÝ
            </Button>
          </div>
          <div className="flex w-90 flex-col items-center justify-center px-4">
            <Link
              href="/tao-tai-khoan"
              className={clsx(
                'mt-5 flex w-full justify-center rounded-tl-2xl rounded-br-2xl border-2 border-[#0A7770] bg-white px-3 py-1 text-lg font-semibold text-[#0A7770] shadow-2xl',
                'hover:bg-[#FFB82E]',
              )}
            >
              ĐĂNG NHẬP
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
  )
}

export default Login
