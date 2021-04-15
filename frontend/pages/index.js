import { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'

export default function Home() {

  const context = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  const router = useRouter()

  const logout = () => {
    context.logout()
  }

  const login = () => {
    router.push('/login')
  }

  return (
    <div>
      {user ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}
    </div>
  )
}

