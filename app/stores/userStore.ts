import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type AuthState = {
  accessToken: string;
  isRegistered: boolean;
};

export type AuthActions = {
  signIn: (accessToken: string, isRegistered: boolean) => void;
  signOut: () => void;
};

export type AuthStore = AuthState & AuthActions;

export type UserInfo = {
  roleName: string;
  nickname: string;
};

export type UserInfoState = {
  userInfo: UserInfo | null;
};

export type UserInfoActions = {
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
};

export type UserInfoStore = UserInfoState & UserInfoActions;

export const defaultAuthState: AuthState = {
  accessToken: "",
  isRegistered: false,
};

export const defaultUserInfoState: UserInfoState = {
  userInfo: null,
};

export const createAuthStore = (initState: AuthState = defaultAuthState) => {
  return createStore<AuthStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          signIn: (accessToken, isRegistered) =>
            set(() => ({
              accessToken,
              isRegistered,
            })),
          signOut: () => set(() => defaultAuthState),
        }),
        {
          name: "authStorage",
        }
      )
    )
  );
};

export const createUserInfoStore = (
  initState: UserInfoState = defaultUserInfoState
) => {
  return createStore<UserInfoStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          setUserInfo: (userInfo) => set(() => ({ userInfo })),
          clearUserInfo: () => set(() => defaultUserInfoState),
        }),
        {
          name: "userInfoStorage",
        }
      )
    )
  );
};
