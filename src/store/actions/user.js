export const setUser = (user) => {
    return { type: 'SET_USER', email: user };
};

export const setPickedTime = (PickedTime) => {
    return { type: 'Set_Picked_Time', time: PickedTime };
};