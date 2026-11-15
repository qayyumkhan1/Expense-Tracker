import { useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import { GlobalContext } from './GlobalContext';

const initialState = {
  transactions: [],
};

function loadInitialState() {
  const stored = localStorage.getItem('transactions');
  if (stored) {
    try {
      const transactions = JSON.parse(stored);
      if (Array.isArray(transactions)) {
        return { transactions };
      }
    } catch {
      /* ignore invalid stored data */
    }
  }
  return {
    transactions: [
      { id: 1, text: 'hlh', amount: -20 },
      { id: 2, text: 'Salary', amount: 300 },
      { id: 3, text: 'Book', amount: -10 },
      { id: 4, text: 'pen', amount: -10 },
      { id: 5, text: 'Camera', amount: 150 },
    ],
  };
}

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState, loadInitialState);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  function deleteTransaction(id) {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  }

  function addTransaction(transaction) {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  }

  function updateTransaction(transaction) {
    dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        updateTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
