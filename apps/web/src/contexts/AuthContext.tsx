// apps/web/src/contexts/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";
import type { AuthUser, Role, UserType } from "@/types";

/* ---------------------------------- */
/* Auth State                         */
/* ---------------------------------- */

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  hydrated: boolean;
}

/* ---------------------------------- */
/* Reducer                            */
/* ---------------------------------- */

type Action =
  | { type: "INIT_START" }
  | { type: "INIT_SUCCESS"; payload: AuthUser }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  user: null,
  loading: true,
  hydrated: false,
};

function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case "INIT_START":
      return { ...state, loading: true };

    case "INIT_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        hydrated: true,
      };

    case "LOGOUT":
      return {
        user: null,
        loading: false,
        hydrated: true,
      };

    default:
      return state;
  }
}

/* ---------------------------------- */
/* Context                            */
/* ---------------------------------- */

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;

  // Authority
  hasRole: (roles: Role[]) => boolean;
  isAdmin: boolean;

  // Entitlement
  hasSubscription: (types: UserType[]) => boolean;
  isPaidUser: boolean;

  login: (token: string, userData: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/* ---------------------------------- */
/* Provider                           */
/* ---------------------------------- */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Initial auth hydration (runs only once on mount)
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      // Check for tokens
      const userToken = Cookies.get("token");
      const adminToken = Cookies.get("access_token");

      if (!userToken && !adminToken) {
        if (isMounted) {
          dispatch({ type: "LOGOUT" });
        }
        return;
      }

      try {
        let userData: AuthUser | null = null;

        // Try admin endpoint first if admin token exists
        if (adminToken) {
          try {
            const res = await api.get("/api/auth/admin/me", {
              headers: { Authorization: `Bearer ${adminToken}` },
            });
            userData = res.data;
          } catch (err) {
            console.error("Admin auth failed, trying user auth:", err);
            Cookies.remove("access_token");
          }
        }

        // Try user endpoint if admin failed or no admin token
        if (!userData && userToken) {
          try {
            const res = await api.get("/api/auth/me", {
              headers: { Authorization: `Bearer ${userToken}` },
            });
            userData = {
              ...res.data.user,
              role: res.data.user.role || "USER",
            };
          } catch (err) {
            console.error("User auth failed:", err);
            Cookies.remove("token");
          }
        }

        if (isMounted) {
          if (userData) {
            dispatch({ type: "INIT_SUCCESS", payload: userData });
          } else {
            dispatch({ type: "LOGOUT" });
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        if (isMounted) {
          Cookies.remove("token");
          Cookies.remove("access_token");
          dispatch({ type: "LOGOUT" });
        }
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - runs only once

  const login = useCallback((token: string, userData: AuthUser) => {
    // Set appropriate cookie based on role
    if (["SUPER_ADMIN", "ADMIN", "MODERATOR"].includes(userData.role)) {
      Cookies.set("access_token", token, { expires: 1 });
    } else {
      Cookies.set("token", token, { expires: 7 });
    }
    dispatch({ type: "INIT_SUCCESS", payload: userData });
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("token");
    Cookies.remove("access_token");
    dispatch({ type: "LOGOUT" });
  }, []);

  /* ---------------------------------- */
  /* Derived Capabilities               */
  /* ---------------------------------- */

  const value = useMemo<AuthContextValue>(() => {
    const user = state.user;
    const role = user?.role || "USER";

    return {
      ...state,
      isAuthenticated: !!user,

      // Authority
      hasRole: (roles) => !!user && roles.includes(role),
      isAdmin: !!user && ["SUPER_ADMIN", "ADMIN", "MODERATOR"].includes(role),

      // Entitlement
      hasSubscription: (types) => !!user && types.includes(user.userType),
      isPaidUser: !!user && user.userType !== "FREE",

      login,
      logout,
    };
  }, [state, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ---------------------------------- */
/* Hook                               */
/* ---------------------------------- */

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};  

// // // apps/web/src/contexts/AuthContext."use client";
// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useReducer,
//   ReactNode,
//   useMemo,
// } from "react";
// import Cookies from "js-cookie";
// import api from "@/lib/api";
// import type { AuthUser, Role, UserType } from "@/types";

// /* ---------------------------------- */
// /* Auth State                          */
// /* ---------------------------------- */

// interface AuthState {
//   user: AuthUser | null;
//   loading: boolean;
//   hydrated: boolean;
// }

// /* ---------------------------------- */
// /* Reducer                             */
// /* ---------------------------------- */

// type Action =
//   | { type: "INIT_START" }
//   | { type: "INIT_SUCCESS"; payload: AuthUser }
//   | { type: "LOGOUT" };

// const initialState: AuthState = {
//   user: null,
//   loading: true,
//   hydrated: false,
// };

// function reducer(state: AuthState, action: Action): AuthState {
//   switch (action.type) {
//     case "INIT_START":
//       return { ...state, loading: true };

//     case "INIT_SUCCESS":
//       return {
//         user: action.payload,
//         loading: false,
//         hydrated: true,
//       };

//     case "LOGOUT":
//       return {
//         user: null,
//         loading: false,
//         hydrated: true,
//       };

//     default:
//       return state;
//   }
// }

// /* ---------------------------------- */
// /* Context                             */
// /* ---------------------------------- */

// interface AuthContextValue extends AuthState {
//   isAuthenticated: boolean;

//   // Authority
//   hasRole: (roles: Role[]) => boolean;
//   isAdmin: boolean;

//   // Entitlement
//   hasSubscription: (types: UserType[]) => boolean;
//   isPaidUser: boolean;

//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextValue | null>(null);

// /* ---------------------------------- */
// /* Provider                            */
// /* ---------------------------------- */

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   // Initial auth hydration (SSR-safe)
//   useEffect(() => {
//     const token = Cookies.get("auth_token");
//     if (!token) {
//       dispatch({ type: "LOGOUT" });
//       return;
//     }

//     const init = async () => {
//       try {
//         const res = await api.get("/api/auth/me");
//         dispatch({ type: "INIT_SUCCESS", payload: res.data.user });
//       } catch {
//         Cookies.remove("auth_token");
//         dispatch({ type: "LOGOUT" });
//       }
//     };

//     init();
//   }, []);

//   const logout = () => {
//     Cookies.remove("auth_token");
//     dispatch({ type: "LOGOUT" });
//   };

//   /* ---------------------------------- */
//   /* Derived Capabilities (important)   */
//   /* ---------------------------------- */

//   const value = useMemo<AuthContextValue>(() => {
//     const user = state.user;

//     return {
//       ...state,
//       isAuthenticated: !!user,

//       // Authority
//       hasRole: (roles) => !!user && roles.includes(user.role),
//       isAdmin: !!user && ["SUPER_ADMIN", "ADMIN", "MODERATOR"].includes(user.role),

//       // Entitlement
//       hasSubscription: (types) => !!user && types.includes(user.userType),
//       isPaidUser: !!user && user.userType !== "FREE",

//       logout,
//     };
//   }, [state]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// /* ---------------------------------- */
// /* Hook                                */
// /* ---------------------------------- */

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return ctx;
// };
