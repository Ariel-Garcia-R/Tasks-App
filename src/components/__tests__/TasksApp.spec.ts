import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskApp from '@/components/TasksApp.vue'

describe('TaskApp', () => {
  it('renders TaskList and TaskEditor components', () => {
    const wrapper = mount(TaskApp)
    // Verifica que el componente TaskList esté presente en el DOM
    expect(wrapper.findComponent({ name: 'TaskList' }).exists()).toBe(true)
    // Verifica que el componente TaskEditor esté presente en el DOM
    expect(wrapper.findComponent({ name: 'TaskEditor' }).exists()).toBe(true)
  })
})
