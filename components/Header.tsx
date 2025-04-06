'use client'

import { useRouter } from 'next/navigation'

export default function Header() {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return (
        <header className="w-full px-6 py-4 bg-gray-900 shadow flex justify-between items-center mb-8 text-white">
            <h1 className="text-xl font-semibold">Task Manager</h1>
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
                Logout
            </button>
        </header>
    )
}
