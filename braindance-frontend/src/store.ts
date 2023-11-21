import { configureStore, createSlice } from '@reduxjs/toolkit'

interface user {
    userUid: string;
    userIdToken: string;
    userProfileImage: string;
}

let user = createSlice({
    name: "user",
    initialState: {
        userUid: "",
        userIdToken: "",
        userProfileImage: ""
    } as user,
    reducers: {
        setUserUid(state, action){
            state.userUid = action.payload;
        },
        setUserToken(state, action){
            state.userIdToken = action.payload;
        },
        setProfileImage(state, action){
            state.userProfileImage = action.payload;
        }
    }
})

export let { setUserUid, setUserToken, setProfileImage } = user.actions;

const store = configureStore({
  reducer: {
    user: user.reducer
  }
});
export type RootState = ReturnType<typeof store.getState>

export default store;