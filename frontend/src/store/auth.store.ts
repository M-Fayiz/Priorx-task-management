import { create } from "zustand"
import  AuthService  from "../service/auth.service"

export type User = {
  _id: string
  email: string
  name: string
}

type AuthState = {
  user: User | null
  status: "checking" | "authenticated" | "guest"

  checkAuth: () => Promise<void>
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "checking",

  checkAuth: async () => {
    try {
      const user = await AuthService.authME()
      
      set({ user, status: "authenticated" })
    } catch {
      set({ user: null, status: "guest" })
    }
  },

  clearAuth: () => {
    set({ user: null, status: "guest" })
  }
}))
