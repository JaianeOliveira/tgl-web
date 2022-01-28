import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../CartItem';
import { betsServices } from '../../services/';
import { clearCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { AlertError, AlertSuccess } from '../index';
import { VscArrowRight } from 'react-icons/vsc';
import { P, SendButton } from '../../styles/ui';
import { CartElem, CartTitle } from '../../styles/games';

const Cart = () => {
  const { cart, total } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newBet } = betsServices();

  const saveNewBet = () => {
    const data: { game_id: number; numbers: number[] }[] = [];

    cart.map(({ bet, game_id }) =>
      data.push({
        game_id: game_id,
        numbers: bet,
      })
    );
    if (token === null) {
      return;
    }

    newBet(data, token)
      .then((response) => {
        dispatch(clearCart());
        AlertSuccess('Saved bet!');
        navigate('/home');
      })
      .catch((error) => AlertError(error.response.data.message));
  };

  return (
    <CartElem>
      <div className="cartArea">
        <CartTitle fontSize={2.5}>CART</CartTitle>
        <div className="itens">
          {cart.length === 0 && <P italic={true}>Empty cart</P>}
          {cart.length > 0 &&
            cart.map((item, index) => (
              <CartItem
                key={item.id}
                id={item.id}
                gameName={item.gameName}
                color={item.color}
                price={item.price}
                bet={item.bet}
              />
            ))}
        </div>
        <CartTitle fontSize={2.5}>
          Cart <span>TOTAL: </span>
          <span>
            {total.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </CartTitle>
      </div>
      <div className="saveButton">
        <SendButton color="greenCart" onClick={saveNewBet}>
          Save <VscArrowRight className="icon" />
        </SendButton>
      </div>
    </CartElem>
  );
};

export default Cart;
