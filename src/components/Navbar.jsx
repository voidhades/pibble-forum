import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'
import { LanguageContext } from '../context/LanguageContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { lang, toggleLang, t } = useContext(LanguageContext)
  const nav = useNavigate()

  const doLogout = () => {
    logout()
    nav('/')
  }

  return (
    <nav
      className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} fixed-top shadow-sm`}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">pibble</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/">{t('home') || 'Home'}</Link>
            </li>
            {user ? (
              <>
                <li className="nav-item nav-link mb-0">
                  {t('welcome')}, <strong>{user.username}</strong>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={doLogout}
                  >
                    {t('logout')}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">{t('login')}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">{t('register')}</Link>
                </li>
              </>
            )}

            {/* Language */}
            <li className="nav-item">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={toggleLang}
              >
                🌐 {lang.toUpperCase()}
              </button>
            </li>

            {/* Theme */}
            <li className="nav-item">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
