const { test, after, beforeEach } = require('node:test')
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
  console.log('response body for id test', response.body)

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
  console.log('response body for valid blog test', response.body)
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
})

after(async () => {
  await mongoose.connection.close()
})
