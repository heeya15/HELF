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
  fontSize: '30px',
  fontFamily: 'KOTRA_BOLD-Bold',
  '@media (max-width: 480px)': {
    fontSize: '20px',
  },
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  borderRadius: '30px',
  // border: '2px solid #000',
  p: 4,
  '@media (max-width: 480px)': {
    width: '100%',
  },
};

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


const modalBody = {
  fontFamily: 'KOTRA_BOLD-Bold',
  padding: '15px 30px',
  width: '100%',
  margin: '5% auto',
  textAlign: 'center',
  backgroundColor: '#a3cca3',
  fontSize: '20px',
  borderRadius: '30px',
  '@media (max-width: 480px)': {
    fontSize: '15px',
  },
};

const ExerciseInput = styled.input`
  border-radius: 10px;
  border: none;
  text-align: center;
  width: 100%;
  :focus {
    outline: none;
  }
`;

const ExerciseSelect = styled.select`
  border-radius: 10px; 
  outline: 0 none;
  cursor: pointer;
  border: none;
  width: 100%;
  text-align: center;
`;

export { 
  TotalStyle, 
  StartButton,
  modalStyle,
  modalTitle,
  fontBold,
  fontNormal,
  mainButton,
  modalBody,
  ExerciseInput,
  ExerciseSelect,
};
