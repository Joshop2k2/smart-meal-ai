import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@nextui-org/react'
import * as XLSX from 'xlsx'
import clsx from 'clsx'
import { Menu } from '@/types/menuMeal'

const columns = [
  { key: 'date', label: 'Ngày' },
  { key: 'meal', label: 'Bữa ăn' },
  { key: 'dish', label: 'Tên món' },
  { key: 'ingredient', label: 'Nguyên liệu' },
  { key: 'calo', label: 'Calo' },
]

const MenuMeal = ({
  suggest,
  onSave,
  isSaved,
}: {
  suggest: Menu[]
  onSave?: () => void
  isSaved?: boolean
}) => {
  const flatRows = suggest.flatMap((menu) =>
    menu.meals.map((meal, idx) => ({
      Ngày: idx === 0 ? menu.date : '',
      'Bữa ăn': meal.name,
      'Tên món': meal.dish,
      'Nguyên liệu': meal.ingredients
        .map((i) => `• ${i.name} - ${i.amount}`)
        .join(',\n'),
      Calo: meal.calories,
    })),
  )

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(flatRows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ThucDon')

    worksheet['!cols'] = [
      { wch: 15 }, // Ngày
      { wch: 12 }, // Bữa ăn
      { wch: 30 }, // Tên món
      { wch: 30 }, // Nguyên liệu
      { wch: 10 }, // Calo
    ]

    const dates = suggest.map((menu) => menu.date)
    const firstDate = dates[0]
    const lastDate = dates[dates.length - 1]

    XLSX.writeFile(workbook, `thuc_don_${firstDate}_to_${lastDate}.xlsx`, {
      bookType: 'xlsx',
      cellStyles: true,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-3">
        <Button
          className={clsx(
            'text-l cursor-pointer rounded-full bg-gradient-to-r from-[#F0F9EE] to-[#F9F9F3] font-semibold text-[#0A7770] shadow-lg transition-transform duration-300 hover:scale-105',
            'hover:border-2 hover:border-[#FFB82E] hover:from-[#0A7770] hover:to-[#0A7770] hover:text-[#FFB82E]',
          )}
          onPress={exportToExcel}
          disableAnimation={true}
        >
          {'TẢI XUỐNG EXCEL'}
        </Button>
        {!isSaved && (
          <Button
            className={clsx(
              'text-l cursor-pointer rounded-full font-semibold text-[#0A7770] shadow-lg transition-transform duration-300',
              'bg-gradient-to-r from-[#F0F9EE] to-[#F9F9F3] hover:scale-105 hover:border-2 hover:border-[#FFB82E] hover:from-[#0A7770] hover:to-[#0A7770] hover:text-[#FFB82E]',
            )}
            onPress={onSave}
            disableAnimation={true}
          >
            {'LƯU THỰC ĐƠN'}
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border-2 border-[#0A7770]">
        <div className="max-h-[500px] overflow-y-auto">
          <Table
            isHeaderSticky
            aria-label="Thực đơn dinh dưỡng"
            removeWrapper
            className="min-w-full bg-white"
          >
            <TableHeader>
              {columns.map((column) => (
                <TableColumn
                  key={column.key}
                  className="bg-white text-[#0A7770]"
                >
                  {column.label}
                </TableColumn>
              ))}
            </TableHeader>

            <TableBody className="max-h-40 overflow-scroll">
              {suggest.flatMap((menu) =>
                menu.meals.map((meal, index) => (
                  <TableRow key={`${menu.date}-${index}`} className="border-t">
                    <TableCell className="border-r">
                      <div className="flex justify-center">
                        {index === 0 ? menu.date : ''}
                      </div>
                    </TableCell>
                    <TableCell className="border-x">{meal.name}</TableCell>
                    <TableCell className="border-x">{meal.dish}</TableCell>
                    <TableCell className="border-x">
                      <ul className="list-disc pl-4">
                        {meal.ingredients.map((ing, i) => (
                          <li key={i}>
                            {ing.name} – {ing.amount}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="border-l">
                      <div className="flex justify-center">{meal.calories}</div>
                    </TableCell>
                  </TableRow>
                )),
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default MenuMeal
