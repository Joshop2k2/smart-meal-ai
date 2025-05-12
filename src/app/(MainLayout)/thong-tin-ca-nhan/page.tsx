'use client'
import { Input, Button } from '@nextui-org/react'
import clsx from 'clsx'
import { useAuth } from '@/components/AuthContext'
import { useState } from 'react'
import { updateUser } from '@/services/api'
import { toastSuccess, toastError } from '@/services/toastify'

const Page = () => {
  const { user, setUser } = useAuth()
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    birthDate: user.birthDate || '',
    phone: user.phone || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const res = await updateUser(formData)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)

      toastSuccess('Cập nhập thông tin thành công')
    } catch (error) {
      console.log('error: ', error)
      toastError('Cập nhập thông tin không thành công')
    }
  }

  return (
    <div className="my-10">
      <div className="container w-80 space-y-5">
        {Object.keys(formData).map((key) => (
          <div className="flex flex-col" key={key}>
            <p className="mb-2 pl-4 text-[#0A7770]">{key.toUpperCase()}</p>
            <Input
              placeholder={`Enter ${key}`}
              name={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              type="text"
              disabled={key === 'email'}
              classNames={{
                input: clsx(
                  'border-gray-500 !border-2 h-10 rounded-3xl px-4 bg-[#F7F8F3] border-[#0A7770]',
                  { '!bg-gray-200': key === 'email' }, // Optional: Add a different background for disabled input
                ),
              }}
            />
          </div>
        ))}
        <Button
          onPress={handleSave}
          className="mt-4 ml-3 bg-[#0A7770] text-white"
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default Page
