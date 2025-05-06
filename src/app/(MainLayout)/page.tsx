'use client'
import { Image, Button } from '@nextui-org/react'
import clsx from 'clsx'
import CardYouGet from '@/components/home/CardYouGet'
import CardHowItWork from '@/components/home/CardHowItWork'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const Page = () => {
  return (
    <div className="flex justify-center">
      <div className="container">
        <div>
          <div className="grid grid-cols-1 border-b border-[#0A7770] pb-20 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center pb-5 md:space-y-10 md:pb-0">
              <h1
                className={clsx(
                  'px-0 py-5 text-3xl leading-relaxed font-bold',
                  'md:px-14 md:text-5xl',
                )}
              >
                Cá nhân hoá thực đơn của bạn chỉ trong vài bước
              </h1>
              <Button
                className={clsx(
                  'cursor-pointer rounded-full bg-[#0A7770] font-semibold text-[#FFB82E] shadow-lg transition-transform duration-300',
                  'hover:scale-105 hover:bg-[#086A64]',
                )}
                onPress={() => {
                  window.location.href = '/xay-dung-thuc-don'
                }}
              >
                Bắt đầu tạo thực đơn
              </Button>
            </div>

            <Image
              src="/images/home_s1.jpg"
              alt="ca nhan hoa thuc don"
              // className="max-w-2/3"
            />
          </div>
          <div className="my-10 flex flex-col items-center border-b border-[#0A7770] pb-20">
            <h2 className={clsx('pb-5 text-2xl text-[#097770]', 'md:text-3xl')}>
              Những gì bạn nhận được
            </h2>
            <div
              className={clsx(
                'grid w-3xl grid-cols-1 gap-5',
                'md:w-auto md:grid-cols-3 md:gap-10',
              )}
            >
              <CardYouGet
                icon="/icons/ai-technology.png"
                title="AI Cá nhân hóa"
                description="Thực đơn được thiết kế riêng cho bạn"
              />
              <CardYouGet
                icon="/icons/clock.png"
                title="Nhanh chóng"
                description="Hoàn thành chỉ trong 2 phút"
              />
              <CardYouGet
                icon="/icons/nutritional.png"
                title="Dinh dưỡng tối ưu"
                description="Theo sát mục tiêu giảm cân, tăng cơ..."
              />
            </div>
          </div>
          <div className="my-10 flex flex-col items-center">
            <h2 className={clsx('pb-5 text-2xl text-[#097770]', 'md:text-3xl')}>
              Cách hoạt động
            </h2>
            <div
              className={clsx(
                'grid w-3xl grid-cols-1 gap-5',
                'md:w-auto md:grid-cols-11 md:gap-10',
              )}
            >
              <div className="md:col-span-3">
                <CardHowItWork title="1" description="Điền thông tin cá nhân" />
              </div>
              <div className="hidden items-center justify-center md:block md:flex">
                <ArrowRightIcon className="h-6 w-6" />
              </div>

              <div className="md:col-span-3">
                <CardHowItWork title="2" description="Nhận thực đơn AI gợi ý" />
              </div>
              <div className="hidden items-center justify-center md:block md:flex">
                <ArrowRightIcon className="h-6 w-6" />
              </div>
              <div className="md:col-span-3">
                <CardHowItWork title="3" description="Lưu lại hoặc tuỳ chỉnh" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
