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
};

export const EXERCISE_HISTORY_FINDALL_REQUEST =
  "EXERCISE_HISTORY_FINDALL_REQUEST";
export const EXERCISE_HISTORY_FINDALL_SUCCESS =
  "EXERCISE_HISTORY_FINDALL_SUCCESS";
export const EXERCISE_HISTORY_FINDALL_FAILURE =
  "EXERCISE_HISTORY_FINDALL_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case EXERCISE_HISTORY_FINDALL_REQUEST:
        break;
      case EXERCISE_HISTORY_FINDALL_SUCCESS:
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
      default:
        break;
    }
  });
export default reducer;
