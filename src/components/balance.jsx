import { useContext } from 'react';
import { GlobalContext } from '../contextapi/GlobalContext';
import './balance.css';

function Balance() {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((t) => t.amount);
  const totalNum = amounts.reduce((acc, item) => acc + item, 0);
  const total = totalNum.toFixed(2);
  const isNegative = totalNum < 0;

  return (
    <section className="balance-card card" aria-label="Current balance">
      <p className="balance-card__label">Your balance</p>
      <h2
        className={`balance-card__amount${isNegative ? ' balance-card__amount--negative' : ''}`}
      >
        ${total}
      </h2>
    </section>
  );
}

export default Balance;
