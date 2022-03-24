import React, { FC } from 'react'
import { Cross, ChevronLeft } from '@components/icons'
import { UserNav } from '@components/common'
import cn from 'classnames'
import s from './SidebarLayout.module.css'
import { useTranslations } from 'next-intl'

type ComponentProps = { className?: string } & (
  | { handleClose: () => any; handleBack?: never }
  | { handleBack: () => any; handleClose?: never }
)

const SidebarLayout: FC<ComponentProps> = ({
  children,
  className,
  handleClose,
  handleBack,
}) => {
  const t = useTranslations('Layout.Sidebar.CartSidebarView')
  return (
    <div className={cn(s.root, className)}>
      <header className={s.header}>
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label={t('close')}
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none"
          >
            <Cross className="h-6 w-6 hover:text-accent-3" />
            <span className="ml-2 text-accent-7 text-sm ">{t('close')}</span>
          </button>
        )}
        {handleBack && (
          <button
            onClick={handleBack}
            aria-label={t('back')}
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6 hover:text-accent-3" />
            <span className="ml-2 text-accent-7 text-xs">{t('back')}</span>
          </button>
        )}
        <span className={s.nav}>
          <UserNav />
        </span>
      </header>
      <div className={s.container}>{children}</div>
    </div>
  )
}

export default SidebarLayout
