export const Person = ({ personInfo }) => {
  return (
    <>
      <ul>
        <li>
          {personInfo.name} {personInfo.number}
        </li>
      </ul>
    </>
  );
};
