import { DropdownItem, DropdownMenu } from '@nextui-org/react'
import { type DropItems } from './DropManager'

interface Props {
  dropItems: DropItems[]
}

const DropMenu = ({ dropItems }: Props) => (
  <DropdownMenu aria-label='Action event example'>
    {dropItems
      .filter((item) => item.isVisible)
      .map((item, index) => (
        <DropdownItem key={index} onClick={item.action}>
          {item.title}
        </DropdownItem>
      ))}
  </DropdownMenu>
)

export default DropMenu
