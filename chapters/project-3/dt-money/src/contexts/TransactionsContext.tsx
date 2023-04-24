import { ReactNode, useEffect, useState, useCallback } from 'react';
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (input: CreateTransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType,
);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    });
    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(
    async ({ category, description, price, type }: CreateTransactionInput) => {
      const response = await api.post('/transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date().toISOString(),
      });

      setTransactions((state) => [response.data, ...state]);
    },
    [],
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
