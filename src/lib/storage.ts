import type { User } from '@/types/user';

const STORAGE_KEYS = {
  USER: 'paytest_user',
  USER_DATA: (id: string) => `paytest_user_${id}`,
  TRANSACTIONS: (id: string) => `paytest_transactions_${id}`,
} as const;

export function generateId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 12 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

function getRandomBalance(): number {
  return Math.floor(Math.random() * 9000) + 1000;
}

export function createUser(id: string): User {
  const user: User = {
    id,
    balance: getRandomBalance(),
    createdAt: Date.now(),
  };
  localStorage.setItem(STORAGE_KEYS.USER_DATA(id), JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.USER, id);
  return user;
}

export function getUser(id: string): User | null {
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA(id));
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}

export function getCurrentUserId(): string | null {
  return localStorage.getItem(STORAGE_KEYS.USER);
}

export function saveUser(user: User): void {
  localStorage.setItem(STORAGE_KEYS.USER_DATA(user.id), JSON.stringify(user));
}

export function clearUser(): void {
  const userId = getCurrentUserId();
  if (userId) {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA(userId));
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS(userId));
  }
  localStorage.removeItem(STORAGE_KEYS.USER);
}

export function getOrCreateUser(): User {
  const existingId = getCurrentUserId();
  if (existingId) {
    const existingUser = getUser(existingId);
    if (existingUser) {
      return existingUser;
    }
  }

  const newId = generateId();
  return createUser(newId);
}
