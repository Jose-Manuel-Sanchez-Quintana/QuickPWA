import { current, createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, actions) => {
            // console.log(actions.payload.uid)
            state.value += 1;
            // return {...state, data: actions.payload.uid};
        },
        logout: (state, actions) => {
            // state.id = null
        },
        printInfo: (state, actions) => {
            console.log(state)
        }
    }
});

export const { setUserData, logout, printInfo } = userSlice.actions;
// export const { selecUser } = (state) => state.data;
// export const {select_user} = (state) => {};
export default userSlice.reducer;