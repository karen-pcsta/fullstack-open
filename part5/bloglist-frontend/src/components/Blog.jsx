import { useState } from "react"
import blogService from "../services/blogs"


const Blog = ({ blogId,blog, blogList, updateBlog}) => {

  const { title,url,likes,author } = blog
  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes =  () => {
    const blogToUpdate= { title,url,likes,author }

    updateBlog(blogId,blogToUpdate)

  }

  const handleRemoval= async () => {

    if(window.confirm(`Remove ${title} by ${author}?`)){
      try {
        const req = await blogService.remove(blogId)
        const updatedBlogArr = blogList.filter((blog) => blog.id !== blogId)
        setBlogs(updatedBlogArr)

      } catch (error) {
        console.log(error)
      }
    }

  }


  function display() {
    setShow(prevState => !prevState)
  }

  return (
    <div style={blogStyle} className="blog-post">
      {title} - {author} <button style={{ display:"inline" }} onClick={display}>{ !show ? "view" : "hide"}</button>
      {show && <div className="togglableContent">
        {url}
        <br></br>
        {likes} <button style={{ display:"inline" }} onClick={handleLikes}>like</button>
        <br></br>
        <button style={{ display:"inline" }} onClick={handleRemoval}>remove</button>
      </div>}
    </div>
  )
}

export default Blog