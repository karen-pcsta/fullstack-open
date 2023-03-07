export const DeleteButton = ({ id, handleClick }) => {
  return (
    <>
      <button onClick={() => handleClick(id)}>Delete</button>
    </>
  );
};
