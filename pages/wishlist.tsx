import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Heart } from '@components/icons'
import { Layout } from '@components/common'
import { Text, Container } from '@components/ui'
import { useCustomer } from '@framework/customer'
import { WishlistCard } from '@components/wishlist'
import useWishlist from '@framework/wishlist/use-wishlist'
import { pick } from 'lodash'
import { useTranslations } from 'next-intl'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  // Disabling page if Feature is not available
  if (!process.env.COMMERCE_WISHLIST_ENABLED) {
    return {
      notFound: true,
    }
  }

  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const messages = pick(
    await import(`../messages/${locale}.json`),
    Wishlist.messages
  )

  return {
    props: {
      messages,
      pages,
      categories,
    },
  }
}

export default function Wishlist() {
  const t = useTranslations('Wishlist')
  const { data: customer } = useCustomer()
  // @ts-ignore Shopify - Fix this types
  const { data, isLoading, isEmpty } = useWishlist({ includeProducts: true })

  return (
    <Container>
      <div className="mt-3 mb-20">
        <Text variant="pageHeading">My Wishlist</Text>
        <div className="group flex flex-col">
          {isLoading || isEmpty ? (
            <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
              <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
                <Heart className="absolute" />
              </span>
              <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                {t('emptyTitle')}
              </h2>
              <p className="text-accent-6 px-10 text-center pt-2">
                {t('emptyMessage')}
              </p>
            </div>
          ) : (
            data &&
            // @ts-ignore Shopify - Fix this types
            data.items?.map((item) => (
              <WishlistCard key={item.id} product={item.product! as any} />
            ))
          )}
        </div>
      </div>
    </Container>
  )
}

Wishlist.messages = ['Wishlist', ...Layout.messages]
Wishlist.Layout = Layout
