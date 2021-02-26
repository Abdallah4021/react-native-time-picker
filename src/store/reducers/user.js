import { Set_Picked_Time, SET_USER } from "../actions/user";

const initialState = {
    user: null,
    timePicked: null
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { user: action.email };
        case Set_Picked_Time:
            return { ...state, timePicked: action.time };
        default:
            return state;
    }
}

export default userReducer;