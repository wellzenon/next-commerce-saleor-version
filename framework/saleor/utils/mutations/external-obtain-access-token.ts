export const ExternalObtainAccessToken = /* GraphQL */ `
  mutation ExternalObtainAccessToken($input: JSONString!, $pluginId: String!) {
    externalObtainAccessTokens(input: $input, pluginId: $pluginId) {
      token
      refreshToken
      csrfToken
      user {
        id
        email
        isActive
        checkoutTokens
      }
      errors {
        field
        message
      }
    }
  }
`
