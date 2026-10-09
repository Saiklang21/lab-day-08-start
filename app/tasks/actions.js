"use server"

import { revalidatePath } from 'next/cache'
import { addTaskToStore, removeTaskFromStore, toggleTaskDone } from '@/lib/taskStore'


// ✓ ของเช้า (บล็อก 1.2) — ยังไม่ validate จริง: ชื่อว่าง/สั้นเกิน = return เงียบ ๆ ไม่บอกผู้ใช้
// TODO Lab A ขั้น 4: เปลี่ยนเป็น addTask(prevState, formData) แล้ว return { error } ให้ useActionState
export async function addTask(prevState, formData) {
  const title = formData.get('title')

  if (!title || title.trim().length < 2) {
    return { error: 'ชื่องานต้องมีอย่างน้อย 2 ตัวอักษร' }
  }

  addTaskToStore({ id: Date.now(), title: title.trim(), done: false })
  revalidatePath('/tasks')
  return { error: null }
}

// TODO Lab A ขั้น 2: removeTask(formData) — อ่าน id จาก <input type="hidden" name="id">

export async function removeTask(formData) {
  const id = Number(formData.get('id'))
  removeTaskFromStore(id)
  revalidatePath('/tasks')
}
// TODO Lab A ขั้น 2: toggleTask(formData) — ★ ของใหม่ ไม่ได้สาธิตตอนเช้า
export async function toggleTask(formData) {
  const id = Number(formData.get('id'))
  toggleTaskDone(id)
  revalidatePath('/tasks')
}