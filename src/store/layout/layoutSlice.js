import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    layout: 'auth-layout',
}
export const layoutSlice = createSlice({
    name: 'layoutSlice',
    initialState,
    reducers: {
        setLayout: (state, action) => {
            state.layout = action.payload
        },
    }
})
export const { setLayout } = layoutSlice.actions
export default layoutSlice.reducer