import { createContext } from "react";
import type { User } from "./model/model.ts";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

// Context con valore iniziale nullo
export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}
});