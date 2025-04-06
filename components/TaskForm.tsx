'use client'

import { useState } from 'react'

export default function TaskForm({ onAdd }: { onAdd: (task: any) => void }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [status, setStatus] = useState('Pending')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if (!token) return

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description, dueDate, status }),
        })

        const newTask = await response.json()
        onAdd(newTask)
        setTitle('')
        setDescription('')
        setDueDate('')
        setStatus('Pending')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Create New Task</h2>

            <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                    className="w-full border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                    className="w-full border p-2 rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Due Date</label>
                <input
                    type="date"
                    className="w-full border p-2 rounded"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Status</label>
                <select
                    className="w-full border p-2 rounded"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Add Task
            </button>
        </form>
    )
}
