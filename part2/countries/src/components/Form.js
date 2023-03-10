export const Form = ({ onSubmit, value, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Find countries:
        <input value={value} onChange={onChange} />
      </div>
    </form>
  );
};
