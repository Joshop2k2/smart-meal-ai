'use client'
import { UserType } from '@/types/user'
import { getAllUser } from '@/services/api'
import { useEffect, useState } from 'react'

const Page = () => {
  const [users, setUsers] = useState<UserType[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUser()
        setUsers(res.data.users)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    fetchUsers()
  }, [])
  return (
    <div className="my-5 flex justify-center">
      <div className="container">
        <h1 className="mb-10 text-center text-[#529A92]">
          DANH SÁCH NGƯỜI DÙNG
        </h1>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="text-left">
              <th className="border border-gray-400 py-1 pl-2 text-left">Họ</th>
              <th className="border border-gray-400 py-1 pl-2 text-left">
                Tên
              </th>
              <th className="border border-gray-400 py-1 pl-2 text-left">
                Email
              </th>
              <th className="border border-gray-400 py-1 pl-2 text-left">
                Điện thoại
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-400 py-1 pl-2">
                  {user.lastName}
                </td>
                <td className="border border-gray-400 py-1 pl-2">
                  {user.firstName}
                </td>
                <td className="border border-gray-400 py-1 pl-2">
                  {user.email}
                </td>
                <td className="border border-gray-400 py-1 pl-2">
                  {user.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
