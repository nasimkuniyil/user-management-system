import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isLoggedIn: !!localStorage.getItem("token"),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            console.log("yellloo")
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isLoggedIn = true;

            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("refreshToken", action.payload.refreshToken);

        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isLoggedIn = false;
            
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
        },
        refreshToken(state, action) {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        }
    }
})

export const { login, logout, refreshToken } = authSlice.actions;
export default authSlice.reducer;