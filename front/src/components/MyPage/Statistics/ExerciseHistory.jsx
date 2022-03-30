import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ExerciseHistoryTotal,
  ReactTooltipStyled,
} from "./ExerciseHistory.style";
import { Container, Row, Col } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import { EXERCISE_HISTORY_FINDALL_REQUEST } from "../../../store/modules/exerciseHistory";

export default function ExerciseHistory() {
  const dispatch = useDispatch();

  const year = 2022;
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

  const { exerciseHistoryList } = useSelector((state) => state.exerciseHistory);
  const { exerciseDateList } = useSelector((state) => state.exerciseHistory);
  const { exerciseTypeList } = useSelector((state) => state.exerciseHistory);

  useEffect(() => {
    dispatch({
      type: EXERCISE_HISTORY_FINDALL_REQUEST,
      data: year,
    });
  }, [dispatch, year]);

  const MAP = [];
  const temp = [];
  for (let i = 0; i < 53; i++) temp.push(0);
  MAP.push(temp);
  for (let i = 0; i < 6; i++) {
    const temp = [];
    for (let j = 0; j < 52; j++) temp.push(0);
    MAP.push(temp);
  }

  let r = 0;
  let c = 0;
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= monthDay[i]; j++) {
      const month = i < 10 ? "0" + i : i;
      const day = j < 10 ? "0" + j : j;
      MAP[r][c] = year + "-" + month + "-" + day;
      if (r + 1 == 7) {
        c++;
        r = 0;
      } else {
        r++;
      }
    }
  }

  return (
    <ExerciseHistoryTotal>
      <Row className="months">
        {months.map((month, index) => (
          <Col key={index}>{month}</Col>
        ))}
      </Row>
      <Row>
        {MAP.map((maps, index) => (
          <div key={index} className="line">
            {maps.map((each, index) => (
              <div
                key={index}
                className={
                  exerciseDateList.check(each) > 5
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
                            fontSize: "10px",
                            fontWeight: "bold",
                            marginBottom: "10%",
                          }}
                        >
                          {dataTip}
                        </div>
                        {exerciseTypeList.check(dataTip) != 0 &&
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
