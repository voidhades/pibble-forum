import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { LanguageContext } from '../context/LanguageContext'
import AuthForm from '../components/AuthForm'

export default function Register() {
  const { register } = useContext(AuthContext)
  const { t } = useContext(LanguageContext)
  const nav = useNavigate()
  const [err, setErr] = useState(null)

  const submit = (data) => {
    const res = register(data)
    if (!res.ok) setErr(res.message)
    else nav('/')
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="auth-card card p-4">
        <h2 className="mb-3 text-center">{t('headerRegister')}</h2>
        {err && <div className="alert alert-danger">{t(err)}</div>}
        <AuthForm onSubmit={submit} buttonTextKey="register" />
      </div>
    </div>
  )
}
