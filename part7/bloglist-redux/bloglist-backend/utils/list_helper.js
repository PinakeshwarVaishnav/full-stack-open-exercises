const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlogs = (blogs) => {
  return blogs.reduce((topLikedBlog, blog) => blog.likes > topLikedBlog.likes ? blog : topLikedBlog)
}

const mostBlogs = (blogs) => {
  const topAuthor = _.maxBy(blogs, 'blogs')
  const result = _.pick(topAuthor, ['author', 'blogs'])
  return result
}

const mostLikes = (blogs) => {
  const topAuthor = _.maxBy(blogs, 'likes')
  const result = _.pick(topAuthor, ['author', 'likes'])
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes
}
