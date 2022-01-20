import { useState } from "react";
import { NumberButton } from "../../styles/games";

type Props = {
  arr: number[];
  color: string;
  func: (e: any) => void;
};

const TableNumbers = (props: Props) => {
  const [active, setActive] = useState(false);
  return (
    <table>
      <tbody>
        <tr>
          {props.arr.map((item, index) => (
            <NumberButton
              key={index + 1}
              value={index + 1}
              color={props.color}
              onClick={props.func}
            >
              {index + 1}
            </NumberButton>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default TableNumbers;
