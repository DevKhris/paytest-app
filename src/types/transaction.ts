export interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  counterpartyId: string;
  description: string;
  timestamp: number;
}
