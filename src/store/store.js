import { createStore } from 'redux';

// Action types
const TOGGLE_REQUEST_ACCOUNT = 'TOGGLE_REQUEST_ACCOUNT';

// Action creators
export const toggleRequestAccount = () => ({
  type: TOGGLE_REQUEST_ACCOUNT,
});

// Initial state
const initialState = {
  showRequestAccount: true,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_REQUEST_ACCOUNT:
      return {
        ...state,
        showRequestAccount: !state.showRequestAccount,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

export default store;
