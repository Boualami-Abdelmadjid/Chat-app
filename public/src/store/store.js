import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  connectedUser: undefined,
  selectedUser: {},
  isEmojiPickerShown: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeSelecteduser(state, payload) {
      state.selectedUser = payload.payload;
    },
    closeEmojiPicker(state) {
      state.isEmojiPickerShown = false;
    },
    toggleEmojiPicker(state) {
      state.isEmojiPickerShown = !state.isEmojiPickerShown;
    },
  },
});

const store = configureStore({
  reducer: userSlice.reducer,
});
export default store;
export const userActions = userSlice.actions;
