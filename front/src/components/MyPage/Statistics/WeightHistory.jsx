import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { WEIGHT_HISTORY_REQUEST } from '../../../store/modules/myPage';
import { useDispatch, useSelector } from 'react-redux';
import {
    Title,
} from '../MyPage.style';
export default function WeightHistory() {
    var temp = [];

    const { me } = useSelector(state => state.mypage);
    const datas = {
        labels: [],
        datasets: [
          {
            label: '체중(kg)',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 3,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp
          }
        ]
    };
   
    const dispatch = useDispatch();
    const { weightHistoryList } = useSelector(state => state.mypage);
    const created_at = [];
    const weight = [];
    if (weightHistoryList.length !== 0) {
        for(let i=0; i<weightHistoryList.length; i++) {
            created_at.push(weightHistoryList[i].created_at);
            weight.push(weightHistoryList[i].weight);
        }
        for(let i=0; i<weightHistoryList.length; i++) {
            datas.labels.push(created_at[i]);  
            temp.push(weight[i]);
        }
    }
    
   
    useEffect(() => {
        dispatch({
            type: WEIGHT_HISTORY_REQUEST,
        });
    }, []);

   
    return (
        <div>
        {
            weightHistoryList.length === 0 && 
            <>
                <Title>가장 최근에 몸무게를 기록한 정보 상위 10개 History</Title>
                <div>나의 가장 최근 몸무게 History 차트를 보려면 몸무게 정보를 등록해주세요.</div>
            </>
        }
        {
            weightHistoryList.length !==0 &&
            <>
                <Title>가장 최근 몸무게를 기록한 정보 상위 10개 History</Title>
                <Chart type="line" data={datas} />
            </>
        }
        </div>
     );
}
