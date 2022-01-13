import styled from "styled-components";

export const Card = styled.div`
  background-color: #fff;
  border-radius: 14px;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1<{
  fontSize: number;
  textAlign: string;
}>`
  color: #707070;
  font-size: ${(props) => `${props.fontSize}px`};
  font-style: italic;
  text-align: ${(props) => props.textAlign}; ;
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
}>`
  background: none;
  border: none;
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "35px")};
  font-weight: bold;
  font-style: italic;
  color: ${(props) => {
    if (props.color === "green") {
      return "#b5c401";
    } else if (props.color === "greenCart") {
      return "#27C383";
    }
    return "#707070";
  }};
  padding: 10%;
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

  div {
    display: flex;
    margin-top: auto;
  }
`;
