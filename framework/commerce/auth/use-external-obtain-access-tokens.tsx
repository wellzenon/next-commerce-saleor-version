import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { MutationHook, HookFetcherFn } from '../utils/types'
import type { ExternalObtainAccessTokensHook } from '../types/external-obtain-access-tokens'
import type { Provider } from '..'

export type UseExternalObtainAccessTokens<
  H extends MutationHook<
    ExternalObtainAccessTokensHook<any>
  > = MutationHook<ExternalObtainAccessTokensHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<ExternalObtainAccessTokensHook> =
  mutationFetcher

const fn = (provider: Provider) => provider.auth?.useExternalObtainAccessTokens!

const useExternalObtainAccessTokens: UseExternalObtainAccessTokens = (
  ...args
) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useExternalObtainAccessTokens
