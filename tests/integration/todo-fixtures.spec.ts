import { test, expect } from '../../fixtures/todo-fixtures'

test.describe('Playwright Project', () => {

  test('Test Case 01 - Todo-App Modal Verification', async ({ todoPage }) => {

    await expect(todoPage.modalTitle).toBeVisible()
    await expect(todoPage.newToDoInput).toBeEnabled()
    await expect(todoPage.addButton).toBeEnabled()
    await expect(todoPage.searchFild).toBeEnabled()
    await expect(todoPage.taskListMessage).toBeVisible()

  })

  test('Test Case 02 - Single Task Addition and Removal', async ({ todoPage }) => {
    await todoPage.addTodo('My Item')
    await expect(todoPage.taskList).toContainText('My Item')
    await expect(todoPage.taskList).toHaveCount(1)
    await todoPage.markTaskAsCompleted('My Item')
    await expect(todoPage.taskItems).toHaveClass(/has-text-success/)
    await todoPage.remove('My Item')
  })

})

// test('should remove an item', async ({ todoPage }) => {
//   await todoPage.remove('item1')
  // test("Test Case 03 - Multiple Task Operations", async ({ todoPage }) => {

  //   })

  // test("Test Case 04 - Search and Filter Functionality in todo App", async ({ todoPage }) => {

  //   })

  // test("Test Case 05 - Task Validation and Error Handling", async ({ todoPage }) => {

  //   })

// })


