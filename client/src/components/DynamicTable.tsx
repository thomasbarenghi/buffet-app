'use client'
import { useMemo, useState, type ComponentProps } from 'react'
import { Pagination, Table, TableBody, TableColumn, TableHeader } from '@nextui-org/react'

interface CustomProps<T> {
  data: T[]
  rowsPerPage: number
  columns: string[]
  renderRow: (row: T) => JSX.Element
}

type DefaultProps = ComponentProps<typeof Table>
type ExtendedProps = DefaultProps & CustomProps<any>

const DynamicTable = ({ data, rowsPerPage = 4, columns, renderRow, ...props }: ExtendedProps) => {
  const [page, setPage] = useState(1)
  const pages = Math.ceil(data.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return data.slice(start, end)
  }, [page, rowsPerPage, data])

  return (
    <div className='flex w-full flex-col gap-4'>
      <Table {...props}>
        <TableHeader>
          {columns.map((column, index) => (
            <TableColumn key={index}>{column}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>{items.map((product) => renderRow(product))}</TableBody>
      </Table>
      {(pages > 1 || page > pages) && (
        <div className='flex w-full justify-center'>
          <Pagination
            variant='light'
            isCompact
            showControls
            showShadow
            size='sm'
            color='primary'
            page={page}
            boundaries={0}
            total={pages}
            onChange={(page) => {
              setPage(page)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default DynamicTable
