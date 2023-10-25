import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LogoutButton  from "./components/LogoutButton"
import Notification from "./components/Notification"
import Login from "./components/Login"
import NewBlogForm from "./components/NewBlogForm"
import Togglable from "./components/Togglable"


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [isAdded, setIsAdded] = useState(null)
  const [notAdded, setNotAdded] = useState(null)
  const [notLogged, setNotlogged] = useState(null)
  const [display,setDisplay] = useState(false)


  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedArr = blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( sortedArr)
    }
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  function hideStatusMessage() {
    setIsAdded(null)
    setNotAdded(null)
    setNotlogged(null)
  }



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        "loggedInUser", JSON.stringify(user)
      )

      setUser(user)
      setUsername("")
      setPassword("")
    } catch (err) {
      setErrorMessage("Wrong credentials")
      setNotlogged(true)
      setTimeout(() => {
        setErrorMessage(null)
        hideStatusMessage()
      }, 5000)
    }
  }

  const handleNewBlog = (e) => {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }
    blogService.create(newBlog).then(
      (res) => {
        setBlogs(blogs.concat(res))
        setIsAdded(true)
        setDisplay(false)
        setTimeout(() => {
          setAuthor("")
          setTitle("")
          setUrl("")
          hideStatusMessage()
        }, 3500)

      }
    ).catch(err => {
      setNotAdded(true)
      setTimeout(() => {
        hideStatusMessage()
      },5000)
    }
    )
  }

  const updateBlog = async (blogId,blogToUpdate) => {
    try {
      const req = await blogService.update(blogId,{ ...blogToUpdate, likes: blogToUpdate.likes+1 })
      const updatedBlogsArr = blogs.map((blog) => {
        if (blog.id === blogId) {
          return { ...blog, likes: req.likes }
        } else {
          return blog
        }
      })
      setBlogs(updatedBlogsArr)

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div>
      {!user &&
      <div>
        <h2>log in to application</h2>
        { notLogged &&
           <Notification notLogged = {notLogged}></Notification>
        }
        <Login
          handleLogin={handleLogin}
          password={password}
          setPassword={setPassword}
          username={username}
          setUsername={setUsername}>
        </Login>
      </div>
      }

      {user &&
       <div>
         <h2>blogs</h2>
         { (isAdded || notAdded) &&
           <Notification isAdded={isAdded} notAdded={notAdded} title={title} author={author}></Notification>
         }
         <p style={{ display:"inline" }}> {user.name} logged in</p>
         <LogoutButton
           onClick={() => window.localStorage.clear()}
           setUser={setUser}>
         </LogoutButton>
         <h2>create new</h2>
         <Togglable
           display={display}
           setDisplay={setDisplay}>
           <NewBlogForm
             handleNewBlog={handleNewBlog}
             title={title}
             setTitle={setTitle}
             author={author}
             setAuthor={setAuthor}
             url={url}
             setUrl={setUrl}>
           </NewBlogForm>
         </Togglable>
         <div style={{ paddingTop:"5em" }}>
           {blogs.map(blog =>
             <Blog key={blog.id} blogId={blog.id} blog={blog} blogList={blogs} setBlogs={setBlogs} updateBlog={updateBlog}/>
           )}
         </div>
       </div>
      }
    </div>
  )
}

export default App