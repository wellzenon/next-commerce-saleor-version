import * as fragment from '../fragments'

export const CheckoutLineAddByToken = /* GraphQL */ `
  mutation CheckoutLineAddByToken($token: UUID!, $lineItems: [CheckoutLineInput!]!) {
    checkoutLinesAdd(token: $token, lines: $lineItems) {
      errors {
        code
        field
        message
      }
      checkout {
        ...CheckoutDetails
      }
    }
  }
  ${fragment.CheckoutDetails}
`
