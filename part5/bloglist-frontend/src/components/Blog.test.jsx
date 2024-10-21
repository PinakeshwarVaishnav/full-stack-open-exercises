import { render, screen } from "@testing-library/react";
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

  expect(screen.getByText('testing')).toBeInTheDocument()
  expect(screen.getByText('developer')).toBeInTheDocument()

  expect(screen.queryByText('localhost')).not.toBeInTheDocument()
  expect(screen.queryByText('432')).not.toBeInTheDocument()
})
