
const LogoutButton =  ({ onClick, setUser }) => {
  function onClickFunction() {
    onClick(),
    setUser(null)
  }

  return (
    <>
      <button style={{ marginLeft:5 }} onClick={onClickFunction}>logout</button>
    </>
  )
}


export default(LogoutButton)