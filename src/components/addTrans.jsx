import { useState, useContext } from 'react';

import { GlobalContext } from '../contextapi/GlobalContext';

import { CATEGORIES } from '../contextapi/categories';

import './addTrans.css';



function AddTrans() {

  const [text, setText] = useState('');

  const [amount, setAmount] = useState('');

  const [category, setCategory] = useState(CATEGORIES[0]);

  const { addTransaction } = useContext(GlobalContext);



  function onSubmit(e) {

    e.preventDefault();

    const parsed = parseFloat(amount);

    if (!text.trim() || Number.isNaN(parsed) || parsed === 0) {

      return;

    }

    addTransaction({

      id: crypto.randomUUID(),

      text: text.trim(),

      amount: parsed,

      category,

    });

    setText('');

    setAmount('');

    setCategory(CATEGORIES[0]);

  }



  return (

    <section className="add-transaction card" aria-labelledby="add-transaction-heading">

      <h2 id="add-transaction-heading" className="section-title">

        Add transaction

      </h2>

      <form onSubmit={onSubmit}>

        <div className="form-control">

          <label htmlFor="text">Description</label>

          <input

            id="text"

            type="text"

            value={text}

            onChange={(e) => setText(e.target.value)}

            placeholder="Salary, groceries, rent…"

          />

        </div>

        <div className="form-control">

          <label htmlFor="category">Category</label>

          <select

            id="category"

            value={category}

            onChange={(e) => setCategory(e.target.value)}

          >

            {CATEGORIES.map((cat) => (

              <option key={cat} value={cat}>

                {cat}

              </option>

            ))}

          </select>

        </div>

        <div className="form-control">

          <label htmlFor="amount">Amount</label>

          <span className="form-hint">

            Use a positive number for income, negative for expense

          </span>

          <input

            id="amount"

            type="number"

            step="any"

            value={amount}

            onChange={(e) => setAmount(e.target.value)}

            placeholder="e.g. 500 or -45.99"

          />

        </div>

        <button type="submit" className="btn">

          Add transaction

        </button>

      </form>

    </section>

  );

}



export default AddTrans;

