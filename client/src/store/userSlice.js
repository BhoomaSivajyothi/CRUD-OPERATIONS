import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: null,
  email: null,
  userData: [],
  editUsername: null,
  editUseremail: null,
  activUserid: null,
};


export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    Getname(state, action) {
      state.name = action.payload;
    },
    Getemail(state, action) {
      state.email = action.payload;
    },
    GetuserData(state, action) {
      state.userData = action.payload;
    },
    GeteditUsername(state, action) {
      state.editUsername = action.payload;
    },
    GeteditUseremail(state, action) {
      state.editUseremail = action.payload;
    },
    UpdateActiveuserid(state, action) {
      state.activUserid = action.payload;
    },
  },
});
export const {
  Getname,
  Getemail,
  GetuserData,
  GeteditUsername,
  GeteditUseremail,
  UpdateActiveuserid,
} = userSlice.actions;
export default userSlice.reducer;
