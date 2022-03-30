import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from "@mui/material/Box";

import PieChart, {
    Legend,
    Export,
    Series,
    Label,
    Font,
    Connector,
    CommonAnnotationSettings,
    Annotation
} from 'devextreme-react/pie-chart';
import { NUTRITION_HISTORY_REQUEST } from '../../../store/modules/myPage';
import {
    MY_PAGE_REQUEST,
} from '../../../store/modules/myPage';
import {
    MessageWrapper,
    LackMessage,
    NormalMessage,
    TooMuchMessage,
    Title,
} from '../MyPage.style';

function customizeText(arg) {
    // return `${arg.argument} ${arg.valueText} (${arg.percentText})`;
    return `${arg.valueText} (${arg.percentText})`;
}


export default function Nutrition() {
    const dispatch = useDispatch();
    const { nutritionHistoryList } = useSelector(state => state.mypage);
    const { me } = useSelector(state => state.mypage);
    console.log(nutritionHistoryList);
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

    if(month < userYear) {
        age = year - userYear - 1;
    } else if(month == userYear) {
        if(day < userDay) {
        age = year - userYear - 1;
        }
    }

    // console.log(totalCarbohydrate, totalProtein, totalFat);
    // console.log(">>>>>>>>>>>>>> user age : ", age);

    var bmr = 0;
    // 유저 기초대사량 구하기 (Mifflin-St Jeor Equation)
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
        alert("권장량 미달입니다. 권장량을 채우기위해서 더 섭취해주세요!");
    }

    const handleNormalMessage = () => {
        alert("권장량 적정입니다. 이대로 내일도 영양소를 골고루 섭취해주세요!");
    }

    const handleTooMuchMessage = () => {
        alert("권장량 초과입니다. 오늘 추가 섭취는 자제해주세요!");
    }

    useEffect(() => {
        dispatch({
            type: NUTRITION_HISTORY_REQUEST,
        });
        // dispatch({
        //     type: MY_PAGE_REQUEST,
        // });
    }, []);

    return (
        <div>
            {
                nutritionHistoryList.length === 0 && 
                <>
                    <Title>일별 영양 성분</Title>
                    <div>섭취한 영양성분을 확인하기위해서는 식단을 등록해주세요.</div>
                </>
            }
            {
                nutritionHistoryList.length !==0 &&
                <>
                <PieChart
                    id="pie"
                    palette="Bright"
                    dataSource={dataSource}
                    size={bmr}
                    title="일별 영양 성분">
                    <Legend
                        orientation="horizontal"
                        itemTextPosition="right"
                        horizontalAlignment="center"
                        verticalAlignment="bottom"
                        columnCount={4}/>
                    <Export enabled={true}/>
                    <Series argumentField="nutrition" valueField="amount">
                        <Label visible={true} position="columns" customizeText={customizeText}>
                            <Font size={16}/>
                            <Connector visible={true} width={0.5}/>
                        </Label>
                    </Series>
                    {/* <CommonAnnotationSettings type="text">
                    <Font size={16} weight={600} />
                    </CommonAnnotationSettings>
                    {dataSource.map((data) => (
                    <Annotation
                        argument={data.nutrition}
                        key={data.nutrition}
                        data={data}
                    >
                    </Annotation> */}
                    {/* ))} */}
                </PieChart>
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
                </>
            }
    </div>
    );
}

