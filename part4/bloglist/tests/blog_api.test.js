const { test, after, describe, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)

beforeEach(async () => {
  console.log('Deleting existing blogs')
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog posts contain id property', async () => {
  const response = await api.get('/api/blogs')

  assert.ok(response.body[0].id)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'the test database post request works',
    author: 'me',
    url: '-',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
})

describe('deletion of a blog', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})

test('likes property default value 0 is added in the missing blog', async () => {
  const newBlog = {
    title: 'the test database post request works',
    author: 'me',
    url: '-',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('status code 400 bad request if title or url properties are missing', async () => {
  const newBlog = {
    author: 'me',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  console.log('status code for test of title or url properties missing is', response.statusCode)
})

after(async () => {
  await mongoose.connection.close()
})
