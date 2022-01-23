import styled from 'styled-components';

export const Card = styled.div`
  background-color: #fff;
  border-radius: 14px;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1<{
  fontSize: number;
  textAlign?: string | false;
}>`
  color: #707070;
  font-size: ${(props) => `${props.fontSize}px`};
  font-style: italic;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')}; ;
`;

export const AuthPageLayout = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  section {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .for {
      background-color: #b5c401;
      border-radius: 100px;
      height: 39px;
      width: 144px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      text-transform: uppercase;
      font-weight: bold;
      font-style: italic;
      margin: 26px 0 26px 0;
    }
  }
`;

export const SendButton = styled.button<{
  color: string;
  fontSize?: number | false;
  idPadding?: boolean | true;
}>`
  background: none;
  border: none;
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : '35px')};
  font-weight: bold;
  font-style: italic;
  color: ${(props) => {
    if (props.color === 'green') {
      return '#b5c401';
    } else if (props.color === 'greenCart') {
      return '#27C383';
    }
    return '#707070';
  }};
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease-in-out;
  cursor: pointer;

  .icon {
    margin: 0 13px;
  }

  :hover {
    filter: brightness(0.95);
  }
  :active {
    filter: brightness(1.1);
  }
`;

export const Header = styled.header`
  display: flex;
  padding: 0 10%;
  align-items: center;
  border-bottom: 2px solid #ebebeb;
  height: 10vh;
  justify-content: space-between;

  .name {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    margin-right: 5vw;
  }
  .name div {
    height: 7px;
    border-radius: 6px;
    width: auto;
    background: #b5c401;
  }
  .modal {
  }

  div {
    display: flex;
    margin-top: auto;
  }
`;

export const Body = styled.div`
  padding: 6vh 10vw;
  min-height: 80vh;
  height: auto;
  .recentGames {
    width: auto;
    max-height: 60vh;
    overflow-y: scroll;
  }
  .gameArea {
    max-width: 55vw;
    margin-right: 5vw;

    table {
      margin: 30px 0;
    }
  }

  .cartArea {
  }

  .bottomButtons {
    display: flex;
  }
`;

export const Footer = styled.footer`
  height: 10vh;
  border-top: 2px solid #ebebeb;
  color: #707070;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const P = styled.p<{
  italic?: boolean | false;
  fontSize?: number | false;
  bold?: boolean | false;
  color?: string | false;
}>`
  color: ${(props) => (props.color ? props.color : '#868686')};
  font-style: ${(props) => (props.italic ? 'italic' : 'none')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '17px')};
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};

  span {
    font-weight: normal;
    color: #868686;
  }
`;

export const AccountData = styled.div`
  display: flex;
  margin: 3vh 3vw;
  img {
    border-radius: 100%;
    border: 1px solid #dddddd;
    margin-right: 2vw;
    height: 10vh;
    aspect-ratio: 1 / 1;
  }
  .label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    p {
      margin-bottom: 5px;
    }
  }
  button {
    background: none;
    border: none;

    color: #707070;
    font-size: 18px;
  }
`;

export const SetAccount = styled.form`
  p {
    font-weight: bold;
  }
  input {
    font-size: 15px;
    color: #707070;
    height: 4vh;
    width: 100%;
    border: none;
    box-shadow: none;
    border-bottom: 1px solid #ebebeb;
    outline: none;
    background: none;
    margin-bottom: 2vh;
  }

  .save {
    background: #27c383;
  }
  .cancel {
    background: #df2a33;
  }
  button {
    font-size: 15px;
    height: 4vh;
    width: 90px;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin-right: 1vw;
    cursor: pointer;
    :hover {
      filter: brightness(1.05);
    }
  }
`;
