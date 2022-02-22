import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import commerce from '@lib/api/commerce'
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
    Profile.messages
  )

  return {
    props: { messages, pages, categories },
  }
}

export default function Profile() {
  const { data } = useCustomer()
  const t = useTranslations('Profile')

  return (
    <Container>
      <Text variant="pageHeading">{t('title')}</Text>
      {data && (
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 pr-4">
            <div>
              <Text variant="sectionHeading">{t('name')}</Text>
              <span>
                {data.firstName} {data.lastName}
              </span>
            </div>
            <div className="mt-5">
              <Text variant="sectionHeading">{t('email')}</Text>
              <span>{data.email}</span>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

Profile.messages = ['Profile', ...Layout.messages]
Profile.Layout = Layout
