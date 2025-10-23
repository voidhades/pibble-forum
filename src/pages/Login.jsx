import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { LanguageContext } from '../context/LanguageContext'
import AuthForm from '../components/AuthForm'

export default function Login() {
  const { login } = useContext(AuthContext)
  const { t } = useContext(LanguageContext)
  const nav = useNavigate()
  const [err, setErr] = useState(null)

  const submit = (data) => {
    const res = login(data)
    if (!res.ok) setErr(res.message)
    else nav('/')
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="auth-card card p-4">
        <h2 className="mb-3 text-center">{t('headerLogin')}</h2>
        {err && <div className="alert alert-danger">{t(err)}</div>}
        <AuthForm onSubmit={submit} buttonTextKey="login" />
        <p className="mt-3 text-center">
          <small>{t('defaultAdmin')}: <code>admin</code>/<code>admin</code></small>
        </p>
      </div>
    </div>
  )
}
