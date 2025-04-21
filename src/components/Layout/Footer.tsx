'use client'
import { Link } from '@nextui-org/react'

const Footer = () => {
  return (
    <footer className="flex justify-center bg-[#F0F9EE]">
      <div className="container">
        <div className="border-blue-150 mb-4 border-b-[0.5px] py-2">
          <Link href="/#">
            <h2 className="text-2xl font-semibold text-[#529A92]">
              Smart Meal Ai
            </h2>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2>THỰC ĐƠN DINH DƯỠNG THÔNG MINH SmartMealAi</h2>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div>
            <h2>VỀ SmartMealAi</h2>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div>
            <h2>HỖ TRỢ KHÁC HÀNG</h2>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
