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
`;

const DeleteButton = styled.button`
    color: #fff;
    background-color: #B22222;
    
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

export { 
    DietDiaryItemWrapper,
    AddButton,
    ShareButton,
    DiaryList,
    DietDiaryItem,
    TotalKcal,
    DeleteButton };