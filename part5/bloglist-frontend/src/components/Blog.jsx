import { useState } from "react"

const Blog = ({ blog }) => {

const [show, setShow] = useState(false)

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

function display() {
  setShow(prevState => !prevState)
}


  return (
    <div style={blogStyle}>
      {blog.title} <button style={{display:"inline"}} onClick={display}>{ !show ? "view" : "hide"}</button>
      {show && <div>
        {blog.url}
        <br></br>
        {blog.likes} <button style={{display:"inline"}} onClick={() => console.log("hi")}>like</button>
        <br></br>
        {blog.author}
      </div>}      
    </div>  
  )
}

export default Blog