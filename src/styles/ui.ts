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

export const SendButton = styled.button`
  background: none;
  border: none;
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
  color: #b5c401;
  padding: 10%;
  display: flex;
  justify-content: center;
  transition: 0.1s ease-in-out;
  cursor: pointer;

  .icon {
    margin-left: 16px;
  }

  :hover {
    filter: brightness(0.95);
  }
  :active {
    filter: brightness(1.1);
  }
`;
