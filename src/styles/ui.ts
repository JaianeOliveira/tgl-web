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
  font-size: ${(props) => `${props.fontSize}rem`};
  font-style: italic;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
`;

export const SendButton = styled.button<{
  color: string;
  fontSize?: number | false;
  noPadding?: boolean | true;
}>`
  background: none;
  width: auto;
  border: none;
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}rem` : '3.5rem')};
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
  padding: ${(props) => (!props.noPadding ? '30px' : '10px')};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease-in-out;
  cursor: pointer;
  outline: none;

  .icon {
    margin: 0 13px;
  }

  :hover {
    filter: brightness(0.95);
  }
  :active {
    filter: brightness(1.1);
  }

  @media (max-width: 426px) {
    padding-left: 0;
  }
`;

export const Header = styled.header`
  display: flex;
  padding: 0 10%;
  align-items: center;
  border-bottom: 2px solid #ebebeb;
  justify-content: space-between;
  height: auto;
  flex-wrap: wrap;

  @media (max-width: 426px) {
    align-items: center;
    justify-content: flex-start;
    padding-top: 3vh;

    button {
      padding-left: 0;
      font-size: 1.9rem;
    }
  }

  @media (max-width: 376px) {
    button {
      font-size: 1.5rem;
      padding-right: 5vw;
    }
  }

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

  div {
    display: flex;
    margin-top: auto;
    flex-wrap: wrap;
  }
`;

export const Body = styled.div`
  min-height: 80vh;
  height: auto;
  padding: 6vh 10vw;

  .gamesPage {
    button {
      cursor: pointer;
    }
    h1 {
      margin-bottom: 3vh;
    }
    p {
      margin-top: 2vh;
    }

    form {
      display: flex;
      flex-direction: column;
      margin: 5vh 0;
      div {
        display: flex;
        flex-direction: row;

        button:first-child {
          color: #b5c401;
          padding-left: 0;
        }
      }
      p {
        margin-bottom: 3vh;
      }
      button {
        margin-top: 5vh;
      }
      input {
        background: none;
        border: none;
        padding: 10px;
        border-bottom: 2px solid #dddddd;
        width: 100%;
        height: 8vh;
        outline: none;
        font-size: 1.7rem;
        color: #707070;
        font-style: italic;
        font-weight: bold;
        ::placeholder {
          font-size: 1.7rem;
          color: #9d9d9d;
          font-style: italic;
          font-weight: bold;
        }
      }
    }

    .selectGame {
      display: flex;
      @media (max-width: 426px) {
        flex-direction: column;
        button {
          width: 100%;
          margin-bottom: 2vh;
        }
      }
    }
    .actionButtons {
      display: flex;
      margin-top: 4vh;

      @media (max-width: 426px) {
        flex-direction: column;
      }
      button:first-child {
        padding-left: 0;
      }
    }
  }
  .newBet_page {
    display: flex;

    @media (max-width: 1017px) {
      flex-direction: column;
      section {
        width: 100%;
      }
    }
  }
  .home_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    @media (max-width: 1204px) {
      justify-content: space-evenly;
      margin-bottom: 5vh;
    }

    @media (max-width: 426px) {
      justify-content: flex-start;
    }
  }
  .filter_div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 40px;
    flex-wrap: wrap;
    width: auto;

    @media (max-width: 880px) {
      margin-top: 4vh;
    }
    @media (max-width: 426px) {
      margin-left: 0px;
      justify-content: flex-start;

      p {
        margin-bottom: 2vh;
      }
      button {
        width: 100%;
        margin-bottom: 2vh;
        flex: 1 1;
      }
    }
  }
  .recentGames {
    width: auto;
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
  font-size: 1.5rem;
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
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}rem` : '1.7rem')};
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
    font-size: 1.8rem;
  }
`;

export const SetAccount = styled.form`
  p {
    font-weight: bold;
  }
  input {
    font-size: 1.5rem;
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
    font-size: 1.5rem;
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
