import { FC } from 'react'
import s from './ShippingWidget.module.css'
import { ChevronRight, MapPin } from '@components/icons'
import cn from 'classnames'
import { useTranslations } from 'next-intl'

interface ComponentProps {
  onClick?: () => any
}

const ShippingWidget: FC<ComponentProps> = ({ onClick }) => {
  const t = useTranslations('Layout.Sidebar.ShippingWidget')

  /* Shipping Address 
  Only available with checkout set to true - 
  This means that the provider does offer checkout functionality. */
  return (
    <div onClick={onClick} className={s.root}>
      <div className="flex flex-1 items-center">
        <MapPin className="w-5 flex" />
        <span className="ml-5 text-sm text-center font-medium">
          {t('text')}
        </span>
        {/* <span>
          1046 Kearny Street.<br/>
          San Franssisco, California
        </span> */}
      </div>
      <div>
        <ChevronRight />
      </div>
    </div>
  )
}

export default ShippingWidget
