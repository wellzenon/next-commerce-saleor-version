import { ExternalAuthenticationUrl, Maybe } from '@framework/schema'

export type ExternalAuthenticationUrlBody = {
  input: string
  pluginId: string
}

export type ExternalAuthenticationUrlTypes = {
  body: ExternalAuthenticationUrlBody
}

export type ExternalAuthenticationUrlHook<
  T extends ExternalAuthenticationUrlTypes = ExternalAuthenticationUrlTypes
> = {
  data: Maybe<ExternalAuthenticationUrl>
  actionInput: ExternalAuthenticationUrlBody
  fetcherInput: ExternalAuthenticationUrlBody
  body: T['body']
}

export type ExternalAuthenticationUrlSchema<
  T extends ExternalAuthenticationUrlTypes = ExternalAuthenticationUrlTypes
> = {
  endpoint: {
    options: {}
    handlers: {
      login: ExternalAuthenticationUrlHook<T>
    }
  }
}

export type ExternalAuthenticationUrlOperation = {
  data: { result?: string }
  variables: unknown
}
