const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')
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
    })

    test('a new blog can be created', async ({ page }) => {

      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.fill('input[id="title"]', 'Test title')
      await page.fill('input[id="author"]', 'Test author')
      await page.fill('input[id="url"]', 'Test url')

      await page.click('button[type="submit"]')

      await expect(page.getByText('a new blog Test title by Test author added')).toBeVisible()
    })
  })
})
