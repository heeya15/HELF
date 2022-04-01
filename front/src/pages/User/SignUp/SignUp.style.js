import styled from 'styled-components';

const AuthButton = styled.button`
    height: 55px;
    width: 100%;
    font-size: 14px;
    border: none;
    color: #fff;
    background-color: #2E7D32;
`;

const SignUpButton = styled.button`
    margin-top: 20px;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 5px;
    color: #fff;
    background-color: #2E7D32;
`;


const Message = styled.div`
    font-weight: 500;
    font-size: 10px;
    line-height: 24px;
    letter-spacing: -1px;
    position: absolute;
    bottom: -10px;
    left: 0;
`;


const Success = styled.div`
    color: #1b5e20;
    font-size: 12px;
`;

const Error = styled.div`
    paddingTop: 0;
    color: #e02828;
    font-size: 12px;
`

const SignInLink = styled.div`
    margin-top: 10px;
    cursor: pointer;
    color: 	#414a4c;
`;

const InputBox = `
    background-color: #000;
`;

export {
    AuthButton, 
    SignUpButton,
    Message,
    Success,
    Error,
    SignInLink,
    InputBox,
};
