
import { createSlice } from "@reduxjs/toolkit";

// User Slice
const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        byId: 0,
    },
    reducers: {
        // getById
        setByid: (state, action) => {
            let id = action.payload;
            state.byId = id

        }
    }
})

const notificationsReducer = notificationsSlice.reducer
export default notificationsReducer
