import { DeleteButton } from "./DeleteButton";
export const Person = ({ personInfo, eventHandler }) => {
  return (
    <>
      <ul>
        <li>
          {personInfo.name} {personInfo.number} <DeleteButton id={personInfo.id} handleClick={eventHandler} />
        </li>
      </ul>
    </>
  );
};
