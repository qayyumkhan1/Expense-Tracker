import Header from './components/header.jsx'
import './App.css'
import Balance from './components/balance.jsx'
import IncomeExpense from './components/incomeExpense.jsx'
import TransactionList from './components/transList.jsx'
import AddTransaction from './components/addTrans.jsx'
import { GlobalProvider } from "./contextapi/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <div className="app">
        <div className="app-container">
          <Header />
          <main className="app-main">
            <Balance />
            <IncomeExpense />
            <TransactionList />
            <AddTransaction />
          </main>
        </div>
      </div>
    </GlobalProvider>
  )
}

export default App
