import React, { useState, useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

export default function PostForm({ onSave, initial }) {
  const { t } = useContext(LanguageContext)
  const [title, setTitle] = useState(initial?.title || '')
  const [content, setContent] = useState(initial?.content || '')
  const [image, setImage] = useState(initial?.image || null)
  const [preview, setPreview] = useState(initial?.image || null)
  const [fileName, setFileName] = useState('')

  const onFile = (e) => {
    const file = e.target.files[0]
    if (!file) {
      setImage(null)
      setPreview(null)
      setFileName('')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      setImage(file)
      setPreview(ev.target.result)
      setFileName(file.name)
    }
    reader.readAsDataURL(file)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!title.trim() && !content.trim()) return
    onSave({ title: title.trim(), content: content.trim(), image: preview })
    setTitle('')
    setContent('')
    setImage(null)
    setPreview(null)
    setFileName('')
  }

  return (
    <form onSubmit={submit} className="mb-4">
      <div className="mb-3">
        <input
          className="form-control"
          placeholder={t('title')}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="4"
          placeholder={t('content')}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      {/* Custom File Input */}
      <div className="mb-3">
        <label className="form-label">{t('image')}</label>
        <div className="d-flex align-items-center">
          <label
            htmlFor="fileInput"
            className="btn btn-outline-primary me-2"
            style={{ cursor: 'pointer' }}
          >
            {t('chooseFile')}
          </label>
          <span>{fileName || t('noFileSelected')}</span>
        </div>
        <input
          id="fileInput"
          type="file"
          className="d-none"
          accept="image/*"
          onChange={onFile}
        />
      </div>

      {preview && (
        <img src={preview} alt="preview" className="img-fluid rounded mb-2 post-image" />
      )}

      <div>
        <button className="btn btn-accent" type="submit">{t('submit')}</button>
      </div>
    </form>
  )
}
