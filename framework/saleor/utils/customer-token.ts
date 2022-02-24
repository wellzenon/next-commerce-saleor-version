import Cookies, { CookieAttributes } from 'js-cookie'

import * as Const from '../const'

export const getToken = () => Cookies.get(Const.SALEOR_TOKEN)
export const setToken = (token?: string, options?: CookieAttributes) => {
  setCookie(Const.SALEOR_TOKEN, token, options)
}

export const getCSRFToken = () => localStorage.getItem(Const.SALEOR_CRSF_TOKEN)
export const setCSRFToken = (token?: string) => {
  setLocalStorage(Const.SALEOR_CRSF_TOKEN, token)
}

export const getCheckoutToken = () => Cookies.get(Const.CHECKOUT_ID_COOKIE)
export const setCheckoutToken = (token?: string, options?: CookieAttributes) => {
  setCookie(Const.CHECKOUT_ID_COOKIE, token, options)
}

const setCookie = (name: string, token?: string, options?: CookieAttributes) => {
  if (!token) {
    Cookies.remove(name)
  } else {
    Cookies.set(name, token, options ?? { expires: 60 * 60 * 24 * 30 })
  }
}

const setLocalStorage = (name: string, token?: string): void => {
  if (token) {
    localStorage.setItem(name, token)
  } else {
    localStorage.removeItem(name)
  }
}

export const isTokenExpired = (token: string | undefined): boolean =>
  (token && Date.now() >= JSON.parse(atob(token.split('.')[1])).exp * 1000) || false
