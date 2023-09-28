import PropTypes from "prop-types"

const newBlogForm = ({ handleNewBlog,title,setTitle,author,setAuthor,url,setUrl }) => (
  <form onSubmit={handleNewBlog}>
    <div>
        title:
      <input
        type='text'
        value={title}
        name='title'
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
        author:
      <input
        type='text'
        value={author}
        name='author'
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
        url:
      <input
        type='text'
        value={url}
        name='author'
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type='submit'>Create</button>
  </form>
)

newBlogForm.propTypes = {
  handleNewBlog:PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle:PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  setAuthor:PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setUrl :PropTypes.func.isRequired
}

export default (newBlogForm)