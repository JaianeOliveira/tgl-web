import { VscTrash } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../redux/cartSlice';
import { CartItemContainer, CartItemData } from '../../styles/games';
import { P } from '../../styles/ui';

type Props = {
  id: number;
  gameName: string;
  price: number;
  color: string;
  bet: number[];
};

const CartItem = (props: Props) => {
  const dispatch = useDispatch();

  return (
    <CartItemContainer>
      <button
        onClick={() => {
          dispatch(removeItem({ id: props.id, price: props.price }));
        }}
      >
        <VscTrash size={24} />
      </button>
      <CartItemData color={props.color}>
        <P italic={true} bold={true}>
          {props.bet.toString()}
        </P>
        <P italic={true} bold={true} color={props.color}>
          {props.gameName}{' '}
          <span>
            {props.price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </P>
      </CartItemData>
    </CartItemContainer>
  );
};

export default CartItem;
