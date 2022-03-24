import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { MutationHook, HookFetcherFn } from '../utils/types'
import type { ExternalAuthenticationUrlHook } from '../types/external-authentication-url'
import type { Provider } from '..'

export type UseExternalAuthenticationUrl<
  H extends MutationHook<
    ExternalAuthenticationUrlHook<any>
  > = MutationHook<ExternalAuthenticationUrlHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<ExternalAuthenticationUrlHook> =
  mutationFetcher

const fn = (provider: Provider) => provider.auth?.useExternalAuthenticationUrl!

const useExternalAuthenticationUrl: UseExternalAuthenticationUrl = (
  ...args
) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useExternalAuthenticationUrl
