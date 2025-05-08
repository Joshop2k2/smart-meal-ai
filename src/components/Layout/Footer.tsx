'use client'
import { Link } from '@nextui-org/react'

const Footer = () => {
  return (
    <footer className="flex justify-center bg-[#F0F9EE] pb-5">
      <div className="container">
        <div className="border-blue-150 mb-4 border-b-[0.5px] py-2">
          <Link href="/#">
            <h2 className="text-2xl font-semibold text-[#529A92]">
              Smart Meal Ai
            </h2>
          </Link>
        </div>
        <div className="grid grid-cols-1 text-[#529A92] md:grid-cols-2">
          <div className="mb-4 md:mb-0">
            <h2 className="mb-2">VỀ CHÚNG TÔI</h2>
            <Link href="gioi-thieu">
              <p>Giới thiệu</p>
            </Link>
            <Link href="xay-dung-thuc-don">
              <p>Thực đơn thông minh</p>
            </Link>
            <Link href="quan-ly-thuc-don">
              <p>Quản lý thực đơn</p>
            </Link>
          </div>
          <div>
            <h2 className="mb-2">HỖ TRỢ KHÁCH HÀNG</h2>
            <p>Câu hỏi thường gặp</p>
            <p>
              <a
                href="mailto:support@smartmeal.ai"
                className="text-[#529A92] underline"
              >
                Góp ý
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
