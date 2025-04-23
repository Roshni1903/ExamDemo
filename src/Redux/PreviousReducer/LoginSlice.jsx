import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  login: {
    data: {
      email: "",
      password: "",
      change: "",
    },
    error: {
      email: "",
      password: "",
    },
  },
  register: {
    data: {
      name: "",
      email: "",
      password: "",
      role: "",
    },

    error: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  },
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // updateData: (state, action) => {
    //   state.data = {
    //     ...state.data,
    //     [action.payload.name]: action.payload.value,
    //   };
    // updateData: (state, action) => {
    //   state = {
    //     ...state,
    //     [action.payload.type]: {
    //       ...state?.[action.payload.type],
    //       data: {
    //         ...state?.[action.payload.type]?.data,
    //         ...action?.payload?.data,
    //       },
    //     },
    //   };
    // },
    updateData: (state, action) => {
      state[action.payload.type].data = {
        ...state?.[action.payload.type].data,
        ...action.payload.data,
      };
    },
    setError: (state, action) => {
      state[action.payload.type].error = {
        ...state?.[action.payload.type].error,
        ...action.payload.error,
      };
    },

    clearData: (state) => {
      state[action.payload.type].data = {
        email: "",
        password: "",
      };
    },
  },
});
export const { updateData, setError, clearData } = LoginSlice.actions;
export default LoginSlice.reducer;
