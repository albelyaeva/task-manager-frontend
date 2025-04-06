'use client'

import { useState } from 'react'

type TaskItemProps = {
    task: {
        id: number
        title: string
        description?: string
        dueDate?: string
        status?: string
    }
    onDelete: (id: number) => void
    onUpdate: (id: number, updatedTask: any) => void
}

export default function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTask, setEditedTask] = useState({ ...task })

    const handleChange = (field: string, value: string) => {
        setEditedTask({ ...editedTask, [field]: value })
    }

    const handleSave = () => {
        onUpdate(task.id, editedTask)
        setIsEditing(false)
    }

    return (
        <li className="border p-4 rounded shadow-sm mb-4">
            {isEditing ? (
                <div className="space-y-2">
                    <input
                        className="w-full border px-2 py-1 rounded"
                        value={editedTask.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                    />
                    <textarea
                        className="w-full border px-2 py-1 rounded"
                        value={editedTask.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                    <input
                        type="date"
                        className="w-full border px-2 py-1 rounded"
                        value={
                            editedTask.dueDate
                                ? new Date(editedTask.dueDate).toISOString().split('T')[0]
                                : ''
                        }
                        onChange={(e) =>
                            handleChange('dueDate', new Date(e.target.value).toISOString())
                        }
                    />
                    <select
                        className="w-full border px-2 py-1 rounded"
                        value={editedTask.status || 'Pending'}
                        onChange={(e) => handleChange('status', e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="text-green-600 hover:underline"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-gray-500 hover:underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="font-semibold">{task.title}</h2>
                    {task.description && <p>{task.description}</p>}
                    {task.dueDate && (
                        <p className="text-sm text-gray-500">
                            Due:{' '}
                            {new Date(task.dueDate).toLocaleString(undefined, {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZoneName: 'short',
                            })}
                        </p>
                    )}
                    {task.status && (
                        <p className="text-sm text-gray-700">Status: {task.status}</p>
                    )}

                    <div className="flex gap-3 mt-2">
                        <button
                            onClick={() => {
                                setIsEditing(true)
                                setEditedTask(task)
                            }}
                            className="text-blue-600 hover:underline"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </li>
    )
}