import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  connectedUser: undefined,
  selectedUser: {},
  isEmojiPickerShown: false,
  messages: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeConnectedUser(state, actions) {
      state.connectedUser = actions.payload;
    },
    changeSelecteduser(state, actions) {
      state.selectedUser = actions.payload;
    },
    closeEmojiPicker(state) {
      state.isEmojiPickerShown = false;
    },
    toggleEmojiPicker(state) {
      state.isEmojiPickerShown = !state.isEmojiPickerShown;
    },
    updateMessages(state, actions) {
      state.messages = actions.payload;
    },
  },
});

const store = configureStore({
  reducer: userSlice.reducer,
});
export default store;
export const userActions = userSlice.actions;
