import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Text } from '@components/ui'
import { useTranslations } from 'next-intl'
import { pick } from 'lodash'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const { pages } = await commerce.getAllPages({ config, preview })
  const { categories, brands } = await commerce.getSiteInfo({ config, preview })
  const messages = pick(
    await import(`../messages/${locale}.json`),
    NotFound.messages
  )
  return {
    props: {
      messages,
      pages,
      categories,
      brands,
    },
    revalidate: 200,
  }
}

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
      <Text variant="heading">{t('title')}</Text>
      <Text className="">{t('details')}</Text>
    </div>
  )
}

NotFound.messages = ['NotFound', ...Layout.messages]
NotFound.Layout = Layout
