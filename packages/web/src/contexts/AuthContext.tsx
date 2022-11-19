import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { IUser } from '../interfaces/User.dt'
import api from '../services/Api'

export interface AuthContextData {
  signed: boolean
  login: (email: string, password: string, type: 'company' | 'candidate') => Promise<void>
  logout: () => Promise<void>
  user?: IUser
  token?: string
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [user, setUser] = useState<IUser>()
  const [token, setToken] = useState<string>()

  const handleLogin = useCallback(
    (data: { user: IUser; token: string}) => {
      localStorage.setItem('auth:user', data.token)
      localStorage.setItem('auth:token', JSON.stringify(data.user))

      setUser(data.user)
      setToken(data.token)
    },
    [setUser, setToken],
  )

  const handleRehydrateUserData = useCallback(() => {
    const storedUser = localStorage.getItem('auth:user')
    const storedToken = localStorage.getItem('auth:token')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }

  }, [setUser, setToken])
  

  const login = useCallback(async (email: string, password: string, role: 'company' | 'candidate') => {
    const { data } = await api.post('/sessions', { email, password })

    handleLogin(data)
  }, [])

  const logout = useCallback(async () => {
    localStorage.removeItem('auth:user')
    localStorage.removeItem('auth:token')

    setUser(undefined)
    setToken(undefined)
  }, [setUser, setToken])


  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('auth:user')
      if (!storedUser) {
        logout()
      }
    }
  }, [user, logout])

  useEffect(() => {
    handleRehydrateUserData()
  }, [handleRehydrateUserData])

  useEffect(() => {
    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`
    }
  }, [token])

  const signed = useMemo(() => !!user, [user])

  return (
    <AuthContext.Provider value={{ signed, login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}