export const SET_USER = 'SET_USER';
export const Set_Picked_Time = 'Set_Picked_Time';

export const setUser = (user) => {
    return { type: SET_USER, email: user };
};
// using redux thunk, i could return function. "middleware"
export const setPickedTime = (PickedTime) => {

    return async dispatch => {
        // async code 
        const response = await fetch('https://stuff-assignment-ae9ab-default-rtdb.firebaseio.com/meeting.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PickedTime,
            })
        });

        const resData = await response.json();
        //TODO u could save meeting id to global state. (resData.name)
        dispatch({ type: Set_Picked_Time, time: PickedTime })
    }
};