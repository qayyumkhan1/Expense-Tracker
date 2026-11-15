import { useContext, useState } from 'react';

import { GlobalContext } from '../contextapi/GlobalContext';

import { CATEGORIES } from '../contextapi/categories';

import './transList.css';



function TransList() {

  const { transactions, deleteTransaction, updateTransaction } =

    useContext(GlobalContext);

  const [editingId, setEditingId] = useState(null);

  const [editText, setEditText] = useState('');

  const [editAmount, setEditAmount] = useState('');

  const [editCategory, setEditCategory] = useState(CATEGORIES[0]);



  function startEdit(transaction) {

    setEditingId(transaction.id);

    setEditText(transaction.text);

    setEditAmount(String(transaction.amount));

    setEditCategory(transaction.category || CATEGORIES[CATEGORIES.length - 1]);

  }



  function cancelEdit() {

    setEditingId(null);

    setEditText('');

    setEditAmount('');

  }



  function saveEdit(id) {

    const parsed = parseFloat(editAmount);

    if (!editText.trim() || Number.isNaN(parsed) || parsed === 0) {

      return;

    }

    updateTransaction({

      id,

      text: editText.trim(),

      amount: parsed,

      category: editCategory,

    });

    cancelEdit();

  }



  return (

    <section className="history-section card" aria-labelledby="history-heading">

      <h2 id="history-heading" className="section-title">

        Transaction history

      </h2>



      {transactions.length === 0 ? (

        <p className="list-empty" role="status">

          <span className="list-empty__title">No transactions yet</span>

          Add your first income or expense below to see it here.

        </p>

      ) : (

        <ul className="list">

          {transactions.map((transaction) => {

            const isEditing = editingId === transaction.id;

            const sign = transaction.amount < 0 ? '-' : '+';

            const displayAmount = Math.abs(transaction.amount).toFixed(2);



            if (isEditing) {

              return (

                <li key={transaction.id} className="edit-row">

                  <input

                    type="text"

                    value={editText}

                    onChange={(e) => setEditText(e.target.value)}

                    aria-label="Edit description"

                  />

                  <input

                    type="number"

                    step="any"

                    value={editAmount}

                    onChange={(e) => setEditAmount(e.target.value)}

                    aria-label="Edit amount"

                  />

                  <select

                    value={editCategory}

                    onChange={(e) => setEditCategory(e.target.value)}

                    aria-label="Edit category"

                  >

                    {CATEGORIES.map((cat) => (

                      <option key={cat} value={cat}>

                        {cat}

                      </option>

                    ))}

                  </select>

                  <button type="button" onClick={() => saveEdit(transaction.id)}>

                    Save

                  </button>

                  <button type="button" onClick={cancelEdit}>

                    Cancel

                  </button>

                </li>

              );

            }



            return (

              <li

                key={transaction.id}

                className={transaction.amount < 0 ? 'minus' : 'plus'}

              >

                <div className="list-item__main">

                  <span className="list-item__text">{transaction.text}</span>

                  {transaction.category ? (

                    <span className="category-badge">{transaction.category}</span>

                  ) : null}

                </div>

                <p className="list-item__actions">

                  <span className="amount">

                    {sign}${displayAmount}

                  </span>

                  <button

                    type="button"

                    className="action-btn"

                    onClick={() => startEdit(transaction)}

                    aria-label={`Edit ${transaction.text}`}

                  >

                    Edit

                  </button>

                  <button

                    type="button"

                    className="delete-btn"

                    onClick={() => deleteTransaction(transaction.id)}

                    aria-label={`Delete ${transaction.text}`}

                  >

                    Delete

                  </button>

                </p>

              </li>

            );

          })}

        </ul>

      )}

    </section>

  );

}



export default TransList;

