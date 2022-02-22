import { FC } from 'react'
import s from './PaymentWidget.module.css'
import { ChevronRight, CreditCard } from '@components/icons'
import { useTranslations } from 'next-intl'

interface ComponentProps {
  onClick?: () => any
}

const PaymentWidget: FC<ComponentProps> = ({ onClick }) => {
  const t = useTranslations('Layout.Sidebar.PaymentWidget')
  /* Shipping Address 
  Only available with checkout set to true - 
  This means that the provider does offer checkout functionality. */
  return (
    <div onClick={onClick} className={s.root}>
      <div className="flex flex-1 items-center">
        <CreditCard className="w-5 flex" />
        <span className="ml-5 text-sm text-center font-medium">
          {t('text')}
        </span>
        {/* <span>VISA #### #### #### 2345</span> */}
      </div>
      <div>
        <ChevronRight />
      </div>
    </div>
  )
}

export default PaymentWidget
