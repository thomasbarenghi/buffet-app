import { Button } from '@/components'
import { type Category } from '@/interfaces'

interface Props {
  categories: Category[] | undefined
  selectedCategory: number | null
  handleCategorySelect: (category: number) => void
}

const CategoryMenu = ({ categories, selectedCategory, handleCategorySelect }: Props) => {
  const renderCategoryButton = (category: Category) => {
    const isSelected = category.id === selectedCategory

    return (
      <Button
        key={category.id}
        title={category.title}
        size='lg'
        radius='lg'
        variant={isSelected ? 'solid' : 'light'}
        onClick={() => {
          handleCategorySelect(category.id)
        }}
        color={isSelected ? 'primary' : 'default'}
        className={'min-w-max px-4'}
      />
    )
  }

  return (
    <div className='flex w-full flex-nowrap gap-0 overflow-y-auto'>
      {renderCategoryButton({
        id: 0,
        title: 'Todo el menú',
        created_at: '000'
      })}
      {categories?.map((category) => renderCategoryButton(category))}
    </div>
  )
}

export default CategoryMenu
