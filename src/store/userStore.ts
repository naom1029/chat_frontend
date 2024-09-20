import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";

interface UserState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>(
  (set: (partial: Partial<UserState>) => void) => ({
    user: null,
    loading: true,
    setUser: (user: User | null) => set({ user }),
    setLoading: (loading: boolean) => set({ loading }),
  })
);

export const initializeUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  useUserStore.getState().setUser(session?.user || null);
  useUserStore.getState().setLoading(false);
};
