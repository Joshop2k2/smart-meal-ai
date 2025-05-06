import { MealRequest, Menu } from '@/types/menuMeal'
import { targets } from '@/types'

type Props = {
  data: MealRequest & { suggest: Menu[]; name: string; _id: string }
}

const MealCard = ({ data }: Props) => {
  return (
    <div className="rounded-lg bg-gradient-to-r from-[#F0F9EE] to-[#F9F9F3] py-2">
      <div className="flex items-center justify-between px-2">
        <p className="pt-1 text-[#FFB82E]">{data.name}</p>
        <p>{data.startDate + ' - ' + data.endDate}</p>
      </div>

      <div className="flex flex-col items-center py-2">
        <p className="text-xl font-bold text-[#0A7770]">
          Mục tiêu:{' '}
          {targets.find((target) => target.value === data.target)?.label}
        </p>
      </div>
    </div>
  )
}

export default MealCard
