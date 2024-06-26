'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Input } from '@nextui-org/react'
import { ChatToggle } from '@/components'
import { createMessage } from '@/services/api-client'
import { type Profile, type Message, type OrderInterface, RoleEnum } from '@/interfaces'

interface Props {
  order: OrderInterface | undefined
  profile: Profile
  messages: Message[] | undefined
}

const ChatBox: React.FC<Props> = ({ order, profile, messages }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [messageInput, setMessageInput] = useState<string>('')
  const [chatOpen, setChatOpen] = useState<boolean>(false)

  const toggleChat = (): void => {
    setChatOpen(!chatOpen)
  }

  const handleSendMessageClick = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault()
      const { message } = e.target
      if (message.value.length <= 0) return
      await createMessage({ orderId: order?.id ?? '', message: message.value })
      setMessageInput('')
      formRef.current?.reset()
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <>
      <ChatToggle toggleChat={toggleChat} />
      {chatOpen && (
        <div className='fixed bottom-0 right-0 top-0 z-50  flex w-full flex-col items-end overflow-hidden rounded-xl border  border-gray-300 bg-neutral-50 shadow-lg sm:top-auto sm:m-4  sm:h-[80vh] sm:w-[350px]'>
          <div className='flex w-full items-center justify-start border-b bg-white px-3 py-2'>
            <div className=' cursor-pointer rounded-full p-2' onClick={toggleChat}>
              <Image src='/icons/cross.svg' alt='cross' width={10} height={10} />
            </div>
            <p className='text-sm font-semibold'>Orden #{order?.id.slice(0, 4)}</p>
          </div>
          <div className='flex w-full flex-grow flex-col gap-3 overflow-y-auto px-3 py-3 '>
            {messages?.map((item, index) => {
              const prevIsNotOwned = index === 0 || messages[index - 1]?.user_id !== item?.user_id
              const owner = profile?.id === item?.user_id
              const otherIsShop = profile?.role === RoleEnum.Customer && item?.user?.role !== RoleEnum.Customer
              return (
                <div
                  key={index}
                  className={`flex max-w-xs flex-col gap-1 ${!prevIsNotOwned && 'mt-[-6px]'} ${item?.user_id === profile?.id ? 'align-end w-9/12 self-end' : 'w-9/12 '}`}
                >
                  {prevIsNotOwned ? (
                    <p className={`text-xs font-medium text-black ${owner ? 'text-end' : 'text-start'}`}>
                      {!otherIsShop ? item?.user?.first_name + ' ' + item?.user?.last_name : 'Tienda'}
                    </p>
                  ) : null}
                  <div
                    className={` rounded-xl px-3 py-3 text-sm ${
                      owner ? ' rounded-br-none  bg-orange-100 text-orange-700 ' : ' rounded-tl-none  bg-neutral-200'
                    }`}
                  >
                    <p className='text-sm font-light'>{item?.message}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='flex w-full items-center justify-start border-t bg-white px-1 py-2'>
            <form onSubmit={handleSendMessageClick} className='flex w-full items-center gap-2 pr-2 ' ref={formRef}>
              <Input
                type='text'
                name='message'
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value)
                }}
                placeholder='Escribe acá...'
                fullWidth
                radius='full'
                classNames={{
                  inputWrapper: 'shadow-none border-0 !bg-white focus:!bg-white'
                }}
              />
              <button type='submit'>
                <div className='cursor-pointer p-2'>
                  <Image src='/icons/send.svg' alt='cross' width={25} height={25} />
                </div>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBox
