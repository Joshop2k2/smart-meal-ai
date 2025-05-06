'use client'

import { Button, Select, SelectItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Card from './components/card'
import ButtonActive from './components/buttonActive'
import MenuMeal from './components/menuMeal'
import { suggestMeal, saveMeal } from '@/services/api'
import { Menu } from '@/types/menuMeal'
import { activityLevels, targets } from '@/types'

const Page = () => {
  const [gender, setGender] = useState<'men' | 'women'>('men')
  const [old, setOld] = useState<number>(23)
  const [weight, setWeight] = useState<number>(65)
  const [height, setHeight] = useState<number>(170)
  const [meal, setMeal] = useState<number>(3)
  const [active, setActive] = useState<number>(3)
  const [target, setTarget] = useState<'giam-mo' | 'tang-can' | 'duy-tri'>(
    'giam-mo',
  )
  const [addInfo, setAddInfo] = useState<string>('')
  const [menuMeal, setMenuMeal] = useState<Menu[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isSaved, setIsSave] = useState<boolean>(false)

  const handdleCreateMeal = async () => {
    setLoading(true)
    try {
      const response = await suggestMeal({
        startDate: new Date(),
        endDate: new Date(),
        target: target,
        age: old,
        gender: gender,
        height: height,
        weight: weight,
        active: active as 1 | 2 | 3 | 4 | 5,
        meal: meal,
        addInfo: addInfo,
      })
      setMenuMeal(response.data.suggest)
      setIsSave(false)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveMeal = async () => {
    try {
      await saveMeal({
        startDate: new Date(),
        endDate: new Date(),
        target: target,
        age: old,
        gender: gender,
        height: height,
        weight: weight,
        active: active as 1 | 2 | 3 | 4 | 5,
        meal: meal,
        addInfo: addInfo,
        name: 'test name',
        suggest: menuMeal,
      })
      setIsSave(true)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <div className="my-10 flex justify-center">
      <div className="container space-y-10">
        <div className="grid grid-cols-3 justify-center">
          <div className="space-y-3">
            <p className="text-[#0A7770]">MỤC TIÊU</p>
            <Select
              items={targets}
              radius={'full'}
              selectedKeys={[target]}
              onChange={(e) =>
                setTarget(e.target.value as 'giam-mo' | 'tang-can' | 'duy-tri')
              }
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
                  onPress={() => setGender('men')}
                  disableAnimation={true}
                  className={clsx(
                    'cursor-pointer rounded-l-full bg-[#F9F9F3]',
                    'hover:border-2 hover:border-[#0A7770] hover:text-black hover:shadow-xl',
                    gender === 'men'
                      ? 'border-2 border-[#0A7770] text-black shadow-xl'
                      : 'text-gray-400',
                    'focus:ring-0 focus:outline-none focus-visible:z-0 focus-visible:ring-0 focus-visible:outline-none',
                  )}
                >
                  Nam
                </Button>
                <Button
                  onPress={() => setGender('women')}
                  disableAnimation={true}
                  className={clsx(
                    'cursor-pointer rounded-r-full bg-[#F9F9F3]',
                    'hover:border-2 hover:border-[#0A7770] hover:text-black hover:shadow-xl',
                    gender === 'women'
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
            value={addInfo}
            onChange={(e) => setAddInfo(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Button
            className={clsx(
              'text-l cursor-pointer rounded-full font-semibold shadow-lg transition-transform duration-300',
              loading
                ? 'bg-gray-400 text-white'
                : 'bg-gradient-to-r from-[#F0F9EE] to-[#F9F9F3] text-[#0A7770] hover:scale-105 hover:border-2 hover:border-[#FFB82E] hover:from-[#0A7770] hover:to-[#0A7770] hover:text-[#FFB82E]',
            )}
            onPress={handdleCreateMeal}
            disableAnimation={true}
            isDisabled={loading}
          >
            {loading ? (
              <div className="flex">
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span className="ml-2">Đang tạo...</span>
              </div>
            ) : (
              'TẠO THỰC ĐƠN'
            )}
          </Button>
        </div>
        {menuMeal.length > 0 && (
          <MenuMeal
            suggest={menuMeal}
            onSave={handleSaveMeal}
            isSaved={isSaved}
          />
        )}
      </div>
    </div>
  )
}

export default Page
