import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { PostsContext } from '../context/PostsContext'
import { LanguageContext } from '../context/LanguageContext'
import PostForm from './PostForm'

export default function PostItem({ post }) {
  const { user } = useContext(AuthContext)
  const { updatePost, deletePost } = useContext(PostsContext)
  const { t } = useContext(LanguageContext)
  const [editing, setEditing] = useState(false)

  const canEdit = user && (user.username === post.author || user.isAdmin)

  const save = (data) => {
    updatePost(post.id, data)
    setEditing(false)
  }

  const rawDate = post.date || post.createdAt || post.created_at || post.created
  let dateStr = ''
  try {
    const d = rawDate ? new Date(rawDate) : null
    dateStr = d && !isNaN(d.getTime()) ? d.toLocaleString() : ''
  } catch (e) {
    dateStr = ''
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        {editing ? (
          <PostForm initial={post} onSave={save} />
        ) : (
          <>
            <h5 className="card-title">{post.title || '(brak tytułu)'}</h5>
            <p className="card-text">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt={post.title || `image-${post.id}`}
                className="img-fluid rounded mb-2"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            )}
            <small className="text-muted d-block">
              {t('author')}: {post.author} {dateStr && <>• {dateStr}</>}
            </small>
            {canEdit && (
              <div className="mt-2">
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => setEditing(true)}
                >
                  {t('edit') || 'Edytuj'}
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    const confirmText = t('deleteConfirm') || 'Usuń wpis?'
                    if (window.confirm(confirmText)) deletePost(post.id)
                  }}
                >
                  {t('delete') || 'Usuń'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
