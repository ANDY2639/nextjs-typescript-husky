import { z } from "zod";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const UserStateSchema = z.object({
  scope: z.string(),
  preferred_username: z.string(),
  name: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
});

export type UserState = z.infer<typeof UserStateSchema> & { isLoggedIn?: boolean };

const initialState: UserState = {
  scope: "",
  preferred_username: "",
  name: "",
  given_name: "",
  family_name: "",
  email: "",
  email_verified: false,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<UserState>) => {
      state.scope = action.payload.scope;
      state.preferred_username = action.payload.preferred_username;
      state.name = action.payload.name;
      state.given_name = action.payload.given_name;
      state.family_name = action.payload.family_name;
      state.email = action.payload.email;
      state.email_verified = action.payload.email_verified;
      state.isLoggedIn = true;
    },
    endSession: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { startSession, endSession } = userSlice.actions;
export default userSlice.reducer;
