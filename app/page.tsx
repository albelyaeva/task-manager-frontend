'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  return (
      <div className="max-w-lg mx-auto mt-20 text-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome to Task Manager</h1>
        <p className="text-gray-600">Manage your tasks with a secure login</p>

        {isLoggedIn ? (
            <>
              <button
                  onClick={() => router.push('/tasks')}
                  className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Go to My Tasks
              </button>
            </>
        ) : (
            <div className="space-x-4">
              <button
                  onClick={() => router.push('/login')}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Login
              </button>
              <button
                  onClick={() => router.push('/register')}
                  className="bg-gray-700 text-white px-4 py-2 rounded"
              >
                Register
              </button>
            </div>
        )}
      </div>
  )
}
