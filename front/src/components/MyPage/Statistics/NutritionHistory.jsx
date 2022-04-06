import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PieChart, {
    Legend,
    Export,
    Series,
    Label,
    Font,
    Connector,
} from 'devextreme-react/pie-chart';
import { NUTRITION_HISTORY_REQUEST } from '../../../store/modules/myPage';
import {
    MessageWrapper,
    LackMessage,
    NormalMessage,
    TooMuchMessage,
    Title,
    fontNormal,
    NutritionStatus,
    EmptyText,
    Description,
} from '../MyPage.style';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function customizeText(arg) {
    // return `${arg.argument} ${arg.valueText} (${arg.percentText})`;
    return `${arg.valueText} (${arg.percentText})`;
}

export default function NutritionHistory() {
    const dispatch = useDispatch();
    const { nutritionHistoryList } = useSelector(state => state.mypage);
    const { me } = useSelector(state => state.mypage);
    const [ startDate, setStartDate ] = useState(new Date());

    const CarbohydrateList = [];
    const ProteinList = [];
    const FatList = [];
    const dataSource = [];

    var totalCarbohydrate = 0;
    var totalProtein = 0;
    var totalFat = 0;

    if(nutritionHistoryList.length !== 0) {
        for(let i=0; i<nutritionHistoryList.length; i++) {
            CarbohydrateList.push(nutritionHistoryList[i].carbohydrate);
            ProteinList.push(nutritionHistoryList[i].protein);
            FatList.push(nutritionHistoryList[i].fat);
        }
        totalCarbohydrate = CarbohydrateList.reduce((sum, currValue) => {
            return sum + currValue;
        });
        totalProtein = ProteinList.reduce((sum, currValue) => {
            return sum + currValue;
        });
        totalFat = FatList.reduce((sum, currValue) => {
            return sum + currValue;
        });
        dataSource.push({ nutrition: '탄수화물', amount: totalCarbohydrate },)
        dataSource.push({ nutrition: '단백질', amount: totalProtein },)
        dataSource.push({ nutrition: '지방', amount: totalFat },)
    }

    const now = new Date();   // 현재 날짜 및 시간
    const year = now.getFullYear(); // 연도
    const month = now.getMonth();   // 월
    const day = now.getDate();      // 일
    var userYear = '';
    var userMonth = '';
    var userDay = '';
    if(me.birthday !== null) {
        userYear = me.birthday.substring(0, 4);
        userMonth = me.birthday.substring(5, 7);
        userDay = me.birthday.substring(9, 10);
    }

    var age = 0;

    if(month < userMonth) {
        age = year - userYear - 1;
    } else if(month === userYear) {
        if(day < userDay) {
        age = year - userYear - 1;
        }
    }

    // 유저 기초대사량 구하기 (Mifflin-St Jeor Equation)
    var bmr = 0;
    if(!me.gender) { // 남성인 경우
        bmr = (me.weight * 10 + me.height * 6.25 - 5 * age + 5);
    } else {         // 여성인 경우
        bmr = (me.weight * 10 + me.height * 6.25 - 5 * age - 161);
    }

    var carbohydrateCheck = 0;
    var proteinCheck = 0;
    var fatCheck = 0;
    // 탄수화물 (적정 : 45% ~ 65%)
    if(totalCarbohydrate < bmr * 0.45) {    // 부족
        carbohydrateCheck = 0;
    } else if(totalCarbohydrate >= bmr * 0.45 && totalCarbohydrate <= bmr * 0.65) {     // 적정
        carbohydrateCheck = 1;
    } else {
        carbohydrateCheck = 2;
    }

    // 단백질 (적정 : 10% ~ 35%)
    if(totalProtein < bmr * 0.1) {
        proteinCheck = 0;
    } else if(totalProtein >= bmr * 0.1 && totalProtein <= bmr * 0.35) {
        proteinCheck = 1;
    } else {
        proteinCheck = 2;
    }

    // 지방 (적정 : 20% ~ 35%)
    if(totalFat < bmr * 0.2) {
        fatCheck = 0;
    } else if(totalFat >= bmr * 0.2 && totalFat <= bmr * 0.35) {
        fatCheck = 1;
    } else {
        fatCheck = 2;
    }

    const handleLackMessage = () => {
        alert('권장량 미달입니다. 권장량을 채우기위해서 더 섭취해주세요!');
    }

    const handleNormalMessage = () => {
        alert('권장량 적정입니다. 이대로 내일도 영양소를 골고루 섭취해주세요!');
    }

    const handleTooMuchMessage = () => {
        alert('권장량 초과입니다. 오늘 추가 섭취는 자제해주세요!');
    }

    function dateFormat(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

        return date.getFullYear() + '-' + month + '-' + day;
    }

    useEffect(() => {
        const createdAt = dateFormat(startDate);
        dispatch({
            type: NUTRITION_HISTORY_REQUEST,
            data: {
                createdAt: createdAt,
            }
        });
    }, [ startDate ]);

    return (
        <div style={{ height: '100%', width: '100%'}}>
            <Title>영양 성분 통계</Title>
            <DatePicker 
                style={{ width: '10%'}}
                locale='ko'
                selected={startDate} 
                onChange={
                    (date) => setStartDate(date)
                } />
            <Description>* 확인하려는 날짜를 선택해주세요.</Description>
            {
                nutritionHistoryList.length === 0 && 
                <>
                    <EmptyText>섭취한 영양성분을 확인하기위해서는<br/>식단을 등록해주세요.</EmptyText>
                </>
            }
            {
                nutritionHistoryList.length !==0 &&
                <>
                <MessageWrapper>
                    { carbohydrateCheck === 0 && <LackMessage onClick={ handleLackMessage }>탄수화물</LackMessage> }
                    { carbohydrateCheck === 1 && <NormalMessage onClick={ handleNormalMessage }>탄수화물</NormalMessage> }
                    { carbohydrateCheck === 2 && <TooMuchMessage onClick={ handleTooMuchMessage }>탄수화물</TooMuchMessage> }
                    { proteinCheck === 0 && <LackMessage onClick={ handleLackMessage }>단백질</LackMessage> }
                    { proteinCheck === 1 && <NormalMessage onClick={ handleNormalMessage }>단백질</NormalMessage> }
                    { proteinCheck === 2 && <TooMuchMessage onClick={ handleTooMuchMessage }>단백질</TooMuchMessage> }
                    { fatCheck === 0 && <LackMessage onClick={ handleLackMessage }>지방</LackMessage> }
                    { fatCheck === 1 && <NormalMessage onClick={ handleNormalMessage }>지방</NormalMessage> }
                    { fatCheck === 2 && <TooMuchMessage onClick={ handleTooMuchMessage }>지방</TooMuchMessage> }
                </MessageWrapper>
                <Description>
                    *오늘 영양소 섭취량을 표시하는 것으로,<br/>
                    노란색은 부족, 초록색은 적정, 빨간색은 과다를 뜻합니다.
                </Description>
                <PieChart
                    id='pie'
                    palette='Material'
                    dataSource={dataSource}
                    >
                    <Legend
                        orientation='horizontal'
                        itemTextPosition='right'
                        horizontalAlignment='center'
                        verticalAlignment='bottom'
                        columnCount={4}/>
                    <Export enabled={true}/>
                    <Series argumentField='nutrition' valueField='amount'>
                        <Label visible={true} position='columns' customizeText={customizeText}>
                            <Font size={16}/>
                            <Connector visible={true} width={0.5}/>
                        </Label>
                    </Series>
                </PieChart>
                </>
            }
    </div>
    );
}

