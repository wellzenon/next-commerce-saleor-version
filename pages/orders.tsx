import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import { useTranslations } from 'next-intl'
import { pick } from 'lodash'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const messages = pick(
    await import(`../messages/${locale}.json`),
    Orders.messages
  )

  return {
    props: { messages, pages, categories },
  }
}

export default function Orders() {
  const t = useTranslations('Orders')
  return (
    <Container>
      <Text variant="pageHeading">{t('title')}</Text>
      <div className="flex-1 p-24 flex flex-col justify-center items-center ">
        <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
          <Bag className="absolute" />
        </span>
        <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
          {t('message')}
        </h2>
        <p className="text-accent-6 px-10 text-center pt-2">{t('details')}</p>
      </div>
    </Container>
  )
}

Orders.messages = ['Orders', ...Layout.messages]
Orders.Layout = Layout
