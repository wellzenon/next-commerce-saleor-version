import cn from 'classnames'
import Link from 'next/link'
import { FC, useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import s from './DropdownMenu.module.css'
import { Avatar } from '@components/common'
import { Moon, Sun } from '@components/icons'
import { useUI } from '@components/ui/context'
import ClickOutside from '@lib/click-outside'
import useLogout from '@framework/auth/use-logout'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import { useTranslations } from 'next-intl'

interface DropdownMenuProps {
  open?: boolean
}

const DropdownMenu: FC<DropdownMenuProps> = ({ open = false }) => {
  const logout = useLogout()
  const { pathname } = useRouter()
  const { theme, setTheme } = useTheme()
  const [display, setDisplay] = useState(false)
  const { closeSidebarIfPresent } = useUI()
  const ref = useRef() as React.MutableRefObject<HTMLUListElement>
  const t = useTranslations('Layout.Sidebar.UserNav')

  const LINKS = [
    { name: t('orders'), href: '/orders' },
    { name: t('profile'), href: '/profile' },
    { name: t('cart'), href: '/cart' },
  ]
  useEffect(() => {
    if (ref.current) {
      if (display) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [display])

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div>
        <button
          className={s.avatarButton}
          onClick={() => setDisplay(!display)}
          aria-label="Menu"
        >
          <Avatar />
        </button>
        {display && (
          <ul className={s.dropdownMenu} ref={ref}>
            {LINKS.map(({ name, href }) => (
              <li key={href}>
                <div>
                  <Link href={href}>
                    <a
                      className={cn(s.link, {
                        [s.active]: pathname === href,
                      })}
                      onClick={() => {
                        setDisplay(false)
                        closeSidebarIfPresent()
                      }}
                    >
                      {name}
                    </a>
                  </Link>
                </div>
              </li>
            ))}
            <li>
              <a
                className={cn(s.link, 'justify-between')}
                onClick={() => {
                  theme === 'dark' ? setTheme('light') : setTheme('dark')
                  setDisplay(false)
                }}
              >
                <div>
                  {t.rich('theme', {
                    theme,
                    strong: (children) => <strong>{children}</strong>,
                  })}
                </div>
                <div className="ml-3">
                  {theme == 'dark' ? (
                    <Moon width={20} height={20} />
                  ) : (
                    <Sun width="20" height={20} />
                  )}
                </div>
              </a>
            </li>
            <li>
              <a
                className={cn(s.link, 'border-t border-accent-2 mt-4')}
                onClick={() => logout()}
              >
                {t('logout')}
              </a>
            </li>
          </ul>
        )}
      </div>
    </ClickOutside>
  )
}

export default DropdownMenu
