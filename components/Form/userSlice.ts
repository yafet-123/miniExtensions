import { createSlice } from "@reduxjs/toolkit";


interface userState {
  user?: string,
  classes?: {
        name: string;
        students: string[];
    }[];
}

const initialState: userState = {
    user: undefined,
    classes: undefined,
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
          state.user = action.payload;
        },
        logout:(state) =>{
            state.user = null
        },
        setClasses(state, action: PayloadAction<Types.State["classes"]>) {
            state.classes = action.payload;
        },
    },
});

export const { login, setClasses, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectClass = (state) => state.user.classes;

export default userSlice.reducer;