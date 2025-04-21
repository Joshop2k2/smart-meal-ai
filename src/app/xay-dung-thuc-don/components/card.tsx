import { Button } from '@nextui-org/react'

type Props = {
  title: string
  value: number
  description?: string
}

const Card = ({ title, value, description }: Props) => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-gradient-to-r from-[#F0F9EE] to-[#F9F9F3] py-2">
      <p className="text-xl font-bold text-[#0A7770]">{title}</p>
      <div className="grid w-full grid-cols-3">
        <div className="flex flex-col items-center">
          <Button className="rounded-full border border-amber-300 bg-white">
            -
          </Button>
        </div>
        <p className="flex flex-col items-center text-2xl font-bold">{value}</p>
        <div className="flex flex-col items-center">
          <Button className="rounded-full border border-amber-300 bg-white">
            +
          </Button>
        </div>
      </div>
      {description && <p className="text-sm text-[#0A7770]">{description}</p>}
    </div>
  )
}

export default Card
