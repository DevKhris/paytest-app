const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export interface ApiError {
  status: number;
  message: string;
}

async function apiFetch<T>(
  path: string,
  options: {
    method?: string;
    token?: string;
    body?: unknown;
  } = {}
): Promise<T> {
  const { method = 'GET', token, body } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw {
      status: res.status,
      message: data.error || data.message || `HTTP ${res.status}`,
    } as ApiError;
  }

  return data as T;
}

// ── Auth ──

export interface AuthUser {
  userId: string;
  name: string;
}

export interface RegisterResult {
  message: string;
  user: AuthUser;
  token: { access_token: string; token_type: string; expires_in: number };
}

export interface LoginResult {
  message: string;
  user: AuthUser;
  token: { access_token: string; token_type: string; expires_in: number };
}

export function validateRoomCode(roomCode: string): Promise<{ message: string; room_code: string }> {
  return apiFetch('/auth/room-code', { method: 'POST', body: { room_code: roomCode } });
}

export function register(name: string, password: string, roomCode: string): Promise<RegisterResult> {
  return apiFetch('/auth/register', { method: 'POST', body: { name, password, room_code: roomCode } });
}

export function login(userId: string, password: string): Promise<LoginResult> {
  return apiFetch('/auth/login', { method: 'POST', body: { userId, password } });
}

export function logout(token: string): Promise<{ message: string }> {
  return apiFetch('/auth/logout', { method: 'POST', token });
}

// ── Accounts ──

export interface BalanceResult {
  balance: string;
  currency: string;
}

export function getBalance(token: string): Promise<BalanceResult> {
  return apiFetch('/accounts/balance', { token });
}

// ── Transactions ──

export interface TransactionItem {
  id: string;
  account_id: string;
  type: string;
  amount: string;
  idempotency_key: string;
  related_user_id: string | null;
  description: string | null;
  created_at: string;
}

export interface TransactionsResult {
  transactions: TransactionItem[];
  total: number;
  page: number;
  per_page: number;
}

export function getTransactions(
  token: string,
  page = 1,
  perPage = 20
): Promise<TransactionsResult> {
  return apiFetch(`/transactions?page=${page}&per_page=${perPage}`, { token });
}

export interface TransferResult {
  transaction_id: string;
  amount: string;
  toUserId: string;
  sender_balance_after: string;
  recipient_balance_after: string;
  status: string;
}

export function transfer(
  token: string,
  params: {
    toUserId: string;
    amount: number;
    idempotency_key: string;
    description?: string;
  }
): Promise<TransferResult> {
  return apiFetch('/transactions/transfer', { method: 'POST', token, body: params });
}

// ── Contacts ──

export interface ContactItem {
  id: string;
  owner_id: string;
  contact_user_id: string;
  contact: { id: string; name: string };
  created_at: string;
}

export interface ContactsResult {
  contacts: ContactItem[];
  total: number;
}

export function getContacts(token: string): Promise<ContactsResult> {
  return apiFetch('/contacts', { token });
}

export function addContact(
  token: string,
  contactUserId: string
): Promise<ContactItem> {
  return apiFetch('/contacts', { method: 'POST', token, body: { contactUserId } });
}

export function removeContact(
  token: string,
  contactId: string
): Promise<{ message: string }> {
  return apiFetch(`/contacts/${contactId}`, { method: 'DELETE', token });
}
