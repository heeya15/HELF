import styled from 'styled-components';
import { blockColor, device, pointColor } from '../../../style/variables';

const LoginSignupBlock = styled.div`
  //border: 1px solid red;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 60vh;
  margin-right: 60vh;
  background-color: white;
  height: 90vh;
  max-height: 100%;s
  border-radius: 30px;
  text-align: center;
  /* width: 100vw; */
  @media ${device.TabletPortrait} {
    width: 100%;
    border-radius: 0px;
  }
`;

const LoginBlock = styled.div`
  min-height: 480px;
  min-width: 350px;
  width: 55vh;
  height: 70vh;
  background-color: ${blockColor};
  border-radius: 10px;
  @media ${device.TabletPortrait} {
    border-radius: 0px;
    width: 100%;
    height: 100%;
  }
`;
const LoginHeader = styled.div`
  margin-top: 1em;
  height: 30%;
  flex-direction: column;
  #title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    font-size: 50px;
    font-weight: bold;
    color: ${pointColor};
  }
  #word {
    text-align: center;
    height: 20%;
    font-size: 20px;
    color: black;
  }
`;

const LoginContent = styled.div`
  height: 50%;
`;

const LoginContentRow = styled.div`
  font-size: 15px;
  input {
    font-size: 18px;
    display: block;
    width: 280px;
    height: 50px;
    margin: 12px auto;
    padding: 0 20px;
    background-color: #dfdfdf;
    border: 0;
    border-radius: 4px;
  }
  #loginButton {
    font-size: 15px;
    display: block;
    width: 320px;
    height: 50px;
    margin: 12px auto;
    border: 0;
    border-radius: 4px;
    color: white;
    background-color: ${pointColor};
  }
  #footer {
    text-align: center;
  }
`;

const StepperWrapper = styled.div`
  width: 60%;
  margin: 50px auto;
`;

const StepTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 40px 0px;
  color: #225424;
`;

const InputWrapper = styled.div`
  width: 40%; 
  margin: 50px auto;
`;

const Message = styled.span`
  color: #e02828;
`;

const LogInButton = styled.button`
  margin-top: 20px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #2E7D32;
`;

const SignUpLink = styled.div`
  margin-top: 10px;
  cursor: pointer;
  color: 	#414a4c;
  font-family: KOTRA_GOTHIC;
`;

const subFunction = {
  cursor: 'pointer',
  textDecoration: 'underline',
}

const kakaoButton = {
  marginTop: '40px',
  cursor: 'pointer',
}

const inputTextField = {
  backgroundColor: '#fff',
}

const horizontalCenter = {
  margin: '0 auto',
}

export {
  LoginContentRow,
  LoginHeader,
  LoginContent,
  LoginBlock,
  LoginSignupBlock,
  StepperWrapper,
  InputWrapper,
  StepTitle,
  Message,
  LogInButton,
  kakaoButton,
  SignUpLink,
  subFunction,
  inputTextField,
  horizontalCenter,
};
