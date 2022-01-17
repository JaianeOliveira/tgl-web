import { Card, Title, P, SendButton } from "../../styles/ui";
import { CartElem, CartTitle } from "../../styles/games";
import { VscArrowRight } from "react-icons/vsc";

const Cart = () => {
  return (
    <CartElem>
      <div className="cartArea">
        <CartTitle fontSize={25}>CART</CartTitle>
        <div className="itens">
          <P>Não há itens no Carrinho</P>
        </div>
        <CartTitle fontSize={25}>
          Cart <span>TOTAL: </span>
          <span>R$ 0,00</span>
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
