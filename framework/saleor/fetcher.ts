import { Fetcher } from '@commerce/utils/types'
import { API_URL } from './const'
import { getToken, handleFetchResponse, handleRefreshToken, isTokenExpired } from './utils'

const fetcher: Fetcher = async ({ url = API_URL, method = 'POST', variables, query }) => {
  const token = getToken()

  return handleFetchResponse(
    await fetch(url!, {
      method,
      body: JSON.stringify({ query, variables }),
      headers: {
        Authorization: `JWT ${isTokenExpired(token) ? await handleRefreshToken() : token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
  )
}

export default fetcher
