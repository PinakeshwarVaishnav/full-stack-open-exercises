const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Understanding Asynchronous JavaScript",
    author: "Jane Doe",
    url: "https://example.com/understanding-asynchronous-javascript",
    likes: 45,
  },
  {
    title: "A Guide to Node.js Performance",
    author: "John Smith",
    url: "https://example.com/nodejs-performance",
    likes: 32,
  },
  {
    title: "React vs. Vue: Which One to Choose?",
    author: "Alice Johnson",
    url: "https://example.com/react-vs-vue",
    likes: 58,
  },
  {
    title: "CSS Grid: A Comprehensive Guide",
    author: "Michael Brown",
    url: "https://example.com/css-grid-guide",
    likes: 29,
  },
  {
    title: "The Future of Web Development",
    author: "Emily Davis",
    url: "https://example.com/future-of-web-development",
    likes: 75,
  },
  {
    title: "Debugging Node.js Applications",
    author: "Chris Wilson",
    url: "https://example.com/debugging-nodejs",
    likes: 10,
  },
  {
    title: "Mastering JavaScript Promises",
    author: "Jessica Lee",
    url: "https://example.com/mastering-promises",
    likes: 63,
  },
  {
    title: "Getting Started with TypeScript",
    author: "Daniel Kim",
    url: "https://example.com/getting-started-typescript",
    likes: 41,
  },
  {
    title: "Introduction to RESTful APIs",
    author: "Laura Taylor",
    url: "https://example.com/introduction-restful-apis",
    likes: 27,
  },
  {
    title: "Understanding Redux in React",
    author: "David Garcia",
    url: "https://example.com/understanding-redux",
    likes: 36,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}
