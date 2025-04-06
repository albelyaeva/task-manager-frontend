'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import TaskForm from '@/components/TaskForm'
import TaskItem from '@/components/TaskItem'
import Header from '@/components/Header'

type TaskItem = {
    id: number
    title: string
    description?: string
    status?: string
    dueDate?: string
}

export default function TasksPage() {
    const router = useRouter()
    const [tasks, setTasks] = useState<TaskItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [_, setEditingTaskId] = useState<number | null>(null)


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
            return
        }

        const fetchTasks = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                setTasks(response.data)
            } catch (err) {
                setError('Failed to load tasks')
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [router])

    const handleAddTask = (newTask: TaskItem) => {
        setTasks((prev) => [...prev, newTask])
    }

    const handleDeleteTask = async (id: number) => {
        const token = localStorage.getItem('token')
        if (!token) return

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setTasks((prev) => prev.filter((task) => task.id !== id))
        } catch (err) {
            console.error('Failed to delete task', err)
            setError('Failed to delete task')
        }
    }

    const handleSaveEdit = async (id: number, editedTask: TaskItem) => {
        const token = localStorage.getItem('token')
        if (!token) return

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`,
                editedTask,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setTasks((prev) =>
                prev.map((task) =>
                    task.id === id ? { ...task, ...response.data } : task
                )
            )
            setEditingTaskId(null)
        } catch (err) {
            console.error('Failed to update task', err)
            setError('Failed to update task')
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-20 p-6">
            <Header />
            <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
            {loading && <p>Loading tasks...</p>}
            {error && <p className="text-red-600">{error}</p>}

            <TaskForm onAdd={handleAddTask} />

            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={handleDeleteTask}
                    onUpdate={handleSaveEdit}
                />
            ))}
        </div>
    )
}
