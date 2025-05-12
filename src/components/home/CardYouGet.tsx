import { Image } from '@nextui-org/react'

type Props = {
  title: string
  icon: string
  description: string
}

const CardYouGet = ({ title, icon, description }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-gradient-to-r from-[#F0F9EE] to-[#F9F9F3] px-4 py-4 shadow-lg transition-transform duration-300 hover:scale-105">
      <Image className="h-10 w-10" src={icon} alt={`${title} icon`} />
      <p className="text-xl font-bold text-[#0A7770]">{title}</p>
      {description && <p className="text-sm text-[#0A7770]">{description}</p>}
    </div>
  )
}

export default CardYouGet
