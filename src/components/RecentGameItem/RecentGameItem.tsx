import { RecentGameDiv } from '../../styles/games';
import { P, Title } from '../../styles/ui';
import { useSelector } from 'react-redux';
type Props = {
  numbers: string;
  date: string;
  price: number;
  game: string;
};

const RecentGameItem = (props: Props) => {
  const gameData = useSelector((state) => state.game);
  const color =
    gameData.types.find((item) => item.type === props.game)?.color || '#707070';
  const data = new Date(props.date);
  const price = props.price.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
  return (
    <RecentGameDiv color={color}>
      <Title fontSize={20}>{props.numbers}</Title>
      <P>
        {data.toLocaleDateString()} - {`(${price})`}
      </P>
      <P bold={true} fontSize={20} italic={true} color={color}>
        {props.game}
      </P>
    </RecentGameDiv>
  );
};

export default RecentGameItem;
