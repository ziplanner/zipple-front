"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  createAuthStore,
  createUserInfoStore,
  AuthStore,
  UserInfoStore,
} from "../stores/userStore";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;
export type UserInfoStoreApi = ReturnType<typeof createUserInfoStore>;

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined
);
export const UserInfoStoreContext = createContext<UserInfoStoreApi | undefined>(
  undefined
);

export interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const authStoreRef = useRef<AuthStoreApi | null>(null);
  const userInfoStoreRef = useRef<UserInfoStoreApi | null>(null);

  if (!authStoreRef.current) {
    authStoreRef.current = createAuthStore();
  }

  if (!userInfoStoreRef.current) {
    userInfoStoreRef.current = createUserInfoStore();
  }

  return (
    <AuthStoreContext.Provider value={authStoreRef.current}>
      <UserInfoStoreContext.Provider value={userInfoStoreRef.current}>
        {children}
      </UserInfoStoreContext.Provider>
    </AuthStoreContext.Provider>
  );
};

// ✅ 인증 정보(AuthStore) 가져오는 Hook
export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const StoreContext = useContext(AuthStoreContext);
  if (!StoreContext) {
    throw new Error(`useAuthStore must be used within UserStoreProvider`);
  }
  return useStore(StoreContext, selector);
};

// ✅ 사용자 정보(UserInfoStore) 가져오는 Hook
export const useUserInfoStore = <T,>(
  selector: (store: UserInfoStore) => T
): T => {
  const StoreContext = useContext(UserInfoStoreContext);
  if (!StoreContext) {
    throw new Error(`useUserInfoStore must be used within UserStoreProvider`);
  }
  return useStore(StoreContext, selector);
};
