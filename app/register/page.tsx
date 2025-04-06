'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
                email,
                password,
            })

            setSuccess('Registration successful! Redirecting to login...')
            setTimeout(() => router.push('/login'), 2000)
        } catch (err: any) {
            const message = err.response?.data || 'Registration failed.'
            setError(typeof message === 'string' ? message : JSON.stringify(message))
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-2xl font-semibold mb-4">Register</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    className="w-full border px-4 py-2 rounded"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="w-full border px-4 py-2 rounded"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    Register
                </button>

                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}
            </form>
        </div>
    )
}
