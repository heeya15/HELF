import styled from "styled-components";
import ReactTooltip from "react-tooltip";

const ReactTooltipStyled = styled(ReactTooltip)`
  &.place-right {
    background-color: white;
    color: black;
    font-size: 10px;
  }
`;

const ExerciseHistoryTotal = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
  .line {
    display: block;
    font-size: 0;
  }
  .cell {
    height: 15px;
    width: 15px;
    border-radius: 2px;
    margin: 1px;
    font-size: 10px;
    display: inline-grid;
  }
  .months {
    font-size: 10px;
    width: 900px;
    margin-right: 4%;
  }
  .fill-0 {
    background-color: #ebedf0;
  }
  .fill-1 {
    background-color: #aae68a;
  }
  .fill-2 {
    background-color: rgb(113, 197, 131);
  }
  .fill-3 {
    background-color: rgb(15, 126, 61);
  }
  .fill-4 {
    background-color: rgb(10, 88, 42);
  }
  .fill-5 {
    background-color: rgb(7, 63, 29);
  }
`;

export { ExerciseHistoryTotal, ReactTooltipStyled };
