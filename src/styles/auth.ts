import { Card } from './ui';
import styled from 'styled-components';

export const AuthCard = styled(Card)`
  box-shadow: 0px 3px 25px #00000014;
  margin-top: 26px;

  .forgetPassword {
    background: none;
    border: none;
    color: #c1c1c1;
    font-style: italic;
    font-size: 17px;
    padding: 7%;
    display: flex;
    align-self: flex-end;
    width: auto;
    transition: 0.1s ease-in-out;
    cursor: pointer;

    :hover {
      filter: brightness(0.95);
    }
    :active {
      filter: brightness(1.1);
    }
    @media (max-width: 376px) {
      width: 70vw;
    }
  }
`;
export const AuthPageLayout = styled.div`
  display: flex;
  padding: 6vw 6vh;
  justify-content: space-evenly;
  @media (max-width: 1058px) {
    flex-direction: column;
  }

  @media (max-width: 426px) {
    section:first-child {
      h1:first-child {
        font-size: 6rem;
      }
      h1:last-child {
        font-size: 7.5rem;
      }
    }
  }

  @media (max-width: 376px) {
    section:first-child {
      h1:first-child {
        font-size: 5.5rem;
      }
      h1:last-child {
        font-size: 6.8rem;
      }
    }
  }
  @media (max-width: 321px) {
    section:first-child {
      h1:first-child {
        font-size: 5rem;
      }
      h1:last-child {
        font-size: 6rem;
      }
    }
  }
  section {
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

    @media (max-width: 1058px) {
      margin-bottom: 10vh;
    }
  }
`;

export const AuthInput = styled.input`
  background: none;
  border: none;
  padding: 6%;
  border-bottom: 2px solid #dddddd;
  width: 352px;
  height: 85px;
  outline: none;
  font-size: 17px;
  color: #707070;
  font-style: italic;
  font-weight: bold;
  ::placeholder {
    font-size: 17px;
    color: #9d9d9d;
    font-style: italic;
    font-weight: bold;
  }
`;
export const UserData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p:first-of-type {
    margin-bottom: 2vh;
  }
  p {
    margin-bottom: 1.5vh;
  }
  img {
    height: 15vh;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    margin-bottom: 5vh;
  }
  .edit_userData {
    background: #b5c401;
    color: #fff;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 3px 25px #00000014;
    font-size: 16px;
    padding: 10px 30px;
    display: flex;
    justify-content: space-evenly;
    width: auto;
    margin-top: 5vh;
    cursor: pointer;
  }
  p:last-of-type {
    margin-bottom: 5vh;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 20px;

    button {
      padding: 2vh 0;

      @media (max-width: 425px) {
        font-size: 1.6rem;
      }
    }
    input {
      color: #9d9d9d;
      font-size: 16px;
      font-style: italic;
      padding: 8px;
      width: 50vw;
      border: none;
      outline: none;
      background: none;
      border-bottom: 2px solid #ebebeb;
      margin-bottom: 3vh;
    }
  }
`;
