import { create } from 'zustand';
import * as api from '@/lib/api';

const AUTH_STORAGE_KEY = 'paytest_auth';

interface AuthState {
  token: string | null;
  user: api.AuthUser | null;
  isLoading: boolean;
  error: string | null;

  validateRoomCode: (roomCode: string) => Promise<boolean>;
  register: (name: string, password: string, roomCode: string) => Promise<void>;
  login: (userId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  loadFromStorage: () => void;
}

function saveAuth(token: string, user: api.AuthUser) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }));
  document.cookie = `paytest_auth=${token}; path=/; max-age=86400; SameSite=Lax`;
}

function clearAuthStorage() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  document.cookie = 'paytest_auth=; path=/; max-age=0';
}

function loadAuth(): { token: string; user: api.AuthUser } | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isLoading: false,
  error: null,

  loadFromStorage: () => {
    const stored = loadAuth();
    if (stored) {
      set({ token: stored.token, user: stored.user });
    }
  },

  validateRoomCode: async (roomCode) => {
    set({ isLoading: true, error: null });
    try {
      await api.validateRoomCode(roomCode);
      set({ isLoading: false });
      return true;
    } catch (err) {
      const apiErr = err as api.ApiError;
      set({ isLoading: false, error: apiErr.message });
      throw err;
    }
  },

  register: async (name, password, roomCode) => {
    set({ isLoading: true, error: null });
    try {
      const result = await api.register(name, password, roomCode);
      saveAuth(result.token.access_token, result.user);
      set({ token: result.token.access_token, user: result.user, isLoading: false });
    } catch (err) {
      const apiErr = err as api.ApiError;
      set({ isLoading: false, error: apiErr.message });
      throw err;
    }
  },

  login: async (userId, password) => {
    set({ isLoading: true, error: null });
    try {
      const result = await api.login(userId, password);
      saveAuth(result.token.access_token, result.user);
      set({ token: result.token.access_token, user: result.user, isLoading: false });
    } catch (err) {
      const apiErr = err as api.ApiError;
      set({ isLoading: false, error: apiErr.message });
      throw err;
    }
  },

  logout: async () => {
    const { token } = get();
    if (token) {
      try {
        await api.logout(token);
      } catch {
        // ignore
      }
    }
    clearAuthStorage();
    set({ token: null, user: null, error: null });
  },

  clearError: () => set({ error: null }),
}));
