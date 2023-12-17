// Importing modules and components from React and React Native libraries
import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { MyAuthContext } from "../types";

// Create the AuthContext
const AuthContext = React.createContext<MyAuthContext | null>(null);

// This hook can be used to access the users information
export function useSession(): any {
  const value = React.useContext(AuthContext);
  // Throw an error if the hook is not used within the SessionProvider
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    // Pass the signIn, signOut, session, and isLoading values to the context
    <AuthContext.Provider
      value={{
        signIn: (token) => {
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
