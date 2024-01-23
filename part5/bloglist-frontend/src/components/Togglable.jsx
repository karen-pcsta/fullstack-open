
const Togglable = ({ children, display, setDisplay }) => {


  function toggle () {
    setDisplay(prevDisplay => !prevDisplay)
  }

  if(!display){
    return <button id="newPostButton" onClick={toggle}>New Post</button>
  } else {
    return (
      <div>
        <div>
          {children}
          <button onClick={toggle}>Cancel</button>
        </div>
      </div>
    )
  }
}



export default (Togglable)