import { test, expect } from '@playwright/test'


test.describe('Project 06 - Modal Verification', async () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend/project-6')
  })


  test('Test Case 01 - Todo-App Modal Verification', async ({ page }) => {
    const toDoModal = page.locator('.panel')
    const newToDoInput = page.locator('#input-add')
    const addButton = page.getByRole('button', { name: 'ADD' })
    const searchField = page.locator('#search')
    const noTaskMessage = page.locator('.todo-item > p')
    const taskList = page.locator('#panel > .todo-item')

    await test.step('Confirm that the todo-app modal is visible with the title “My Tasks.”', async () => {
      await expect(toDoModal).toBeVisible()
    })

    await test.step('Validate that the New todo input field is enabled for text entry.', async () => {
      await expect(newToDoInput).toBeEnabled()
    })

    await test.step('Validate ADD button is enabled.', async () => {
      await expect(addButton).toBeEnabled()
    })

    await test.step('Validate Search field is enabled.', async () => {
      await expect(searchField).toBeEnabled()
    })

    await test.step('Validate that the task list is empty, displaying the message “No tasks found!”', async () => {
      await expect(taskList).toBeHidden()
      await expect(noTaskMessage).toBeVisible()
    })
  })


  test('Test Case 02 - Single Task Addition and Removal', async ({ page }) => {
    const newTask = 'Hiking'
    const newToDoInput = page.locator('#input-add')
    const addButton = page.getByRole('button', { name: 'ADD' })
    const taskList = page.locator('#panel > .todo-item')
    const checkMarks = page.locator('[data-icon="circle-check"]')
    const markSuccess = page.locator('.has-text-success')
    const trash = page.locator('.destroy')
    // const removeCompleteButton = page.locator('#clear')
    const noTaskMessage = page.locator('.todo-item > p')



    await test.step('Enter a new task in the todo input field and add it to the list.', async () => {
      await newToDoInput.fill(newTask)
      await addButton.click()
    })

    await test.step('Validate that the new task appears in the task list.', async () => {
      await expect(taskList.first()).toHaveText(newTask)
    })

    await test.step('Validate that the number of tasks in the list is exactly one.', async () => {
      await expect(taskList).toHaveCount(1)
    })

    await test.step('Mark the task as completed by clicking on it.', async () => {
      await checkMarks.first().click()
    })

    await test.step('Validate item is marked as completed.', async () => {
      await expect(markSuccess).toHaveAttribute('class', 'panel-icon has-text-success')
    })

    await test.step('Click on the button to remove the item you have added.', async () => {
      await trash.first().click()
    })


    await test.step('Validate that the task list is empty, displaying the message “No tasks found!”', async () => {
      await expect(taskList).toBeHidden()
      await expect(noTaskMessage).toBeVisible()
    })
  })

  test('Test Case 03 - Multiple Task Operations', async ({ page }) => {
    const tasks: string[] = ['Walk', 'Eat', 'Read', 'Code', 'Sleep']
    const newToDoInput = page.locator('#input-add')
    const addButton = page.getByRole('button', { name: 'ADD' })
    const taskList = page.locator('#panel > .todo-item')
    const checkMarks = page.locator('[data-icon="circle-check"]')
    const removeCompleteButton = page.locator('#clear')
    const noTaskMessage = page.locator('.todo-item > p')


    await test.step('Enter and add 5 to-do items individually.', async () => {
      for (let i = 0; i < tasks.length; i++) {
        await newToDoInput.fill(tasks[i])
        await addButton.click()
      }
    })

    await test.step('Validate that all added items match the items displayed on the list.', async () => {
      for (let i = 0; i < tasks.length; i++) {
        await expect(taskList.nth(i)).toHaveText(tasks[i])
      }
    })

    await test.step('Mark all the tasks as completed by clicking on them.', async () => {
      for (let i = 0; i < tasks.length; i++) {
        await checkMarks.nth(i).click()
      }
    })

    await test.step('Click on the “Remove completed tasks!” button to clear them.', async () => {
      await removeCompleteButton.click()
    })

    await test.step('Validate that the task list is empty, displaying the message “No tasks found!”', async () => {
      await expect(taskList).toBeHidden()
      await expect(noTaskMessage).toBeVisible()
    })

  })


  test('Test Case 04 - Search and Filter Functionality in todo App', async ({ page }) => {
    const tasks: string[] = ['Walk', 'Eat', 'Read', 'Code', 'Sleep']
    const newToDoInput = page.locator('#input-add')
    const addButton = page.getByRole('button', { name: 'ADD' })
    const taskList = page.locator('#panel > .todo-item')
    const searchField = page.locator('#search')
    const filterResult = page.locator('#panel span').nth(1)


    await test.step('Enter and add 5 to-do items individually.', async () => {
      for (let i = 0; i < tasks.length; i++) {
        await newToDoInput.fill(tasks[i])
        await addButton.click()
      }
    })

    await test.step('Validate that all added items match the items displayed on the list.', async () => {
      for (let i = 0; i < tasks.length; i++) {
        await expect(taskList.nth(i)).toHaveText(tasks[i])
      }
    })

    await test.step('Enter the complete name of the previously added to-do item into the search bar.', async () => {
      const addedToDoItem = tasks[2]
      await searchField.fill(addedToDoItem)
    })

    await test.step('Validate that the list is now filtered to show only the item you searched for.', async () => {
      const addedToDoItem = tasks[2]
      await expect(filterResult).toHaveText(addedToDoItem)
    })

    await test.step('Validate that the number of tasks visible in the list is exactly one.', async () => {
      await expect(filterResult).toHaveCount(1)
    })
  })


  test('Test Case 05 - Task Validation and Error Handling', async ({ page }) => {
    const newToDoInput = page.locator('#input-add')
    const addButton = page.getByRole('button', { name: 'ADD' })
    const taskList = page.locator('#panel > .todo-item')
    const noTaskMessage = page.locator('.todo-item > p')
    const errorMessage = page.locator('.is-danger')


    await test.step('Attempt to add an empty task to the to-do list.', async () => {
      await newToDoInput.fill('')
      await addButton.click()
    })

    await test.step('Validate that the task list is empty, displaying the message “No task found!”.', async () => {
      await expect(noTaskMessage).toBeVisible()
    })

    await test.step('Enter an item name exceeding 30 characters into the list.', async () => {
      await newToDoInput.fill('qwedsazxcdewqasdcxzasdewqasdcxzasw')
      await addButton.click()
    })

    await test.step('Validate error message appears and says “Error: Todo cannot be more than 30 characters!”.', async () => {
      await expect(errorMessage).toHaveText('Error: Todo cannot be more than 30 characters!')
    })

    await test.step('Add a valid item name to the list.', async () => {
      await newToDoInput.fill('jump')
      await addButton.click()
    })

    await test.step('Validate that the active task count is exactly one.', async () => {
      await expect(taskList).toHaveCount(1)
    })

    await test.step('Try to enter an item with the same name already present on the list.', async () => {
      await newToDoInput.fill('jump')
      await addButton.click()
    })

    await test.step('Validate that an error message is displayed, indicating “Error: You already have {ITEM} in your todo list.”.', async () => {
      await expect(errorMessage).toHaveText('Error: You already have jump in your todo list.')
    })
  })

})