import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value:{
        nickname: "",
        email: "",
        useType: "user",    // user host admin
    },

    // isFetching: false,
    // isSuccess: false,
    // isError: false,
    // errorMessage: "",
  },
  reducers: {
    login: (state, action) => {
        state.value = action.payload
    }
},
  extraReducers: {
    // Extra reducer comes here
  },
})

export default userSlice.reducer;