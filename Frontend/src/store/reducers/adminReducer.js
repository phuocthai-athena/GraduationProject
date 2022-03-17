import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
};

const adminReducer = (state = initialState, action) => {
  let copyState
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      }

    case actionTypes.FETCH_GENDER_SUCCESS:
      copyState = { ...state };
      copyState.genders = action.data;
      copyState.isLoadingGender = false;

      return {
        ...copyState,
      }

    case actionTypes.FETCH_GENDER_FAILDED:
      copyState = { ...state };
      copyState.isLoadingGender = false;
      copyState.genders = [];
      return {
        ...copyState,
      }

    case actionTypes.FETCH_POSITION_SUCCESS:
      copyState = { ...state };
      copyState.positions = action.data;

      return {
        ...copyState,
      }

    case actionTypes.FETCH_POSITION_FAILDED:
      copyState = { ...state };
      copyState.positions = [];
      return {
        ...copyState,
      }

    case actionTypes.FETCH_ROLE_SUCCESS:
      copyState = { ...state };
      copyState.roles = action.data;

      return {
        ...copyState,
      }

    case actionTypes.FETCH_ROLE_FAILDED:
      copyState = { ...state };
      copyState.roles = [];
      return {
        ...copyState,
      }
    case actionTypes.FETCH_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      }
    case actionTypes.FETCH_USERS_FAILDED:
      state.users = [];
      return {
        ...state,
      }

    default:
      return state;
  }
};

export default adminReducer;
