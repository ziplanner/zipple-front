import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type UserState = {
  accessToken: string;
  isRegistered: boolean;
};

export type UserActions = {
  signIn: (accessToken: string, isRegistered: boolean) => void;
  signOut: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  accessToken: "",
  isRegistered: false,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          signIn: (accessToken, isRegistered) =>
            set(() => ({
              accessToken,
              isRegistered,
            })),
          signOut: () => set(() => defaultInitState),
        }),
        {
          name: "user-storage",
        }
      )
    )
  );
};
