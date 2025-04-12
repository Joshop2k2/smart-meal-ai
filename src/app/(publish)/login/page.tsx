'use client'

import { Image, Input, Button, Link } from '@nextui-org/react'

const Login = () => {
  return (
    <div className="h-screen md:grid md:grid-cols-2">
      <Image
        src="images/login.jpg"
        className="hidden object-none md:block md:h-full"
      ></Image>
      <div className="bg-[#DFF3E5] p-10">
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
            />
            <Input
              placeholder="Mật khẩu"
              type="password"
              classNames={{
                input:
                  'border-gray-500 !border-2 h-10 rounded-3xl px-4 bg-[#F7F8F3] border-[#0A7770]',
              }}
            />
            <div className="flex justify-between">
              <Button className="rounded-full bg-[#0A7770] font-bold text-[#FFB82E]">
                Đăng nhập
              </Button>
              <div className="flex items-center">
                <Link className="font-bold text-white">Quên mật khẩu?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
