import styled from 'styled-components';
import { Card, Title } from './ui';
export const RecentGameDiv = styled.div<{ color: string }>`
  border-left: 6px solid ${(props) => props.color};
`;

export const NewBetTitle = styled.p`
  font-size: 25px;
  color: #707070;
  font-style: italic;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 33px;
  span {
    font-weight: normal;
  }
`;

export const GameButton = styled.button<{ color: string }>`
  border: 2px solid ${(props) => props.color};
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
  border-radius: 100px;
  padding: 7px 25px;
  margin: 0 25px 0 0;
  cursor: pointer;
  transition: 0.15s ease-in-out;
  :hover {
    filter: brightness(0.95);
  }
  :active {
    background: ${(props) => props.color};
    color: #fff;
  }
`;
type NumberButtonTypes = {
  color: string;
  selected: boolean;
};
export const NumberButton = styled.button.attrs((props: NumberButtonTypes) => ({
  color: props.color,
  selected: props.selected,
}))<NumberButtonTypes>`
  height: 65px;
  width: 65px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background: ${(props) => (props.selected ? props.color : '#adc0c4')};
  border-radius: 100%;
  outline: none;
  border: none;
  margin: 12px 12px 12px 0;
  transition: 0.13s ease-in-out;
  cursor: pointer;

  :hover {
    filter: brightness(0.92);
  }

  :active {
    color: #fff;
    background: ${(props) => props.color};
  }
`;

export const CartElem = styled(Card)`
  width: 317px;
  max-height: 484px;
  overflow: hidden;
  .cartArea {
    padding: 30px 19px 40px 19px;
  }
  .itens {
    margin: 40px 0;
    overflow-y: scroll;
    max-height: 180px;
  }
  .saveButton {
    background: #f4f4f4;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #e2e2e2;
    button {
      width: 100%;
    }
  }
`;

export const CartTitle = styled(Title)`
  text-transform: uppercase;
  span {
    font-weight: lighter;
    font-style: normal;
  }
`;

export const BottomButton = styled.button`
  background: none;
  border: 1px solid #27c383;
  color: #27c383;
  font-size: 16px;
  border-radius: 10px;
  padding: 16px 22px;
  margin-right: 25px;
  cursor: pointer;
  transition: 0.15s ease-in-out;
  :hover {
    filter: brightness(0.95);
  }
`;

export const AddToCartButton = styled.button`
  border: none;
  background: #27c383;
  color: #fff;
  padding: 16px 22px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-left: auto;
  cursor: pointer;
  transition: 0.15s ease-in-out;

  :hover {
    filter: brightness(0.95);
  }

  .icon {
    margin-right: 25px;
    font-size: 24px;
  }
`;

export const CartItemContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 32px;
  min-height: 60px;

  button {
    width: 15%;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    color: #888888;
  }
`;

export const CartItemData = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 85%;
  border-radius: 4px;
  border-left: 4px solid ${(props) => props.color};
  padding: 13px;

  p:first-child {
    margin-bottom: 6px;
    word-break: break-all;
    white-space: pre-wrap;
  }
`;
