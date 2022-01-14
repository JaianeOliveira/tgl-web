import { P } from "../../styles/ui";

type Props = {
  numbers: [];
  date: string;
  price: number;
  game: string;
};

const RecentGameItem = (props: Props) => {
  return (
    <div>
      <div className="flag" />
      <div>
        <P italic={true} bold={true} fontSize={20}>
          {props.numbers}
        </P>
        <P>
          {props.date} - {props.price}
        </P>
        <P>{props.game}</P>
      </div>
    </div>
  );
};

export default RecentGameItem;
