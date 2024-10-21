import { expect } from 'vitest'
import BlogForm from './BlogForm'
import { render, screen, fireEvent } from '@testing-library/react'

test('calls addBlog with the right details when a new blog is created', () => {
  const addBlogMock = vi.fn()

  render(<BlogForm addBlog={addBlogMock} />)

  fireEvent.click(screen.getByRole('button', { name: ' create new blog' }))

  fireEvent.change(screen.getByPlaceholderText('title'), {
    target: { value: 'test' }
  })
  fireEvent.change(screen.getByPlaceholderText('author'), {
    target: { value: 'test' }
  })
  fireEvent.change(screen.getByPlaceholderText('url'), {
    target: { value: 'test' }
  })

  fireEvent.click(screen.getByRole('button', { name: 'create' }))

  expect(addBlogMock).toHaveBeenCalledWith({
    title: 'test',
    author: 'test',
    url: 'test'
  })
  expect(addBlogMock).toHaveBeenCalledTimes(1)
})
