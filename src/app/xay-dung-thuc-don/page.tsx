'use client'

import { Button, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import clsx from 'clsx'
import Card from './components/card'

enum Gender {
  Men = 'men',
  Women = 'women',
}

const Page = () => {
  const [gender, setGender] = useState<Gender>(Gender.Men)
  const [old, setOld] = useState<number>(23)
  const [weight, setWeight] = useState<number>(65)
  const [height, setHeight] = useState<number>(170)

  const targets = [
    { value: 'giam-mo', label: 'Giảm mỡ' },
    { value: 'tang-can', label: 'Tăng cân' },
    { value: 'duy-tri', label: 'Duy trì' },
  ]
  return (
    <div className="mt-10 flex justify-center">
      <div className="container space-y-10">
        <div className="grid grid-cols-3 justify-center">
          <div className="space-y-3">
            <p className="text-[#0A7770]">MỤC TIÊU</p>
            <Select
              items={targets}
              defaultSelectedKeys={['giam-mo']}
              radius={'full'}
              classNames={{
                listbox:
                  'shadow-xl/20 inset-shadow-xs rounded-lg w-full bg-white',
                trigger: 'bg-[#0A7770] text-[#FFB82E] cursor-pointer',
                selectorIcon: 'hidden',
                innerWrapper: 'flex items-center',
              }}
            >
              {targets.map((target) => (
                <SelectItem
                  key={target.value}
                  className="h-8 py-2 hover:bg-[#0A7770] hover:text-[#FFB82E]"
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
        <div className="grid grid-cols-3 space-x-2">
          <Card title="TUỔI" value={old} description="(năm)" />
          <Card title="CHIỀU CAO" value={height} description="(cm)" />
          <Card title="CÂN NẶNG" value={weight} description="(kg)" />
        </div>
      </div>
    </div>
  )
}

export default Page
