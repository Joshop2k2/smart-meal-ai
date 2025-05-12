import MenuMeal from '@/app/(MainLayout)/xay-dung-thuc-don/components/menuMeal'
import { Menu } from '@/types/menuMeal'

interface ModalProps {
  suggest: Menu[]
  onClose: () => void
}

const Modal = ({ suggest, onClose }: ModalProps) => {
  return (
    <div className="bg-opacity-90 fixed -top-3 right-0 bottom-0 left-0 z-50 flex w-full flex-col items-center justify-center backdrop-blur-sm md:-top-4">
      <button
        onClick={onClose}
        className="absolute top-10 right-10 h-10 w-10 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
      >
        X
      </button>
      <MenuMeal suggest={suggest} isSaved={true} />
    </div>
  )
}

export default Modal
