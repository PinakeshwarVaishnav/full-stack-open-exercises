const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const { request } = require('http')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173')
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'PGN',
        username: 'PGN',
        password: '123'
      }
    })

    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    const loginForm = await page.locator('form')
    await expect(loginForm).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'PGN', '123')

      await expect(page.getByText('PGN logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'PGN', 'WRONG')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password')
      await expect(page.getByText('PGN logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'PGN', '123')
      await createBlog(page)
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText('a new blog Test title by Test author added')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      const blogText = 'Test title'

      const viewButton = await page.locator(`h3.blog-title:has-text("${blogText}") >> .. >> button.view-button`)
      await viewButton.click()

      const likeButton = await page.locator(`h3.blog-title:has-text("${blogText}") >> .. >> button.like-button`)
      await expect(likeButton).toBeVisible()
      await expect(likeButton).toBeEnabled()
      await likeButton.click()

      const htmlContent = await page.content()
      console.log(htmlContent)
      const likedStatus = await page.locator(`h3.blog-title:has-text("${blogText}") >> .. >> p.blog-likes`)
      await expect(likedStatus).toHaveText('1')
      await expect(likedStatus).toHaveText('1')
    })

    test('blog can be deleted', async ({ page }) => {
      const blogText = 'Test title'

      const viewButton = await page.locator(`h3.blog-title:has-text("${blogText}") >> .. >> button.view-button`)
      await viewButton.click()
      const htmlContent = await page.content()
      console.log(htmlContent)

      const deleteButton = await page.getByRole('button', { name: 'remove' })

      page.on('dialog', async dialog => {
        console.log(dialog.message())
        await dialog.accept()
      })
      await deleteButton.click()
      await expect(page.locator(`h3.blog-title:has-text("${blogText}")`)).not.toBeVisible()
    })
    test('dummy text to create a entry for checking if the other user cannot see the remove button', async () => {

    })
  })
})

test('only the user who added the blog sees the blog delete button', async ({ page, request }) => {
  await page.goto('http://localhost:5173')
  await request.post('/api/users', {
    data: {
      name: 'pgn',
      username: 'pgn',
      password: '123'
    }
  })
  await loginWith(page, 'pgn', '123')
  await expect(page.getByText('pgn logged in')).toBeVisible()

  const blogText = 'Test title'
  const viewButton = await page.locator(`h3.blog-title:has-text("${blogText}") >> .. >> button.view-button`)
  await viewButton.click()
  const htmlContent = await page.content()
  console.log(htmlContent)

  const deleteButton = await page.getByRole('button', { name: 'remove' })
  await expect(deleteButton).not.toBeVisible()
})
