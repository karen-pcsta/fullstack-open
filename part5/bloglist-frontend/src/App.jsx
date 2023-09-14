import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LogoutButton  from './components/LogoutButton'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')


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
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

 return (
  <div>
    {user === null ?
      <div>
        <h2>log in to application</h2>
        {loginForm()}
      </div> :
            <div>
              <h2>blogs</h2>
                {user && <p  style={{display:'inline'}}> {user.name} logged in</p>}
                {user && <LogoutButton onClick={() => window.localStorage.clear()} setUser={setUser}></LogoutButton>}
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