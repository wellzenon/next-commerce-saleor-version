import { FC } from 'react'
import cn from 'classnames'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import s from './PaymentMethodView.module.css'
import SidebarLayout from '@components/common/SidebarLayout'
import { useTranslations } from 'next-intl'

const PaymentMethodView: FC = () => {
  const { setSidebarView } = useUI()
  const t = useTranslations('Layout.Sidebar.PaymentMethodView')

  return (
    <SidebarLayout handleBack={() => setSidebarView('CHECKOUT_VIEW')}>
      <div className="px-4 sm:px-6 flex-1">
        <Text variant="sectionHeading">{t('title')}</Text>
        <div>
          <div className={s.fieldset}>
            <label className={s.label}>{t('card name')}</label>
            <input className={s.input} />
          </div>
          <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-7')}>
              <label className={s.label}>{t('card number')}</label>
              <input className={s.input} />
            </div>
            <div className={cn(s.fieldset, 'col-span-3')}>
              <label className={s.label}>{t('expires')}</label>
              <input className={s.input} placeholder="MM/YY" />
            </div>
            <div className={cn(s.fieldset, 'col-span-2')}>
              <label className={s.label}>{t('cvc')}</label>
              <input className={s.input} />
            </div>
          </div>
          <hr className="border-accent-2 my-6" />
          <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>{t('first name')}</label>
              <input className={s.input} />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>{t('last name')}</label>
              <input className={s.input} />
            </div>
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>{t('company')}</label>
            <input className={s.input} />
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>{t('address')}</label>
            <input className={s.input} />
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>{t('address comp')}</label>
            <input className={s.input} />
          </div>
          <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>{t('code')}</label>
              <input className={s.input} />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>{t('city')}</label>
              <input className={s.input} />
            </div>
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>{t('country')}</label>
            <select className={s.select}>
              <option>Hong Kong</option>
            </select>
          </div>
        </div>
      </div>
      <div className="sticky z-20 bottom-0 w-full right-0 left-0 py-12 bg-accent-0 border-t border-accent-2 px-6">
        <Button Component="a" width="100%" variant="ghost">
          {t('button')}
        </Button>
      </div>
    </SidebarLayout>
  )
}

export default PaymentMethodView
