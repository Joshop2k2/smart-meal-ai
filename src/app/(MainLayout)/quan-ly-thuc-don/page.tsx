'use client'
import { getMeals } from '@/services/api'
import { useEffect, useState } from 'react'
import { Menu, MealRequest } from '@/types/menuMeal'
import { toastError } from '@/services/toastify'
import MealCard from './components/MealCard'
import MenuMeal from '@/app/(MainLayout)/xay-dung-thuc-don/components/menuMeal'
import Modal from './components/Modal'

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [menuMeal, setMenuMeal] = useState<
    (MealRequest & { suggest: Menu[]; name: string; _id: string })[] | undefined
  >(undefined)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [currentMealSelect, setCurrentMealSelect] = useState<Menu[]>([])

  const handlegetMeals = async () => {
    try {
      setLoading(true)
      const res = await getMeals()
      setMenuMeal(res.data.meals)
    } catch (error) {
      console.error(error)
      toastError('Lỗi tải thực đơn...')
    } finally {
      setLoading(false)
    }
  }
  const handleOpenModal = (_id: string) => {
    console.log('_id: ', _id)
    const suggest = menuMeal?.find((meal) => meal._id === _id)?.suggest
    console.log('suggest: ', suggest)

    setCurrentMealSelect(suggest ?? [])
    setIsOpenModal(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      await handlegetMeals()
    }
    fetchData()
  }, [])

  return (
    <div className="flex justify-center md:my-10">
      <div className="container mt-10">
        <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
          {menuMeal &&
            menuMeal.map((meal, index) => (
              <div
                onClick={() => handleOpenModal(meal._id)}
                className="cursor-pointer"
              >
                <MealCard key={index} data={meal} />
              </div>
            ))}
        </div>
        {isOpenModal && (
          <Modal
            suggest={currentMealSelect}
            onClose={() => setIsOpenModal(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Page
