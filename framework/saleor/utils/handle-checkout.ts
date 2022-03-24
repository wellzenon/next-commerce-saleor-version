import * as query from './queries'
import * as mutation from './mutations'
import { CheckoutCustomerAttach } from '../schema'
import Cookies from 'js-cookie'
import { CHECKOUT_ID_COOKIE } from '@framework/const'

const setCheckoutCookie = ({ id, token }: { id?: string; token?: string }): void => {
  const value = `${id}:${token}`
  const options = {
    expires: 60 * 60 * 24 * 30,
  }
  Cookies.set(CHECKOUT_ID_COOKIE, value, options)
}

const getCheckout = async ({ token, fetch, headers }: any): Promise<CheckoutCustomerAttach> =>
  await fetch({
    query: query.CheckoutOne,
    variables: { checkoutId: token },
    headers,
  })

const checkoutAttach = async ({ checkoutId, fetch, headers }: any): Promise<CheckoutCustomerAttach> => {
  return await fetch({
    query: mutation.CheckoutAttach,
    variables: { checkoutId },
    headers,
  })
}

const getLastCheckout = async ({ lastCheckoutToken, fetch, headers }: any): Promise<CheckoutCustomerAttach> => {
  const { checkout } = await getCheckout({ token: lastCheckoutToken, fetch, headers })
  const { id, token } = checkout || {}

  setCheckoutCookie({ id, token })
  return { checkout, errors: [], checkoutErrors: [] }
}

const joinCheckouts = async ({
  newCheckoutToken,
  lastCheckoutToken,
  fetch,
  headers,
}: any): Promise<CheckoutCustomerAttach> => {
  const {
    checkout: { lines },
  } = await fetch({
    query: query.CheckoutOne,
    variables: { checkoutId: newCheckoutToken },
    headers,
  })

  const lineItems = lines.map(({ quantity, variant: { id: variantId } }: any) => ({ variantId, quantity }))

  const { checkoutLinesAdd } = await fetch({
    query: mutation.CheckoutLineAddByToken,
    variables: {
      token: lastCheckoutToken,
      lineItems,
    },
    headers,
  })

  const { id, token } = checkoutLinesAdd?.checkout
  setCheckoutCookie({ id, token })

  return checkoutLinesAdd
}

export const handleCheckout = async (
  fetch: any,
  { variables: { newCheckoutId, newCheckoutToken, allOldCheckoutsTokens }, headers }: any
): Promise<CheckoutCustomerAttach> => {
  const lastCheckoutToken = allOldCheckoutsTokens?.[0]
  if (!lastCheckoutToken) return await checkoutAttach({ newCheckoutId, fetch, headers })

  const { checkout } = await getCheckout({ token: newCheckoutToken, fetch, headers })
  const isCartEmpty = !checkout?.lines?.length

  if (isCartEmpty) return await getLastCheckout({ lastCheckoutToken, fetch, headers })

  return await joinCheckouts({
    newCheckoutToken,
    lastCheckoutToken,
    fetch,
    headers,
  })
}
