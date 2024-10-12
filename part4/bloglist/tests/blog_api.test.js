const { test, after, describe, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

let token
let newUser

describe('user registration and token retrieval', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    newUser = {
      username: 'author',
      password: '1234556',
      name: 'same as username'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    console.log('response for creation of a new user', response.body)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })


  test('token retrieval succeeds', async () => {
    try {
      const response = await api
        .post('/api/login')
        .send(newUser)
      console.log('Full response for token retrieval', response.body)
      token = response.body.token
      console.log('Login successful, token: ', token)
    } catch (error) {
      console.error('Error logging in:', error.response.data)
    }
  })
})

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
  try {
    const response = await api.get('/api/blogs')
    assert.ok(response.body[0].id)
  } catch (error) {
    console.error('Error during api call', error)
  }
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
    .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
    .expect(400)
  console.log('status code for test of title or url properties missing is', response.statusCode)
})

test('updating information of an individual blog post', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
  const blogs = response.body

  const blogToUpdate = blogs.find(blog => blog.title === "Understanding Asynchronous JavaScript")
  console.log('found blog to be updated', blogToUpdate)


  const updatedData = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 5,
  }

  const updateResponse = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)

  const updatedBlog = updateResponse.body

  assert.strictEqual(updatedData.likes, updatedBlog.likes)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })


  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

describe('invalid user is not created', () => {
  test('fails if username or password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert.strictEqual(result.statusCode, 400)
  })
})

test('blog creation fails if token is not provided', async () => {
  const newBlog = {
    title: 'the test database post request works',
    author: 'me',
    url: '-',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

after(async () => {
  console.log('Closing the mongoose connection')
  await mongoose.connection.close()
  console.log('mongoose connection closed')
})

