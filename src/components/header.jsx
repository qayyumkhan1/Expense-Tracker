import './header.css'

const Header = () => {
  return (
    <header className="app-header">
      <span className="app-header__badge">Personal finance</span>
      <h1 className="app-header__title">Expense Tracker</h1>
      <p className="app-header__subtitle">Track income, spending, and balance at a glance</p>
    </header>
  )
}

export default Header
