import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type AuthState = {
  accessToken: string;
  refreshToken: string;
  isRegistered: boolean;
};

export type AuthActions = {
  signIn: (
    accessToken: string,
    refreshToken: string,
    isRegistered: boolean
  ) => void;
  signOut: () => void;
};

export type AuthStore = AuthState & AuthActions;

export type UserInfo = {
  roleName: string;
  nickname: string;
  profileUrl: string;
  userId: string;
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
  refreshToken: "",
  isRegistered: false,
};

export const defaultUserInfoState: UserInfoState = {
  userInfo: null,
};

export const authStore = createStore<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        accessToken: "",
        refreshToken: "",
        isRegistered: false,
        signIn: (accessToken, refreshToken, isRegistered) =>
          set(() => ({
            accessToken,
            refreshToken,
            isRegistered,
          })),
        signOut: () =>
          set(() => ({
            accessToken: "",
            refreshToken: "",
            isRegistered: false,
          })),
      }),
      {
        name: "authStorage",
      }
    )
  )
);

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
