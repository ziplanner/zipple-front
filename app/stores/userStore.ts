import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type UserInfo = {
  roleName: string;
  nickname: string;
  profileUrl: string;
  userId: string;
};

export type AuthState = {
  accessToken: string;
  refreshToken: string;
  isRegistered: boolean;
  userInfo: UserInfo | null;
};

export type AuthActions = {
  signIn: (
    accessToken: string,
    refreshToken: string,
    isRegistered: boolean,
    userInfo: UserInfo
  ) => void;
  signOut: () => void;
  setUserData: (userData: UserInfo) => void;
  setAccessToken: (accessToken: string) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultAuthState: AuthState = {
  accessToken: "",
  refreshToken: "",
  isRegistered: false,
  userInfo: null,
};

export const authStore = createStore<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...defaultAuthState,
        signIn: (accessToken, refreshToken, isRegistered, userInfo) =>
          set(() => ({
            accessToken,
            refreshToken,
            isRegistered,
            userInfo,
          })),
        signOut: () =>
          set(() => ({
            ...defaultAuthState,
          })),
        setUserData: (userData) =>
          set(() => ({
            userInfo: userData,
          })),
        setAccessToken: (accessToken) =>
          set((state) => ({
            ...state,
            accessToken,
          })),
      }),
      {
        name: "authStorage",
      }
    )
  )
);

// UserInfo 관련 Store
export type UserInfoState = {
  userInfo: UserInfo | null;
};

export type UserInfoActions = {
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
};

export type UserInfoStore = UserInfoState & UserInfoActions;

export const defaultUserInfoState: UserInfoState = {
  userInfo: null,
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
