const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const authenticateToken = require('../utils/middleware').authenticateToken

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', authenticateToken, async (request, response, next) => {
  const body = request.body
  console.log('user details of the new created blog is', request.user)
  const blog = new Blog({
    ...body,
    user: request.user
  })

  try {
    await blog.save()
  }
  catch (error) {
    next(error)
  }
  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', authenticateToken, async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', authenticateToken, (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: request.user
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
