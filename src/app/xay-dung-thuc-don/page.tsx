'use client'

import { Button, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import clsx from 'clsx'
import Card from './components/card'
import ButtonActive from './components/buttonActive'

enum Gender {
  Men = 'men',
  Women = 'women',
}

const Page = () => {
  const [gender, setGender] = useState<Gender>(Gender.Men)
  const [old, setOld] = useState<number>(23)
  const [weight, setWeight] = useState<number>(65)
  const [height, setHeight] = useState<number>(170)
  const [meal, setMeal] = useState<number>(3)
  const [active, setActive] = useState<number>(3)
  const [gold, setGold] = useState<string>('giam-mo')
  console.log('gold: ', gold)

  const targets = [
    { value: 'giam-mo', label: 'Giảm mỡ' },
    { value: 'tang-can', label: 'Tăng cân' },
    { value: 'duy-tri', label: 'Duy trì' },
  ]

  const activityLevels = [
    { value: 1, description: 'Ít hoạt động, chỉ ăn đi làm về ngủ' },
    { value: 2, description: 'Có tập nhẹ nhàng, tuần 1-3' },
    { value: 3, description: 'Có vận động vừa 4-5 buổi' },
    { value: 4, description: 'Vận động nhiều 6-7 buổi' },
    { value: 5, description: 'Vận động rất nhiều ngày tập 2 lần' },
  ]
  return (
    <div className="my-10 flex justify-center">
      <div className="container space-y-10">
        <div className="grid grid-cols-3 justify-center">
          <div className="space-y-3">
            <p className="text-[#0A7770]">MỤC TIÊU</p>
            <Select
              items={targets}
              radius={'full'}
              selectedKeys={[gold]}
              onChange={(e) => setGold(e.target.value)}
              classNames={{
                listbox:
                  'shadow-xl/20 inset-shadow-xs rounded-lg w-full bg-white ',
                trigger: 'bg-[#0A7770] text-[#FFB82E] cursor-pointer',
                selectorIcon: 'hidden',
                innerWrapper: 'flex items-center',
              }}
            >
              {targets.map((target) => (
                <SelectItem
                  key={target.value}
                  className="h-8 py-2 pl-2 hover:bg-[#F9F9F3] hover:text-[#FFB82E]"
                >
                  {target.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="col-span-2 ml-5">
            <div className="space-y-3">
              <p className="text-[#0A7770]">GIỚI TÍNH</p>
              <div className="grid grid-cols-2">
                <Button
                  onPress={() => setGender(Gender.Men)}
                  disableAnimation={true}
                  className={clsx(
                    'cursor-pointer rounded-l-full bg-[#F9F9F3]',
                    'hover:border-2 hover:border-[#0A7770] hover:text-black hover:shadow-xl',
                    gender === Gender.Men
                      ? 'border-2 border-[#0A7770] text-black shadow-xl'
                      : 'text-gray-400',
                    'focus:ring-0 focus:outline-none focus-visible:z-0 focus-visible:ring-0 focus-visible:outline-none',
                  )}
                >
                  Nam
                </Button>
                <Button
                  onPress={() => setGender(Gender.Women)}
                  disableAnimation={true}
                  className={clsx(
                    'cursor-pointer rounded-r-full bg-[#F9F9F3]',
                    'hover:border-2 hover:border-[#0A7770] hover:text-black hover:shadow-xl',
                    gender === Gender.Women
                      ? 'border-2 border-[#0A7770] text-black shadow-xl'
                      : 'text-gray-400',
                    'focus:ring-0 focus:outline-none focus-visible:z-0 focus-visible:ring-0 focus-visible:outline-none',
                  )}
                >
                  Nữ
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          <Card
            title="TUỔI"
            value={old}
            description="(năm)"
            onChange={setOld}
            min={1}
            max={120}
          />
          <Card
            title="CHIỀU CAO"
            value={height}
            description="(cm)"
            onChange={setHeight}
            min={1}
            max={220}
          />
          <Card
            title="CÂN NẶNG"
            value={weight}
            description="(kg)"
            onChange={setWeight}
            min={1}
            max={300}
          />
          <Card
            title="THỜI GIAN ĂN"
            value={meal}
            description="(bữa / ngày)"
            onChange={setMeal}
            min={1}
            max={7}
          />
        </div>
        <div className="space-y-2">
          <p className="text-[#0A7770]">CƯỜNG ĐỘ TẬP LUYỆN</p>
          <div className="grid grid-cols-5 gap-5">
            {activityLevels.map((activityLevel, index) => (
              <ButtonActive
                value={activityLevel.value}
                active={activityLevel.value === active}
                onClick={setActive}
                key={index}
              />
            ))}
          </div>
          <div className="flex flex-col items-center justify-center text-[#FFB82E]">
            {
              activityLevels.find(
                (activityLevel) => activityLevel.value === active,
              )?.description
            }
          </div>
        </div>
        <div>
          <p className="text-[#0A7770]">THÊM THÔNG TIN</p>
          <textarea
            className="min-h-20 w-full rounded-lg border-2 border-[#0A7770] bg-[#F9F9F3] px-3 py-2"
            placeholder="Nhập thêm thông tin về tình trạng sức khỏe, bệnh lý, dị ứng..."
          />
        </div>
        <div className="flex justify-center">
          <Button
            className={clsx(
              'text-l cursor-pointer rounded-full bg-gradient-to-r from-[#F0F9EE] to-[#F9F9F3] font-semibold text-[#0A7770] shadow-lg transition-transform duration-300 hover:scale-105',
              'hover:border-2 hover:border-[#FFB82E] hover:from-[#0A7770] hover:to-[#0A7770] hover:text-[#FFB82E]',
            )}
            onPress={() => {
              console.log('Tạo thực đơn')
            }}
            disableAnimation={true}
          >
            {'TẠO THỰC ĐƠN'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
