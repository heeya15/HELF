import styled from "styled-components";

const TotalStyle = styled.div`
  font-family: 'KOTRA_BOLD-Bold';
  // box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
  padding: 0 20px;
  width: 100%;
  margin: 5% auto;
  text-align: center;
  background-color: #a3cca3;
  font-size: 20px;
  border-radius: 30px;
  input {
    border-radius: 10px;
    border: none;
    text-align: center;
    width: 100%;
    :focus {
      outline: none;
    }
  }
  select {
    border-radius: 10px; 
    outline: 0 none;
    cursor: pointer;
    border: none;
    width: 100%;
    text-align: center;
  }
`;

const StartButton = styled.button`
  // box-shadow: 3px 3px #e0e0e0;
  font-size: 25px;
  border: none;
  border-radius: 10px;
  color: #fff;
  background-color: #56a75f;
  padding: 5px 20px;
  font-family: 'KOTRA_BOLD-Bold';
  :hover {
    transform: scale(1.1);
  }
`;

const modalTitle = {
  textAlign: 'center', 
  lineHeight: '55px', 
  fontSize: '40px',
  fontFamily: 'KOTRA_BOLD-Bold',
}

const fontBold = {
  fontFamily: 'KOTRA_BOLD-Bold',
}

const fontNormal = {
  fontFamily: 'KOTRA_GOTHIC',
}

const mainButton = {
  fontFamily: 'KOTRA_BOLD-Bold',
  backgroundColor: '#7CCE76',
  color: '#000',    
}

export { 
  TotalStyle, 
  StartButton,
  modalTitle,
  fontBold,
  fontNormal,
  mainButton,
};
