import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

const LS_KEY = 'rf_users'
const LS_SESSION = 'rf_session'

function loadUsers(){
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || []
  } catch { return [] }
}

export function AuthProvider({ children }){
  const [users, setUsers] = useState(loadUsers)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_SESSION)) } catch { return null }
  })

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem(LS_SESSION, JSON.stringify(user))
  }, [user])

  const register = ({ username, password, isAdmin=false }) => {
    if(users.find(u => u.username === username)) return { ok:false, message: 'Użytkownik już istnieje' }
    const newUser = { id: Date.now(), username, password, isAdmin }
    setUsers(prev => [...prev, newUser])
    setUser({ id: newUser.id, username: newUser.username, isAdmin: newUser.isAdmin })
    return { ok:true }
  }

  const login = ({ username, password }) => {
    const found = users.find(u => u.username === username && u.password === password)
    if(!found) return { ok:false, message: 'Błędne dane' }
    setUser({ id: found.id, username: found.username, isAdmin: !!found.isAdmin })
    return { ok:true }
  }

  const logout = () => setUser(null)

  // create a default admin if none exists
  useEffect(() => {
    if(!users.find(u=>u.username==='admin')){
      setUsers(prev => [...prev, { id: 1, username:'admin', password:'admin', isAdmin:true }])
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, users, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
