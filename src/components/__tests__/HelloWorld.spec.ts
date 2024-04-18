import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TaskApp from '@/components/TaskApp.vue'

describe('TaskApp', () => {
  it('renders properly', () => {
    const wrapper = mount(TaskApp, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
