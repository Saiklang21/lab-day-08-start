"use client"
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { addTask } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
    >
      {pending ? "กำลังเพิ่ม..." : "เพิ่ม"}
    </button>
  )
}

export default function AddTaskForm() {
  const [state, formAction] = useActionState(addTask, { error: null })

  return (
    <form action={formAction} className="mb-4">
      <div className="flex gap-2">
        <input name="title" placeholder="งานใหม่..." className="border p-2 flex-1 rounded" />
        <SubmitButton />
      </div>
      {state?.error && <p className="text-red-600 text-sm mt-2">{state.error}</p>}
    </form>
  )
}