import { FetcherOptions } from '@commerce/utils/types'
import { getCSRFToken, handleFetchResponse } from '.'
import { setToken } from './customer-token'
import * as mutation from './mutations'
import { API_URL } from '@framework/const'
import { RefreshToken } from '@framework/schema'

const handleRefreshToken = async (): Promise<RefreshToken['token'] | undefined> => {
  try {
    const csrfToken = getCSRFToken()
    const { tokenRefresh } = csrfToken
      ? await handleFetchResponse(
          await fetch(API_URL!, {
            method: 'POST',
            body: JSON.stringify({
              query: mutation.RefreshToken,
              variables: { csrfToken },
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          })
        )
      : { tokenRefresh: null }

    console.log({ csrfToken, tokenRefresh })
    setToken(tokenRefresh?.token)
    return tokenRefresh?.token
  } catch (error) {
    //
  }
}

export default handleRefreshToken
