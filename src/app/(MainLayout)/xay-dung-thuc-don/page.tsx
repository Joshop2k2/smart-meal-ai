'use client'

import { Button, Select, SelectItem, Input } from '@nextui-org/react'
import { useState } from 'react'
import clsx from 'clsx'
import Card from './components/card'
import ButtonActive from './components/buttonActive'
import MenuMeal from './components/menuMeal'
import { suggestMeal, saveMeal } from '@/services/api'
import { Menu } from '@/types/menuMeal'
import { activityLevels, targets } from '@/types'
import { useAuth } from '@/components/AuthContext'
import { parseDate, formatDate } from '@/helpers'
import { toastError } from '@/services/toastify'

const Page = () => {
  const [gender, setGender] = useState<'men' | 'women'>('women')
  const [old, setOld] = useState<number>(40)
  const [weight, setWeight] = useState<number>(65)
  const [height, setHeight] = useState<number>(155)
  const [meal, setMeal] = useState<number>(3)
  const [active, setActive] = useState<number>(3)
  const [target, setTarget] = useState<'giam-mo' | 'tang-can' | 'duy-tri'>(
    'giam-mo',
  )
  const [addInfo, setAddInfo] = useState<string>('')
  const [menuMeal, setMenuMeal] = useState<Menu[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isSaved, setIsSave] = useState<boolean>(false)
  const context = useAuth()
  const [startDate, setStartDate] = useState<string>(formatDate(new Date()))
  const [endDate, setEndDate] = useState<string>(formatDate(new Date()))
  const [isValidStartDate, setIsValidStartDate] = useState<boolean | undefined>(
    true,
  )
  const [isValidEndDate, setIsValidEndDate] = useState<boolean | undefined>(
    undefined,
  )

  const handdleCreateMeal = async () => {
    if (isValidEndDate === false || isValidStartDate == false) {
      return
    }
    setLoading(true)

    try {
      const response = await suggestMeal({
        startDate: startDate,
        endDate: endDate,
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
        startDate: startDate,
        endDate: startDate,
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

  const handleStartDateChange = () => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    const parsedDate = parseDate(startDate)
    const currentDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    )
    const parsedDateOnly = new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate(),
    )

    if (
      !dateRegex.test(startDate) ||
      !parsedDate ||
      currentDate.getTime() > parsedDateOnly.getTime()
    ) {
      setIsValidStartDate(false)
      toastError('Ngày bắt đầu sai định dạng hoặc nhỏ hơn ngày hôm nay')
    } else {
      setIsValidStartDate(true)
      handleEndDateChange()
    }
  }

  const handleEndDateChange = () => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

    if (!dateRegex.test(endDate)) {
      setIsValidEndDate(false)
      toastError('Ngày kết thúc sai định dạng')
      return
    }
    const parsedStartDate = parseDate(startDate)
    const parsedEndDate = parseDate(endDate)

    const parsedStartDateOnly = new Date(
      parsedStartDate.getFullYear(),
      parsedStartDate.getMonth(),
      parsedStartDate.getDate(),
    )

    const parsedEndDateOnly = new Date(
      parsedEndDate.getFullYear(),
      parsedEndDate.getMonth(),
      parsedEndDate.getDate(),
    )

    if (
      parsedEndDateOnly.getTime() >
      parsedStartDateOnly.getTime() + 6 * 24 * 60 * 60 * 1000
    ) {
      setIsValidEndDate(false)
      toastError('Ngày kết thúc không được lớn hơn ngày bắt đầu quá 7 ngày')
      return
    }

    if (
      !parsedEndDate ||
      parsedEndDateOnly.getTime() < parsedStartDateOnly.getTime()
    ) {
      setIsValidEndDate(false)
      toastError('Ngày kết thúc nhỏ hơn ngày bắt đầu')
    } else {
      setIsValidEndDate(true)
    }
  }

  return (
    <div className="my-10 flex justify-center">
      <div className="container space-y-10">
        <div className="grid-clos-1 grid gap-2 space-y-5 md:grid-cols-3 md:space-y-0">
          <div>
            <p className={'mb-2 pl-4'}>Ngày bắt đầu</p>
            <Input
              placeholder="Ngày bắt đầu - DD/MM/YYYY"
              value={startDate}
              type="text"
              classNames={{
                input: clsx(
                  'border-gray-500 !border-2 h-10 rounded-3xl px-4 bg-[#F7F8F3] border-[#0A7770]',
                  isValidStartDate === false ? 'border-red-400 bg-red-100' : '',
                ),
              }}
              onValueChange={setStartDate}
              onBlur={handleStartDateChange}
            />
          </div>
          <div>
            <p className={'mb-2 pl-4'}>Ngày kết thúc</p>
            <Input
              placeholder="Ngày kết thúc - DD/MM/YYYY"
              value={endDate}
              type="text"
              classNames={{
                input: clsx(
                  'border-gray-500 !border-2 h-10 rounded-3xl px-4 bg-[#F7F8F3] border-[#0A7770]',
                  isValidEndDate === false ? 'border-red-400 bg-red-100' : '',
                ),
              }}
              onValueChange={setEndDate}
              isDisabled={!isValidStartDate}
              onBlur={handleEndDateChange}
            />
          </div>
        </div>
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
            isSaved={!context.isLogin || isSaved}
          />
        )}
      </div>
    </div>
  )
}

export default Page
