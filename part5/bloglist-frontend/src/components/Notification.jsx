
const NewPostNotification = ({ isAdded,notAdded,notLogged, title, author }) => {

  const color = {
    red:" #f44336",
    green:"#48d141"
  }

  const box = {
    padding: 20,
    fontSize:30,
    backgroundColor: isAdded ? color.green : notAdded || notLogged ? color.red : "" ,
    color: "white",
    marginBottom: 15
  }

  if(notLogged === true) {
    return (
      <div>
        <p style={box}> {"Wrong username or password "}</p>
      </div>
    )
  }

  if(isAdded === true) {
    return (
      <div>
        <p style={box}> {`A new blog ${title} by ${author} added`}</p>
      </div>
    )
  } else if(notAdded){
    return (
      <div>
        <p style={box}> {"Blog was not added"}</p>
      </div>
    )
  }
}

export default NewPostNotification




