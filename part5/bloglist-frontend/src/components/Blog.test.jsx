import { fireEvent, render, screen } from "@testing-library/react";
import Blog from './Blog'
import { expect } from "vitest";

test('renders blog title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'testing',
    author: 'developer',
    url: 'localhost',
    likes: 432,
  }

  render(< Blog blog={blog} />)

  screen.debug()

  expect(screen.getByText('testing')).toBeInTheDocument()
  expect(screen.getByText('developer')).toBeInTheDocument()

  expect(screen.queryByText('localhost')).not.toBeInTheDocument()
  expect(screen.queryByText('432')).not.toBeInTheDocument()
})

test('renders blog url and likes when the button view is clicked', () => {
  const blog = {
    title: 'testing',
    author: 'developer',
    url: 'localhost',
    likes: 432,
  }

  render(< Blog blog={blog} />)


  const button = screen.getByRole('button', { name: 'view' })
  fireEvent.click(button)

  expect(screen.queryByText('localhost')).toBeInTheDocument()
  expect(screen.queryByText('432')).toBeInTheDocument()

})

test('calls handleLikeChange twice when the like button is clicked twice', () => {
  const handleLikeChangeMock = vi.fn()

  const blog = {
    title: 'testing',
    author: 'developer',
    url: 'localhost',
    likes: 432,
  }

  render(<Blog blog={blog} handleLikeChange={handleLikeChangeMock} />)

  const button = screen.getByRole('button', { name: 'view' })
  fireEvent.click(button)

  const likeButton = screen.getByRole('button', { name: 'like' })
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(handleLikeChangeMock).toHaveBeenCalledTimes(2)
})
