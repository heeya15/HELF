import styled from 'styled-components';
import TextField from "@mui/material/TextField";

const LoginContent = styled.div`
  height: 50%;
`;

const StepperWrapper = styled.div`
  width: 70%;
  height: 70%;
  margin: 70px auto;
  padding: 50px 100px;
  border-radius: 20px;
  background-color: #f2f7f4;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
  @media (max-width: 768px) {
    width: 90%;
    margin: 30px auto;
    padding: 20px 10px;
  }
`;

const Title = styled.div`
  font-size: 40px;
  margin-bottom: 50px;
  color: #225424;
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const StepTitle = styled.div`
  font-size: 25px;
  margin: 70px 0px 90px 0px;
  color: #000;
  font-family: KOTRA_GOTHIC;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const InputWrapper = styled.div`
  width: 40%;
  margin: 50px auto;
`;

const inputBox = {
  width: "80%",
  backgroundColor: "#fff",
};

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
  background-color: #2e7d32;
`;

const SignUpLink = styled.div`
  margin-top: 10px;
  cursor: pointer;
  color: #414a4c;
  font-family: KOTRA_GOTHIC;
`;

const subFunction = {
  cursor: "pointer",
  textDecoration: "underline",
};

const kakaoButton = {
  marginTop: "40px",
  cursor: "pointer",
};

const inputTextField = {
  backgroundColor: "#fff",
};

const horizontalCenter = {
  margin: "0 auto",
};

const StyledTextField = styled(TextField)`
  background-color: #fff;
  @media (max-width: 480px) {
    width: 100%;
  }
  @media (min-width: 481px) and (max-width: 991px) {
    width: 100%;
  }
  @media (min-width: 992px) {
    width: 80%;
  }
`;

export {
  LoginContent,
  StepperWrapper,
  InputWrapper,
  StepTitle,
  Title,
  Message,
  LogInButton,
  kakaoButton,
  SignUpLink,
  subFunction,
  inputTextField,
  horizontalCenter,
  inputBox,
  StyledTextField,
};
