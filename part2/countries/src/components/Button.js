export const Button = ({ id, showCountry, countryId }) => {
  return (
    <button
      onClick={() => {
        showCountry(true);
        countryId(id);
      }}
    >
      show
    </button>
  );
};
