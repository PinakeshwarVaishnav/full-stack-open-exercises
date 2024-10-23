import PropTypes from "prop-types"

const BlogForm = ({ addBlog, newBlog, handleChange, }) => {
  return (
    <div>
      <h2>create new</h2>
      <form
        id="login-form"
        onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            id="title"
            type='text'
            value={newBlog.title}
            name='title'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author"> author:</label>
          <input
            id="author"
            type='text'
            value={newBlog.author}
            name='author'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="url"> url:</label>
          <input
            id="url"
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

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newBlog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default BlogForm
