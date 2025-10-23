import React, { useState, useContext } from 'react'
import { PostsContext } from '../context/PostsContext'
import { AuthContext } from '../context/AuthContext'
import { LanguageContext } from '../context/LanguageContext'

export default function CreatePost() {
  const { addPost } = useContext(PostsContext)
  const { user } = useContext(AuthContext)
  const { t } = useContext(LanguageContext)
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    addPost({
      text,
      author: user.username,
      image: preview, // lokalny URL
      createdAt: new Date().toISOString()
    })
    setText('')
    setImage(null)
    setPreview(null)
  }

  if (!user) {
    return <p className="text-center text-muted mt-4">{t('noPosts')}</p>
  }

  return (
    <div className="card shadow-sm my-3">
      <div className="card-body">
        <h5 className="card-title mb-3">{t('addPost')}</h5>
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-2"
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Co masz na myśli?"
          />
          <div className="d-flex align-items-center gap-3 mb-3">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="rounded"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
            )}
          </div>
          <button className="btn btn-primary" type="submit">
            {t('addPost')}
          </button>
        </form>
      </div>
    </div>
  )
}
