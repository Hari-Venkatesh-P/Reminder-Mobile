import { FETCH_REMAINDERS,DELETE_REMAINDER,UPDATE_REMAINDER} from "./constants";
 
const initialState = {
  remainders : []
};

export const fetchRemaindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REMAINDERS:{
        console.log("In FETCH_REMAINDERS fetchRemaindersReducer")
      return { ...state, remainders: action.payload};
    }
    case DELETE_REMAINDER:{
        console.log("In DELETE_REMAINDER fetchRemaindersReducer")
        return { ...state, remainders: state.remainders.filter(remainder => remainder._id !== action.payload)};
    }
    default:
      return state;
  }
};