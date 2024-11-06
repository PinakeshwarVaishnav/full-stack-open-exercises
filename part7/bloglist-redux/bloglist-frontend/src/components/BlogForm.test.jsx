import { expect } from 'vitest'
import BlogForm from './BlogForm'
import { render, screen, fireEvent } from '@testing-library/react'

test('calls addBlog with the right details when a new blog is created', () => {
  const addBlogMock = vi.fn()
  let newBlogMock = {
    title: "",
    author: "",
    url: ""
  }
  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    newBlogMock = {
      ...newBlogMock,
      [name]: value
    }
    console.log('new blog being created is', newBlogMock)
  }

  render(<BlogForm addBlog={addBlogMock} newBlog={newBlogMock} handleChange={handleChange} />)


  fireEvent.change(screen.getByRole('textbox', { name: 'title:' }), {
    target: { value: 'test' }
  })
  fireEvent.change(screen.getByRole('textbox', { name: 'author:' }), {
    target: { value: 'test' }
  })
  fireEvent.change(screen.getByRole('textbox', { name: 'url:' }), {
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
