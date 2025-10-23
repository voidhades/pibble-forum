import React, { useContext } from 'react'
import { PostsContext } from '../context/PostsContext'
import PostItem from './PostItem'
import { LanguageContext } from '../context/LanguageContext'

export default function PostList(){
  const { posts } = useContext(PostsContext)
  const { t } = useContext(LanguageContext)
  if(!posts.length) return <p>{t('noPosts')}</p>
  return (
    <div>
      {posts.map(p => <PostItem key={p.id} post={p} />)}
    </div>
  )
}
