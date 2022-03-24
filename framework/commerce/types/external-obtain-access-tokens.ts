import { ExternalObtainAccessTokens, Maybe } from '@framework/schema'

export type ExternalObtainAccessTokensBody = {
  input: string
  pluginId: string
  isCartEmpty?: boolean
}

export type ExternalObtainAccessTokensTypes = {
  body: ExternalObtainAccessTokensBody
}

export type ExternalObtainAccessTokensHook<
  T extends ExternalObtainAccessTokensTypes = ExternalObtainAccessTokensTypes
> = {
  data: Maybe<ExternalObtainAccessTokens>
  actionInput: ExternalObtainAccessTokensBody
  fetcherInput: ExternalObtainAccessTokensBody
  body: T['body']
}

export type ExternalObtainAccessTokensSchema<
  T extends ExternalObtainAccessTokensTypes = ExternalObtainAccessTokensTypes
> = {
  endpoint: {
    options: {}
    handlers: {
      login: ExternalObtainAccessTokensHook<T>
    }
  }
}

export type ExternalObtainAccessTokensOperation = {
  data: { result?: string }
  variables: unknown
}
