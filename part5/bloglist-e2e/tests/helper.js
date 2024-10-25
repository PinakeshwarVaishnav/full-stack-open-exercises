const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page) => {

  await page.getByRole('button', { name: 'create new blog' }).click()

  await page.fill('input[id="title"]', 'Test title')
  await page.fill('input[id="author"]', 'Test author')
  await page.fill('input[id="url"]', 'Test url')

  await page.click('button[type="submit"]')
}

export { loginWith, createBlog }
