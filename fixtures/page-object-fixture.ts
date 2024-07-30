import { test as base } from '@playwright/test'
import { BasePage } from '../pages/BasePage'
import { TodoPage } from '../pages/TodoPage'

type MyFixtures = {
  basePage: BasePage
  todoPage: TodoPage
}

export const test = base.extend<MyFixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page)
    await use(basePage)
  },

  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page)
    await use(todoPage)
  },
})

export { expect } from '@playwright/test'