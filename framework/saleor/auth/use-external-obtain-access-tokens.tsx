import { useCallback } from 'react'

import type { MutationHook } from '@commerce/utils/types'
import useCustomer from '../customer/use-customer'
import * as mutation from '../utils/mutations'
import { ExternalObtainAccessTokens, Mutation, MutationExternalObtainAccessTokensArgs } from '../schema'
import type { UseExternalObtainAccessTokens } from '@commerce/auth/use-external-obtain-access-tokens'
import useExternalObtainAccessTokens from '@commerce/auth/use-external-obtain-access-tokens'
import { ExternalObtainAccessTokensHook } from '@commerce/types/external-obtain-access-tokens'
import { setCSRFToken, setToken, throwUserErrors, handleCheckout, getCheckoutId } from '../utils'
import { useCart } from '@framework/cart'

export default useExternalObtainAccessTokens as UseExternalObtainAccessTokens<typeof handler>

export const handler: MutationHook<ExternalObtainAccessTokensHook> = {
  fetchOptions: {
    query: mutation.ExternalObtainAccessToken,
  },
  async fetcher({ input: { input, pluginId, isCartEmpty }, options, fetch }) {
    const { externalObtainAccessTokens } = await fetch<Mutation, MutationExternalObtainAccessTokensArgs>({
      ...options,
      variables: { input, pluginId },
    })

    throwUserErrors(externalObtainAccessTokens?.errors)

    const { token, csrfToken, user } = externalObtainAccessTokens!

    if (token && csrfToken) {
      setToken(token)
      setCSRFToken(csrfToken)

      const { checkoutId, checkoutToken } = getCheckoutId()
      await handleCheckout(fetch, {
        variables: {
          newCheckoutId: checkoutId,
          newCheckoutToken: checkoutToken,
          allOldCheckoutsTokens: user?.checkoutTokens,
        },
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
    }

    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { revalidate } = useCustomer()

      return useCallback(
        async function socialLogin(input) {
          const data = await fetch({ input })
          await revalidate()
          return data
        },
        [fetch, revalidate]
      )
    },
}
