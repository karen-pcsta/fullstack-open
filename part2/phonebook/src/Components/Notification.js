export const Notification = ({ message, status }) => {
  const messageStyle = {
    color: status ? "green" : "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  };

  if (message === null) {
    return null;
  }

  return <div style={messageStyle}>{message}</div>;
};
