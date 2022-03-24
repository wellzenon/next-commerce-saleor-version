import { FC, useRef, useEffect } from 'react'
import { useUserAvatar } from '@lib/hooks/useUserAvatar'
import { relative } from 'path'

interface Props {
  className?: string
  children?: any
}

const Avatar: FC<Props> = ({ children }) => {
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>
  let { userAvatar } = useUserAvatar()

  return (
    <div
      ref={ref}
      style={{
        backgroundImage: userAvatar,
        position: 'relative',
        overflow: 'hidden',
      }}
      className="inline-block h-8 w-8 rounded-full border-2 border-primary hover:border-secondary focus:border-secondary transition-colors ease-linear"
    >
      {children}
    </div>
  )
}

export default Avatar
