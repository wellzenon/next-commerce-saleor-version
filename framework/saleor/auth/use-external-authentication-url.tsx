import { useCallback } from 'react'

import type { MutationHook } from '@commerce/utils/types'
import * as mutation from '../utils/mutations'
import { ExternalAuthenticationUrl, Mutation, MutationExternalAuthenticationUrlArgs } from '../schema'
import useExternalAuthenticationUrl, {
  UseExternalAuthenticationUrl,
} from '@commerce/auth/use-external-authentication-url'
import { ExternalAuthenticationUrlHook } from '@commerce/types/external-authentication-url'

export default useExternalAuthenticationUrl as UseExternalAuthenticationUrl<typeof handler>

export const handler: MutationHook<ExternalAuthenticationUrlHook> = {
  fetchOptions: {
    query: mutation.ExternalAuthenticationUrl,
  },
  async fetcher({ input: { input, pluginId }, options, fetch }) {
    const { externalAuthenticationUrl } = await fetch<Mutation, MutationExternalAuthenticationUrlArgs>({
      ...options,
      variables: { input, pluginId },
    })

    return externalAuthenticationUrl as ExternalAuthenticationUrl
  },
  useHook:
    ({ fetch }) =>
    () => {
      return useCallback(
        async function socialLogin(input) {
          const data = await fetch({ input })
          return data
        },
        [fetch]
      )
    },
}
