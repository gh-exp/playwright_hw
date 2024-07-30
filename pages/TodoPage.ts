import { type Locator, type Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class TodoPage extends BasePage {
  readonly inputBox: Locator
  readonly todoItems: Locator
  readonly modalTitle: Locator
  readonly newToDoInput: Locator
  readonly searchFild: Locator
  readonly taskListMessage: Locator
  readonly addButton: Locator
  readonly taskList: Locator
  readonly taskItems: Locator
  readonly removeComplited: Locator

  constructor(page: Page) {
    super(page)
    this.inputBox = page.locator('#input-add')
    this.todoItems = page.locator('.todo-item:not(.has-text-danger)')
    this.modalTitle = page.locator('text="My Tasks"')
    this.newToDoInput = page.locator('input[placeholder="New todo"]')
    this.searchFild = page.locator('input[placeholder="Type to search"]')
    this.taskListMessage = page.locator('text="No tasks found!"')
    this.addButton = page.locator('button:has-text("ADD")')
    this.taskList = page.locator('.todo-item')
    this.taskItems = page.locator('.mr-auto>li')
    this.removeComplited = page.locator('#clear')
    

  }


  async goto() {
    await this.page.goto('https://www.techglobal-training.com/frontend/project-6')
  }

  async addTodo(text: string) {
    await this.inputBox.fill(text)
    await this.inputBox.press('Enter')
  }

  async markTaskAsCompleted(task: string) {
    await this.taskList.locator(`text=${task}`).click()
  }

  async removeCompletedTask() {
    await this.removeComplited.click()
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text })
    await todo.hover()

    await todo.locator('.destroy').click()
  }

  async removeAll() {

    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover()
      await this.todoItems.locator('.destroy').first().click()
    }
  }

  async findtask(text: string) {
    await this.searchFild.fill(text)
    await this.inputBox.press('Enter')
  }
}