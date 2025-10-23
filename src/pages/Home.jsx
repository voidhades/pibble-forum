import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { PostsContext } from '../context/PostsContext'
import { LanguageContext } from '../context/LanguageContext'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'

export default function Home() {
  const { user } = useContext(AuthContext)
  const { addPost } = useContext(PostsContext)
  const { t } = useContext(LanguageContext)

  const handleSave = (data) => {
    if (!user) {
      alert(t('mustBeLogged')) // Сообщение о необходимости логина
      return
    }
    addPost({ ...data, author: user.username })
  }

  return (
    <div className="container py-4">
      <h1 className="mb-3">pibble</h1>

      {user ? (
        <p>
          {t('welcome')}, <strong>{user.username}</strong> — {t('canAddPosts')}.
        </p>
      ) : (
        <p>{t('loginToAddPosts')}</p>
      )}

      <PostForm onSave={handleSave} />
      <hr />
      <PostList />

      {user && (
        <p className="mt-3 text-muted">
          <small>
            {t('defaultAdmin')}: <code>admin</code>/<code>admin</code>
          </small>
        </p>
      )}
    </div>
  )
}
