'use client'
import React, { useState } from 'react'
import useSWR from 'swr'
import { ProductCardGrid } from '@/components'
import { type Category, type Product, type RawUserMeta } from '@/interfaces'
import { endpoints } from '@/utils/constants'
import CategoryMenu from './CategoryMenu'

interface Props {
  categories: Category[] | undefined
  productFallback: Product[] | undefined
  profile: RawUserMeta
}

const Content = ({ categories, productFallback, profile }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(0)
  const { data: products } = useSWR<Product[]>(endpoints.products.FIND_ALL, {
    fallbackData: productFallback ?? []
  })

  const handleCategorySelect = (category: number) => {
    setSelectedCategory(category)
  }

  const filteredProducts = selectedCategory
    ? (products || []).filter((product) => product.category?.id === selectedCategory)
    : products || []

  return (
    <>
      <section className=' flex w-full flex-col'>
        <div className='resp-pad-x flex w-full items-center justify-center border-b py-4'>
          <div className='w-full 2xl:container'>
            <CategoryMenu
              categories={categories}
              handleCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </section>
      <section className='resp-pad-x flex w-full flex-col items-center justify-center'>
        <div className='w-full 2xl:container'>
          <ProductCardGrid products={filteredProducts} profile={profile} />
        </div>
      </section>
    </>
  )
}

export default Content
