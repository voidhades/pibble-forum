import React, { useState, useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

export default function AuthForm({ onSubmit, buttonTextKey }) {
  const { t } = useContext(LanguageContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSubmit({ username: username.trim(), password: password.trim() })
  }

  return (

      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">{t('username')}</label>
          <input
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder={t('placeholderUsername')}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t('password')}</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={t('placeholderPassword')}
            required
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-accent" type="submit">{t(buttonTextKey)}</button>
        </div>
      </form>

  )
}
