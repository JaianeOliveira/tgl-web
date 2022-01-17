import { RecentGameDiv } from "../../styles/games";
import { P, Title } from "../../styles/ui";

type Props = {
  numbers: [];
  date: string;
  price: number;
  game: string;
  color: string;
};

const RecentGameItem = (props: Props) => {
  return (
    <RecentGameDiv color={props.color}>
      <Title fontSize={20}>{props.numbers}</Title>
      <P>
        {props.date} - {props.price}
      </P>
      <P color={props.color} bold={true} fontSize={20}>
        {props.game}
      </P>
    </RecentGameDiv>
  );
};

export default RecentGameItem;
