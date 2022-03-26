import styled from 'styled-components';

const AuthButton = styled.button`
    height: 55px;
    width: 100%;
    border: none;
    border-radius: 5px;
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
    fontWeight: 500;
    fontSize: 1.6rem;
    lineHeight: 24px;
    letterSpacing: -1px;
    position: absolute;
    bottom: -10px;
    left: 0;
`;


const Success = styled.div`
    color: #1b5e20;
`;

const Error = styled.div`
    paddingTop: 0;
    color: #e02828;
`

const SignInLink = styled.div`
    cursor: pointer;
`;

export {
    AuthButton, 
    SignUpButton,
    Message,
    Success,
    Error,
    SignInLink,
};
