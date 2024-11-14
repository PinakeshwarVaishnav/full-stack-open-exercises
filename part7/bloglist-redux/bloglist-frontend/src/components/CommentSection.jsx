import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

const CommentSection = ({ blogId }) => {
  const baseUrl = `/api/blogs/${blogId}/comments`
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    const response = await axios.get(baseUrl)
    console.log('fetched comments are', response.data)
    setComments(response.data)
  }

  const handleChange = (e) => { setCommentText(e.target.value) }


  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!commentText)
      return

    try {
      console.log('new comment text is', commentText)
      const response = await axios.post(baseUrl, { text: commentText })
      const newComment = response.data
      console.log('comment added', newComment)
      setComments((prevComments) => [...prevComments, newComment])
      setCommentText('')
    }
    catch (error) {
      console.log('error adding new comment', error)
    }
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input value={commentText} onChange={handleChange} placeholder="leave a comment..." />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default CommentSection
