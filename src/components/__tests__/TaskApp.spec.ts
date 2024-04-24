import { describe, it, expect, beforeEach } from 'vitest'
import { type VueWrapper, shallowMount } from '@vue/test-utils'
import TasksApp from '../TasksApp.vue'

describe('TasksApp component test', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(TasksApp)
  })

  it('renders properly', () => {
    const topBar = wrapper.findComponent({ name: 'TopBar' })
    const taskList = wrapper.findComponent({ name: 'TaskList' })
    const taskEditor = wrapper.findComponent({ name: 'TaskEditor' })

    expect(topBar.exists()).toBe(true)
    expect(taskList.exists()).toBe(true)
    expect(taskEditor.exists()).toBe(true)
  })
})
