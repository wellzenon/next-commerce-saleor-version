export const ExternalAuthenticationUrl = /* GraphQL */ `
  mutation ExternalAuthenticationUrl($input: JSONString!, $pluginId: String!) {
    externalAuthenticationUrl(input: $input, pluginId: $pluginId) {
      authenticationData
      errors {
        code
        field
        message
      }
    }
  }
`
