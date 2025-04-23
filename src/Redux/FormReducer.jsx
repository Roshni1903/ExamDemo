import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  login: {
    data: {
      email: "",
      password: "",
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

const FormReducer = createSlice({
  name: "formReducer",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state[action.payload.type].data = {
        ...state?.[action.payload.type].data,
        [action.payload.name]: action.payload.value,
      };
    },
    setError: (state, action) => {
      state[action.payload.type].error = {
        ...state?.[action.payload.type].error,
        ...action.payload.error,
      };
    },

    clearData: (state, action) => {
      state[action.payload.type].data = {
        name: "",
        email: "",
        password: "",
        role: "",
      };
    },
  },
});
export const { updateData, setError, clearData } = FormReducer.actions;
export default FormReducer.reducer;
