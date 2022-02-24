export const RefreshToken = /* GraphQL */ `
  mutation RefreshToken($csrfToken: String!) {
    tokenRefresh(csrfToken: $csrfToken) {
      token
      user {
        id
        email
        firstName
        lastName
        dateJoined
      }
      errors {
        code
        message
      }
    }
  }
`
