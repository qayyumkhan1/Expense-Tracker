import { useContext } from 'react';
import { GlobalContext } from '../contextapi/GlobalContext';
import './incomeexpense.css';

function IncomeExpense() {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((t) => t.amount);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  return (
    <div className="income-expense">
      <div className="stat-card stat-card--income">
        <p className="stat-card__label">Income</p>
        <p className="stat-card__value">${income}</p>
      </div>
      <div className="stat-card stat-card--expense">
        <p className="stat-card__label">Expense</p>
        <p className="stat-card__value">${expense}</p>
      </div>
    </div>
  );
}

export default IncomeExpense;
