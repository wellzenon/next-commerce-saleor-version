import { useCallback } from 'react'

import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useCustomer from '../customer/use-customer'
import * as mutation from '../utils/mutations'
import { Mutation, MutationTokenCreateArgs } from '../schema'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import { setCSRFToken, setToken, throwUserErrors, handleCheckout, getCheckoutId } from '../utils'
import { LoginHook } from '@commerce/types/login'
import { useCart } from '@framework/cart'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<LoginHook> = {
  fetchOptions: {
    query: mutation.SessionCreate,
  },
  async fetcher({ input: { email, password, isCartEmpty }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'A first name, last name, email and password are required to login',
      })
    }

    const { tokenCreate } = await fetch<Mutation, MutationTokenCreateArgs>({
      ...options,
      variables: { email, password },
    })

    throwUserErrors(tokenCreate?.errors)

    const { user, token, csrfToken } = tokenCreate!

    if (token && csrfToken) {
      setToken(token)
      setCSRFToken(csrfToken)

      const { checkoutId, checkoutToken } = getCheckoutId()
      handleCheckout(fetch, {
        variables: {
          checkoutId,
          checkoutToken,
          isCartEmpty,
          userCheckoutTokens: user?.checkoutTokens,
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
      const { isEmpty, revalidate: revalidateCart } = useCart()

      return useCallback(
        async function login(input) {
          await revalidateCart()
          input.isCartEmpty = isEmpty
          const data = await fetch({ input })
          await revalidate()
          return data
        },
        [fetch, revalidate]
      )
    },
}
