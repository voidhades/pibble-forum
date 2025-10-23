import React, { createContext, useState, useEffect } from 'react'

export const PostsContext = createContext()
const LS = 'rf_posts'

function load(){
  try { return JSON.parse(localStorage.getItem(LS)) || [] }
  catch { return [] }
}

export function PostsProvider({ children }){
  const [posts, setPosts] = useState(load)

  useEffect(() => {
    localStorage.setItem(LS, JSON.stringify(posts))
  }, [posts])

  const addPost = (post) => {
    const p = {
      id: Date.now(),
      title: post.title || '',
      content: post.content || post.text || '',
      image: post.image || null,
      author: post.author || 'anonymous',
      date: new Date().toISOString()
    }
    setPosts(prev => [p, ...prev])
  }
  const updatePost = (id, data) => {
    setPosts(prev => prev.map(p => p.id===id?{...p,...data}:p))
  }
  const deletePost = (id) => {
    setPosts(prev => prev.filter(p => p.id!==id))
  }

  return (
    <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </PostsContext.Provider>
  )
}
