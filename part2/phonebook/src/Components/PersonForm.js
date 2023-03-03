export const PersonForm = ({ onSubmit, value, onChangeFunction }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={value[0]} onChange={onChangeFunction[0]} />{" "}
      </div>
      <div>
        number: <input value={value[1]} onChange={onChangeFunction[1]} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
