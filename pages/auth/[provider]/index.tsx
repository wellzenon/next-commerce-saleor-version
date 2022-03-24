import useExternalObtainAccessTokens from '@framework/auth/use-external-obtain-access-tokens'
import { GetStaticPathsContext, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Layout } from '@components/common'
import Home, { getStaticProps as getHomeStaticProps } from '../../index'
import { useCart } from '@framework/cart'

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHomeStaticProps(context)
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  return {
    paths: locales?.reduce<string[]>((arr, locale) => {
      // Add a product path for every locale
      ;['google', 'facebook'].forEach((provider: any) => {
        arr.push(`/${locale}/auth/${provider}`)
      })
      return arr
    }, []),
    fallback: 'blocking',
  }
}

const Callback = () => {
  const obtainAccessTokens = useExternalObtainAccessTokens()
  const { provider, code, state } = useRouter().query
  const pluginId = 'plugin.socialauth'

  useEffect(() => {
    ;(async () => {
      if (code) {
        const input = JSON.stringify({ code, state, provider })
        await obtainAccessTokens({ input, pluginId })
        history.go(-2)
      }
    })()
  }, [code])

  return <h1>Loading...</h1>
}

Callback.Layout = Layout
export default Callback
