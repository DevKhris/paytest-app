import { create } from 'zustand';
import * as api from '@/lib/api';

interface AccountState {
  balance: number | null;
  transactions: api.TransactionItem[];
  contacts: api.ContactItem[];
  isLoadingBalance: boolean;
  isLoadingTransactions: boolean;
  isLoadingContacts: boolean;
  isSending: boolean;
  error: string | null;

  fetchBalance: (token: string) => Promise<void>;
  fetchTransactions: (token: string) => Promise<void>;
  fetchContacts: (token: string) => Promise<void>;
  sendTransfer: (
    token: string,
    params: { toUserId: string; amount: number; idempotency_key: string; description?: string }
  ) => Promise<void>;
  addContact: (token: string, contactUserId: string) => Promise<void>;
  removeContact: (token: string, contactId: string) => Promise<void>;
  reset: () => void;
}

export const useAccountStore = create<AccountState>((set, get) => ({
  balance: null,
  transactions: [],
  contacts: [],
  isLoadingBalance: false,
  isLoadingTransactions: false,
  isLoadingContacts: false,
  isSending: false,
  error: null,

  fetchBalance: async (token) => {
    set({ isLoadingBalance: true, error: null });
    try {
      const result = await api.getBalance(token);
      set({ balance: parseFloat(result.balance), isLoadingBalance: false });
    } catch (err) {
      const apiErr = err as api.ApiError;
      set({ isLoadingBalance: false, error: apiErr.message });
    }
  },

  fetchTransactions: async (token) => {
    set({ isLoadingTransactions: true, error: null });
    try {
      const result = await api.getTransactions(token);
      set({ transactions: result.transactions, isLoadingTransactions: false });
    } catch (err) {
      const apiErr = err as api.ApiError;
      set({ isLoadingTransactions: false, error: apiErr.message });
    }
  },

  fetchContacts: async (token) => {
    set({ isLoadingContacts: true, error: null });
    try {
      const result = await api.getContacts(token);
      set({ contacts: result.contacts, isLoadingContacts: false });
    } catch (err) {
      const apiErr = err as api.ApiError;
      set({ isLoadingContacts: false, error: apiErr.message });
    }
  },

  sendTransfer: async (token, params) => {
    set({ isSending: true, error: null });
    try {
      const result = await api.transfer(token, params);
      set({ balance: parseFloat(result.sender_balance_after), isSending: false });
      await get().fetchTransactions(token);
    } catch (err) {
      const apiErr = err as api.ApiError;
      set({ isSending: false, error: apiErr.message });
      throw err;
    }
  },

  addContact: async (token, contactUserId) => {
    set({ error: null });
    try {
      await api.addContact(token, contactUserId);
      await get().fetchContacts(token);
    } catch (err) {
      const apiErr = err as api.ApiError;
      set({ error: apiErr.message });
      throw err;
    }
  },

  removeContact: async (token, contactId) => {
    set({ error: null });
    try {
      await api.removeContact(token, contactId);
      set({ contacts: get().contacts.filter((c) => c.contact_user_id !== contactId) });
    } catch (err) {
      const apiErr = err as api.ApiError;
      set({ error: apiErr.message });
      throw err;
    }
  },

  reset: () =>
    set({
      balance: null,
      transactions: [],
      contacts: [],
      isLoadingBalance: false,
      isLoadingTransactions: false,
      isLoadingContacts: false,
      isSending: false,
      error: null,
    }),
}));
