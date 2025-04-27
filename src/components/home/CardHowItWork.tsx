type Props = {
  title: string
  description: string
}

const CardHowItWork = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg px-4 py-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F9EE] text-2xl text-[#0A7770]">
        <p>{title}</p>
      </div>
      <p className="text-center text-xl text-[#0A7770]">{description}</p>
    </div>
  )
}

export default CardHowItWork
