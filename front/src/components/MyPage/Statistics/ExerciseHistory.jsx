import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ExerciseHistoryTotal,
  ReactTooltipStyled,
  Title,
} from "../MyPage.style";
import { Row, Col } from "react-bootstrap";
import { EXERCISE_HISTORY_FINDALL_REQUEST } from "../../../store/modules/exerciseHistory";

export default function ExerciseHistory() {
  const dispatch = useDispatch();

  const now = new Date(); // 현재 날짜 및 시간
  const year = now.getFullYear(); // 연도
  const monthDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const { exerciseDateList } = useSelector((state) => state.exerciseHistory);
  const { exerciseTypeList } = useSelector((state) => state.exerciseHistory);

  useEffect(() => {
    dispatch({
      type: EXERCISE_HISTORY_FINDALL_REQUEST,
      data: year,
    });
  }, [dispatch, year]);

  const MAP = [];
  for (let i = 0; i < 7; i++) {
    const temp = [];
    for (let j = 0; j < 53; j++) temp.push(0);
    MAP.push(temp);
  }

  let r = 0;
  let c = 0;
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= monthDay[i]; j++) {
      const month = i < 10 ? "0" + i : i;
      const day = j < 10 ? "0" + j : j;
      MAP[r][c] = year + "-" + month + "-" + day;
      if (r + 1 === 7) {
        c++;
        r = 0;
      } else {
        r++;
      }
    }
  }

  return (
    <ExerciseHistoryTotal>
      <Title>운동 기록</Title>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row className="months">
          {months.map((month, index) => (
            <Col key={index}>{month}</Col>
          ))}
        </Row>
      </div>

      <Row>
        {MAP.map((maps, index) => (
          <div key={index} className="line">
            {maps.map((each, index) => (
              <div
                key={index}
                className={
                  each === 0
                    ? "cell"
                    : exerciseDateList.check(each) > 5
                    ? "cell fill-5"
                    : "cell fill-" + exerciseDateList.check(each)
                }
                data-for={
                  exerciseDateList.check(each) > 0 ? "data" + index : ""
                }
                data-tip={each}
              >
                {exerciseDateList.check(each) > 0 && (
                  <ReactTooltipStyled
                    id={"data" + index}
                    place="right"
                    getContent={(dataTip) => (
                      <>
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            marginBottom: "10%",
                          }}
                        >
                          {dataTip}
                        </div>
                        {exerciseTypeList.check(dataTip) !== 0 &&
                          exerciseTypeList.get(dataTip).map((item, index) => (
                            <div key={index}>
                              {item.name} : {item.count}
                            </div>
                          ))}
                      </>
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </Row>
    </ExerciseHistoryTotal>
  );
}
