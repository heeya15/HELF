import produce from "immer";

var HashMap = function() {
  this.map = new Array();
};
HashMap.prototype = {
  put: function(key, value) {
    this.map[key] = value;
  },
  get: function(key) {
    return this.map[key];
  },
  clear: function() {
    this.map = new Array();
  },
  check: function(key) {
    if (key in this.map) return this.map[key];
    else return 0;
  },
  push: function(key, value) {
    this.map[key].push(value);
  },
  length: function(key) {
    return this.map[key].length;
  },
};

const initialState = {
  exerciseHistoryList: [],
  exerciseDateList: new HashMap(),
  exerciseTypeList: new HashMap(),
  exercise: {
    type: 1,
    set: 0,
    time: 0,
  },
};

export const EXERCISE_HISTORY_FINDALL_REQUEST =
  "EXERCISE_HISTORY_FINDALL_REQUEST";
export const EXERCISE_HISTORY_FINDALL_SUCCESS =
  "EXERCISE_HISTORY_FINDALL_SUCCESS";
export const EXERCISE_HISTORY_FINDALL_FAILURE =
  "EXERCISE_HISTORY_FINDALL_FAILURE";

export const EXERCISE_HISTORY_REGISTER_REQUEST =
  "EXERCISE_HISTORY_REGISTER_REQUEST";
export const EXERCISE_HISTORY_REGISTER_SUCCESS =
  "EXERCISE_HISTORY_REGISTER_SUCCESS";
export const EXERCISE_HISTORY_REGISTER_FAILURE =
  "EXERCISE_HISTORY_REGISTER_FAILURE";

const SET_EXERCISE_TYPE = "SET_EXERCISE_TYPE";
export const setExerciseType = (state) => ({
  type: SET_EXERCISE_TYPE,
  state,
});

const SET_EXERCISE_SET = "SET_EXERCISE_SET";
export const setExerciseSet = (state) => ({
  type: SET_EXERCISE_SET,
  state,
});

const SET_EXERCISE_TIME = "SET_EXERCISE_TIME";
export const setExerciseTime = (state) => ({
  type: SET_EXERCISE_TIME,
  state,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case EXERCISE_HISTORY_FINDALL_REQUEST:
        break;
      case EXERCISE_HISTORY_FINDALL_SUCCESS:
        draft.exerciseHistoryList = [];
        action.data.data.forEach((exercise) => {
          draft.exerciseHistoryList.push({
            name: exercise.exerciseName,
            count: exercise.exerciseCount,
            date: exercise.exerciseDate.substr(0, 10),
          });
        });
        draft.exerciseDateList.clear();
        draft.exerciseTypeList.clear();
        for (let i = 0; i < draft.exerciseHistoryList.length; i++) {
          let cnt = draft.exerciseDateList.check(
            draft.exerciseHistoryList[i].date
          );
          draft.exerciseDateList.put(
            draft.exerciseHistoryList[i].date,
            cnt + 1
          );
          if (cnt == 0) {
            draft.exerciseTypeList.put(draft.exerciseHistoryList[i].date, [
              {
                name: draft.exerciseHistoryList[i].name,
                count: draft.exerciseHistoryList[i].count,
              },
            ]);
          } else {
            draft.exerciseTypeList.push(draft.exerciseHistoryList[i].date, {
              name: draft.exerciseHistoryList[i].name,
              count: draft.exerciseHistoryList[i].count,
            });
          }
        }
        break;
      case EXERCISE_HISTORY_FINDALL_FAILURE:
        break;
      case EXERCISE_HISTORY_REGISTER_REQUEST:
        break;
      case EXERCISE_HISTORY_REGISTER_SUCCESS:
        break;
      case EXERCISE_HISTORY_REGISTER_FAILURE:
        break;
      case SET_EXERCISE_TYPE:
        draft.exercise.type = action.state;
        break;
      case SET_EXERCISE_SET:
        draft.exercise.set = action.state;
        break;
      case SET_EXERCISE_TIME:
        draft.exercise.time = action.state;
        break;
      default:
        break;
    }
  });
export default reducer;
