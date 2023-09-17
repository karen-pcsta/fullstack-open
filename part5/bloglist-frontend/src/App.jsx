import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LogoutButton  from './components/LogoutButton'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [isAdded, setIsAdded] = useState(null)
  const [notAdded, setNotAdded] = useState(null)
  const [notLogged, setNotlogged] = useState(null)


  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('') 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  function hideStatusMessage() {
    setIsAdded(null);
    setNotAdded(null)
    setNotlogged(null);
}

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setErrorMessage('Wrong credentials')
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
          setTimeout(() => {
          setAuthor("")
          setTitle("")
          setUrl("")
          hideStatusMessage()
          }, 5000)

        }
    ).catch(err => {
        setNotAdded(true)
        setTimeout(() => {
          hideStatusMessage()
        },5000) 
      }
      )
    }  
  
   
  const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
              username: 
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password: 
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>   
  )

  const newBlogForm = () => (
    <form onSubmit={handleNewBlog}>
      <div>
        title:
        <input
          type='text'
          value={title}
          name='title'
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='author'
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          name='author'
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>  
    </form>
  )

  

 return (
  <div>
    {!user &&
      <div>
        <h2>log in to application</h2>
        { notLogged &&
           <Notification notLogged = {notLogged}></Notification> 
         }
        {loginForm()}
      </div> 
    }

    {user && 
       <div>
         <h2>blogs</h2>
         { (isAdded || notAdded) &&
           <Notification isAdded={isAdded} notAdded={notAdded} title={title} author={author}></Notification> 
         }
         <p style={{display:'inline'}}> {user.name} logged in</p>
         <LogoutButton onClick={() => window.localStorage.clear()} setUser={setUser}></LogoutButton>
         <h2>create new</h2>
         {newBlogForm()}
         <div style={{paddingTop:"2em"}}>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog}/>
             )}
          </div>       
       </div>
   }
  </div>
  )
  }

export default App