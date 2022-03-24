import { FC, useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import useLogin from '@framework/auth/use-login'
import { useUI } from '@components/ui/context'
import { validate } from 'email-validator'
import { useTranslations } from 'next-intl'
import GoogleSignIn from '@components/external-auth/google'

interface Props {}

const LoginView: FC<Props> = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { setModalView, closeModal } = useUI()

  const login = useLogin()
  const t = useTranslations('Layout.Modal.LoginView')

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      await login({
        email,
        password,
      })
      setLoading(false)
      closeModal()
    } catch ({ errors }) {
      setMessage(errors[0].message)
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email) || password.length < 7 || !validPassword)
    }
  }, [email, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="w-80 flex flex-col justify-between p-3"
      >
        <div className="flex justify-center pb-12 ">
          <Logo width="64px" height="64px" />
        </div>
        <div className="flex flex-col space-y-3">
          {message && (
            <div className="text-red border border-red p-3">
              `${message}. ${t('message')}`
              <a
                className="text-accent-9 inline font-bold hover:underline cursor-pointer"
                onClick={() => setModalView('FORGOT_VIEW')}
              >
                {t('messageLink')}
              </a>
            </div>
          )}
          <GoogleSignIn />
          <h2 style={{ textAlign: 'center' }}>{t('or')}</h2>
          <Input type="email" placeholder={t('email')} onChange={setEmail} />
          <Input
            type="password"
            placeholder={t('password')}
            onChange={setPassword}
          />
          <Button
            variant="slim"
            type="submit"
            loading={loading}
            disabled={disabled}
          >
            {t('button')}
          </Button>
          <div className="pt-1 text-center text-sm">
            <span className="text-accent-7">{t('register')}</span>
            {` `}
            <a
              className="text-accent-9 font-bold hover:underline cursor-pointer"
              onClick={() => setModalView('SIGNUP_VIEW')}
            >
              {t('registerLink')}
            </a>
          </div>
        </div>
      </form>
    </>
  )
}
export default LoginView
