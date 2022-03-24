import cn from 'classnames'
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
  useState,
  useEffect,
} from 'react'
import mergeRefs from 'react-merge-refs'
import s from './GoogleSignIn.module.css'
import { LoadingDots } from '@components/ui'
import useExternalAuthenticationUrl from '@framework/auth/use-external-authentication-url'
import { Google } from '@components/icons'

export interface GoogleSignInProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'flat' | 'slim' | 'ghost'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
}

const GoogleSignIn: React.FC<GoogleSignInProps> = forwardRef(
  (props, buttonRef) => {
    const {
      className,
      variant = 'flat',
      children,
      active,
      width,
      loading = false,
      disabled = false,
      style = {},
      Component = 'a',
      ...rest
    } = props
    const ref = useRef<typeof Component>(null)
    const externalAuthenticationUrl = useExternalAuthenticationUrl()

    const pluginId = 'plugin.socialauth'
    const provider = 'google'
    const redirectUri = `http://localhost:3000/auth/${provider}`
    const [authUri, setAuthUri] = useState(redirectUri)

    const rootClassName = cn(
      s.root,
      {
        [s.ghost]: variant === 'ghost',
        [s.slim]: variant === 'slim',
        [s.loading]: loading,
        [s.disabled]: disabled,
      },
      className
    )

    useEffect(() => {
      ;(async () => {
        const input = JSON.stringify({ redirectUri, provider })
        const { authenticationData } =
          (await externalAuthenticationUrl({
            pluginId,
            input,
          })) || {}

        const { authorizationUrl } = JSON.parse(authenticationData)
        setAuthUri(authorizationUrl)
      })()
    }, [])

    return (
      <>
        <Component
          aria-pressed={active}
          data-variant={variant}
          ref={mergeRefs([ref, buttonRef])}
          className={rootClassName}
          disabled={disabled}
          style={{
            width,
            padding: '0.1em',
            justifyContent: 'start',
            ...style,
          }}
          {...rest}
          href={authUri}
        >
          <Google />
          Google Sign In
          {loading && (
            <i className="pl-2 m-0 flex">
              <LoadingDots />
            </i>
          )}
        </Component>
      </>
    )
  }
)

export default GoogleSignIn
