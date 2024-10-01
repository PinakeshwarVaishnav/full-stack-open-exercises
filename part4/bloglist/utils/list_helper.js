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
  return _.maxBy(blogs, 'blogs')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs
}
