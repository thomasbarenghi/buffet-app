import { Button } from '@nextui-org/react'

interface Props {
  toggleChat: () => void
}

const ChatToggle = ({ toggleChat }: Props) => (
  <Button color='primary' size='sm' className='!text-xs font-semibold' radius='md' variant='solid' onClick={toggleChat}>
    Chat
  </Button>
)

export default ChatToggle
