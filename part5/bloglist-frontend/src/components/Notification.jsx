
const NewPostNotification = ({ notificationMessage }) => {

  if(notificationMessage){
    const { message, status} = notificationMessage
  
    const color = {
      red:" #f44336",
      green:"#48d141"
    }
  
    const box = {
      padding: 20,
      fontSize:30,
      backgroundColor: status ? color.green : color.red,
      color: "white",
      marginBottom: 15
    }
  
      return (
        <div>
          <p style={box}> {message}</p>
        </div>
      )
  }
}

export default NewPostNotification




