import type { Task } from '@/types/taskInterface'

const fakeTasks = [
  {
    id: '78823086',
    title: 'Instructions',
    body: 'This is a task, you can use the "#" and "@" characters at the beginning of any word in order to #highlight it!',
    formattedBody:
      '<p class="items-center hover:text-opacity-15">This is a task, you can use the "#" and "@" characters at the beginning of any word in order to <span class="no-wrap pill hashtag-pill">#highlight</span> it!</p>',
    isCompleted: false
  },
  {
    id: '69376457',
    title: 'Mentions',
    body: "I bet you can't stop using @mentions anymore ",
    formattedBody:
      '<p class="items-center hover:text-opacity-15">I bet you can\'t stop using <span class="no-wrap pill contact-pill">@mentions</span> anymore </p>',
    isCompleted: false
  },
  {
    id: '51293080',
    title: 'Note',
    body: 'You can highlight words only in the body of the task, not in the title',
    formattedBody:
      '<p class="items-center hover:text-opacity-15">You can highlight words only in the body of the task, not in the title</p>',
    isCompleted: false
  },
  {
    id: '76735616',
    title: 'What are you waiting for?',
    body: 'Send that email to the developer who made this and start creating wonderful things together!!!',
    formattedBody:
      '<p class="items-center hover:text-opacity-15">Send that email to the developer who made this and start creating wonderful things together!!!</p>',
    isCompleted: false
  }
]

export const useStoredTasks = () => {
  const getTasksFromStorage = () => {
    const localStorageTasks = localStorage.getItem('tasks')
    if (localStorageTasks) return JSON.parse(localStorageTasks)
    return fakeTasks
  }

  const saveTasksToStorage = (tasks: Task[]) => {
    const parsedTasks = JSON.stringify(tasks)
    localStorage.setItem('tasks', parsedTasks)
  }

  return { getTasksFromStorage, saveTasksToStorage }
}
