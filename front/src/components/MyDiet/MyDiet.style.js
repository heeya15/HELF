import styled from 'styled-components';

const DietDiaryItemWrapper = styled.div`
    margin: 20px auto;
`;

const AddButton = styled.button`
    color: #fff;
    background-color: #56A75F;
    border: none;
    border-radius: 30px;
    padding: 8px;
`;

const ShareButton = styled.button`
    color: #fff;
    background-color: #3C86DD;
    border: none;
    padding: 5px 10px;
    border-radius: 20px;
    :hover {
        transform: scale(1.1);   
    }
`;

const DeleteButton = styled.button`
    color: #fff;
    background-color: #B22222;
    :hover {
        transform: scale(1.1);   
    }
`;

const DietDiaryItem = styled.div`
    margin: 20px auto;
    padding: 30px 30px;
    width: 80%;
    border: 1px solid #bdbdbd;
    border-radius: 20px;
    box-shadow: 7px 7px #bdbdbd;
`;

const TotalKcal = styled.div`
    font-size: 30px;
`;

const DiaryList = styled.div`
    @media (max-width:425px){
        width: 80%;
        textAlign: 'center'
    }
`
const shareBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
};

const descriptionArea = {
    width: '100%',
    height: '150px',
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '3px 3px #bdbdbd',
};

const ButtonWrapper = styled.div`
    margin-top: 20px;
    text-align: right;
`;

const ConfirmButton = styled.button`
    background-color: #2E7D32;
    color: #fff;
    border: 2px solid #2E7D32;
    border-radius: 10px;
    padding: 5px 10px;
    margin-right: 5px;
`;

const CancelButton = styled.button`
    background-color: #fff;
    color: #2E7D32;
    border: 2px solid #2E7D32;
    border-radius: 10px;
    padding: 5px 10px;
`;

const dietDiaryItem = {
    cursor: 'pointer',
};

export { 
    DietDiaryItemWrapper,
    AddButton,
    ShareButton,
    DiaryList,
    DietDiaryItem,
    TotalKcal,
    DeleteButton,
    shareBox,
    descriptionArea,
    ButtonWrapper,
    ConfirmButton,
    CancelButton,
    dietDiaryItem
};