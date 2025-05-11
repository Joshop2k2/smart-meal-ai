import { MealRequest, Menu } from '@/types/menuMeal'
import { targets, gender } from '@/types'

type Props = {
  data: MealRequest & { suggest: Menu[]; _id: string }
}

const MealCard = ({ data }: Props) => {
  return (
    <div className="rounded-lg bg-gradient-to-r from-[#F0F9EE] to-[#F9F9F3] px-2 py-2">
      <div className="flex items-center justify-between">
        {/* <p className="pt-1 text-[#FFB82E]">{data.name}</p> */}
        <p>{data.startDate + ' - ' + data.endDate}</p>
      </div>

      <div className="flex flex-col items-center py-2">
        <p className="text-xl font-bold text-[#0A7770]">
          Mục tiêu:{' '}
          {targets.find((target) => target.value === data.target)?.label}
        </p>
      </div>
      <div>
        <span className="text-[#0A7770]">{'- Giới tính: '}</span>
        <span className="text-[#FFB82E]">{gender[data.gender]}</span>
      </div>
      <div>
        <span className="text-[#0A7770]">{'- Thời gian ăn: '}</span>
        <span className="text-[#FFB82E]">{`${data.meal} (bữa/ngày)`}</span>
      </div>
    </div>
  )
}

export default MealCard
