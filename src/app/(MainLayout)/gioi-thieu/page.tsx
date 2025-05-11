'use client'
import { Image } from '@nextui-org/react'
const Page = () => {
  return (
    <div className="my-10 flex justify-center">
      <div className="container">
        <div className="flex flex-col items-center justify-center py-5">
          <p className="pb-3 text-3xl font-bold text-[#097770]">
            Trợ lý AI lên thực đơn cá nhân hóa cho bạn
          </p>
          <p className="w-3/4 text-center">
            Bạn băn khoăn không biết hôm nay ăn gì? Bạn đang cố gắng giảm cân,
            tăng cơ hoặc chỉ đơn giản là muốn ăn uống lành mạnh hơn mà không mất
            quá nhiều thời gian để suy nghĩ? Dù có hàng trăm công thức nấu ăn
            trên mạng, việc lựa chọn món phù hợp với thời gian, nguyên liệu sẵn
            có, mục tiêu sức khỏe lại không hề dễ dàng.
          </p>
        </div>
        <div className="grid-clos-1 grid py-10 md:grid-cols-2 md:space-x-10">
          <div className="flex flex-col justify-center">
            <h2 className="py-4 text-2xl font-bold text-[#097770]">
              Chúng ta thường không biết ăn gì, ăn sao cho hợp lý
            </h2>
            <p></p>
            <div>
              <ul className="list-disc space-y-3 pl-5">
                <li>Hôm nay ăn gì cho nhanh mà vẫn đủ chất?</li>
                <li>Làm sao để ăn lành mạnh hơn mà không nhàm chán?</li>
                <li>Tôi muốn giảm cân / tăng cơ – nên ăn gì?</li>
              </ul>
            </div>
          </div>

          <Image src="/images/boi-roi.jpg" className="w-screen rounded-xl" />
        </div>
        <div className="grid-clos-1 grid py-10 md:grid-cols-2 md:space-x-10">
          <Image src="/images/meal-ai.webp" className="w-screen rounded-xl" />

          <div className="flex flex-col justify-center">
            <h2 className="py-4 text-2xl font-bold text-[#097770]">
              AI sẽ giúp bạn giải quyết điều đó
            </h2>
            <div>
              <ul className="list-disc space-y-3 pl-5">
                <li>Gợi ý thực đơn thông minh </li>
                <li>Cá nhân hóa theo thông tin người dùng</li>
                <li>Lập kế hoạch ăn uống hàng ngày, hằng tuần...</li>
                <li>Hỗ trợ bạn duy trì lối sống lành mạnh</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
