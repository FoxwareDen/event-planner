import { create } from "zustand";
import { redirect } from "@tanstack/react-router";
import { db } from "./db";

export async function login(redirectTo?: string): Promise<boolean> {
  try {
    // @ts-ignore
    const { data, error } = await db.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email",
        redirectTo: redirectTo || location.href
      }
    });

    if (error) throw error;

    setAuthSession({
      privilege: "user",
    });

    return true;
  } catch (error) {
    console.error(`{error}`);
    return false;
  }
}

export type PermType = "user" | "admin" | "moderator";

export async function checkAuthtozition(privilege: PermType) {
  const { user } = getAuthSession();

  if (!user) {
    return redirect({
      href: "/login",
      search: {
        redirect: location.href,
      },
    });
  }

  if (privilege != user.privilege) {
    return redirect({
      href: "/unauthorized",
    });
  }
}

export interface UserSession {
  privilege: PermType;
}

export interface AuthSession {
  user: UserSession | null;
  isAuthenticated: boolean;
}

export interface AuthSessionActions {
  setSession: (session: UserSession) => void;
  clearSession: () => void;
}

type boop = AuthSession & AuthSessionActions;

export const useAuthSession = create<boop>()((set) => ({
  user: null,
  isAuthenticated: false,

  setSession: (session) =>
    set(() => ({
      user: session,
      isAuthenticated: true,
    })),

  clearSession: () =>
    set(() => ({
      user: null,
      isAuthenticated: false,
    })),
}));

export function setAuthSession(session: UserSession) {
  useAuthSession.setState({
    user: {
      privilege: session.privilege
    },
    isAuthenticated: true
  });
}

export function getAuthSession() {
  return useAuthSession.getState(); // NOT a hook
}
