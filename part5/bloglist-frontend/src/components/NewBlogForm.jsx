import PropTypes from "prop-types"
import { useState } from "react"

const newBlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleOnSubmit = (e) => {
    e.preventDefault()
    handleNewBlog({
       title,
       author,
       url,
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

return (
  <form onSubmit={handleOnSubmit}>
    <div>
        title:
      <input
        type='text'
        value={title}
        name='title'
        onChange={({ target }) => setTitle(target.value)}
        id='title-input'
      />
    </div>
    <div>
        author:
      <input
        type='text'
        value={author}
        name='author'
        onChange={({ target }) => setAuthor(target.value)}
        id='author-input'
      />
    </div>
    <div>
        url:
      <input
        type='text'
        value={url}
        name='url'
        onChange={({ target }) => setUrl(target.value)}
        id='url-input'
      />
    </div>
    <button id="submitBtn" type='submit'>Create</button>
  </form>

)}

newBlogForm.propTypes = {
  handleNewBlog:PropTypes.func.isRequired}

export default (newBlogForm)