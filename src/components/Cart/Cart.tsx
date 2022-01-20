import { P, SendButton } from "../../styles/ui";
import { CartElem, CartTitle } from "../../styles/games";
import { VscArrowRight } from "react-icons/vsc";
import { useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  let total = 0;
  const cartTotal = () => {
    cart.map((item) => total + item.price);
  };
  cartTotal();
  return (
    <CartElem>
      <div className="cartArea">
        <CartTitle fontSize={25}>CART</CartTitle>
        <div className="itens">
          {cart.length === 0 && <P italic={true}>Não há nada no carrinho</P>}
          {cart.length > 0 &&
            cart.map((item, index) => (
              <CartItem
                key={item.id}
                id={index}
                gameName={item.gameName}
                color={item.color}
                price={item.price}
                bet={item.bet}
              />
            ))}
        </div>
        <CartTitle fontSize={25}>
          Cart <span>TOTAL: </span>
          <span>R$ {total}</span>
        </CartTitle>
      </div>
      <div className="saveButton">
        <SendButton color="greenCart">
          Save <VscArrowRight className="icon" />
        </SendButton>
      </div>
    </CartElem>
  );
};

export default Cart;
