'use client'
import { UserType } from '@/types/user'
import { getAllUser, deleteUser } from '@/services/api'
import { useEffect, useState } from 'react'
import { toastSuccess, toastError } from '@/services/toastify'

const Page = () => {
  const [users, setUsers] = useState<UserType[]>([])

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId)
      toastSuccess('Xoá người dùng thành công')
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
    } catch (error) {
      toastError('Xoá người dùng thất bại')
    }
  }

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
              <th className="border border-gray-400 py-1 pl-2 text-left text-[#529A92]">
                Họ
              </th>
              <th className="border border-gray-400 py-1 pl-2 text-left text-[#529A92]">
                Tên
              </th>
              <th className="border border-gray-400 py-1 pl-2 text-left text-[#529A92]">
                Email
              </th>
              <th className="border border-gray-400 py-1 pl-2 text-left text-[#529A92]">
                Điện thoại
              </th>
              <th className="border border-gray-400 py-1 pl-2 text-left text-[#529A92]">
                Hành động
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
                <td className="border border-gray-400 py-1 pl-2">
                  <button
                    className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Xóa
                  </button>
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
