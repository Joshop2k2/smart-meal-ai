import clsx from 'clsx'

type Props = {
  value: number
  active: boolean
  onClick: (value: number) => void
}
const ButtonActive = ({ value, active, onClick }: Props) => {
  return (
    <div
      className={clsx(
        'flex h-8 cursor-pointer flex-col items-center justify-center rounded-full bg-[#F9F9F3]',
        'md:h-10',
        'hover:border-2 hover:border-[#0A7770]',
        active ? 'border-2 border-[#0A7770]' : '',
      )}
      onClick={() => onClick(value)}
    >
      {value}
    </div>
  )
}

export default ButtonActive
