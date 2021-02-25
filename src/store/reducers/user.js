import { SET_USER } from '../actions/user';

const initialState = {
    user: undefined
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.email };
        default:
            return state;
    }
}

export default userReducer;