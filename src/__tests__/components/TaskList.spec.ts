import { VueWrapper, shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import TaskList from '@/components/TaskList.vue'
import { setActivePinia, createPinia } from 'pinia'

describe('TaskList component test', () => {
  let wrapper: VueWrapper<typeof TaskList>
  let updateSelectedTasksSpy: ReturnType<typeof vi.spyOn>
  beforeEach(() => {
    const $t = (key: string) => key
    setActivePinia(createPinia()) // Pinia's global configuration

    // FIXME: Find the right types for this test

    // @ts-ignore
    wrapper = shallowMount<typeof TaskList>(TaskList, {
      global: {
        mocks: {
          $t
        }
      }
    })
    updateSelectedTasksSpy = vi.spyOn(wrapper.vm, 'updateSelectedTasks')
  })

  it('should render a TaskItems component', () => {
    const taskItemComponents = wrapper.findAllComponents({ name: 'TaskItem' })
    expect(taskItemComponents.length).toBeGreaterThan(0)
  })
  ;['all', 'pending', 'done'].forEach((filter) => {
    it(`should call updateSelectedTasks() when clicked ${filter} button`, async () => {
      const buttonSelector = `[data-testid=show-${filter}-task-button]`
      const button = wrapper.find(buttonSelector)
      await button.trigger('click')
      expect(updateSelectedTasksSpy).toHaveBeenCalledTimes(1)
      expect(updateSelectedTasksSpy).toHaveBeenCalledWith(filter)
    })
  })
})
