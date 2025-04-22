import { Input } from '@nextui-org/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

type Props = {
  title: string
  value: number
  min: number
  max: number
  description?: string
  onChange: (value: number) => void
}

const Card = ({
  title,
  value,
  description,
  onChange,
  min = 1,
  max = 220,
}: Props) => {
  const handleChange = (value: string) => {
    value = value.replace(/\D/g, '')
    let numericValue = Number(value)
    if (numericValue < min) {
      numericValue = min
    } else if (numericValue > max) {
      numericValue = max
    }
    onChange(numericValue)
  }

  return (
    <div className="flex flex-col items-center rounded-lg bg-gradient-to-r from-[#F0F9EE] to-[#F9F9F3] py-2">
      <p className="text-xl font-bold text-[#0A7770]">{title}</p>
      <div className="grid w-full grid-cols-3">
        <div className="flex flex-col items-center justify-center">
          <div
            className={clsx(
              'flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-amber-300 bg-white',
              'hover:bg-[#0A7770] hover:text-amber-300',
            )}
            onClick={() => handleChange((value - 1).toString())}
          >
            <MinusIcon className="h-4 w-4" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Input
            value={value.toString()}
            className="h-8 w-10 items-center text-2xl"
            classNames={{
              base: 'flex flex-col item-center justify-center',
            }}
            onValueChange={(value) => handleChange(value)}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div
            className={clsx(
              'flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-amber-300 bg-white',
              'hover:bg-[#0A7770] hover:text-amber-300',
            )}
            onClick={() => handleChange((value + 1).toString())}
          >
            <PlusIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
      {description && <p className="text-sm text-[#0A7770]">{description}</p>}
    </div>
  )
}

export default Card
