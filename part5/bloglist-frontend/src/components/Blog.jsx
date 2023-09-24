import { useState } from "react"
import blogService from "../services/blogs"


const Blog = ({ blogId,blog, blogList, setBlogs}) => {

const {title,url,likes,author} = blog
const [show, setShow] = useState(false)

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

async function handleLikes(id) {
 const blogToUpdate = {title,url,likes,author}

 try {
    const req = await blogService.update(id,{ ...blogToUpdate, likes: likes+1 })
    const updatedBlogsArr = blogList.map((blog) => {
      if (blog.id === id) {
        return { ...blog, likes: req.likes };
      } else {
        return blog;
      }
    })
    setBlogs(updatedBlogsArr)
   
 } catch (error) {
     console.log(error)
 }

}


function display() {
  setShow(prevState => !prevState)
}

  return (
    <div style={blogStyle}>
      {title} <button style={{display:"inline"}} onClick={display}>{ !show ? "view" : "hide"}</button>
      {show && <div>
        {url}
        <br></br>
        {likes} <button style={{display:"inline"}} onClick={() => handleLikes(blogId)}>like</button>
        <br></br>
        {author}
      </div>}      
    </div>  
  )
}

export default Blog