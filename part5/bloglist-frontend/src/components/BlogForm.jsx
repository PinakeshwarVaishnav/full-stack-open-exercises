const BlogForm = ({ addBlog, newBlog, handleChange, }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={newBlog.title}
            name='title'
            onChange={handleChange}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newBlog.author}
            name='author'
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={newBlog.url}
            name='url'
            onChange={handleChange}
          />
        </div>
        <button type='submit'>create</button>
      </form>

    </div>
  )
}

export default BlogForm
