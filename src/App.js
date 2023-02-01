import "./App.css"
import List from "./components/List"
// import { useContext } from "react"
import { useGlobalContext } from "./CartContext"
// import { useState } from "react"
// import { useEffect } from "react"
function App() {
  const { amount, cart, loading } = useGlobalContext()

  if (loading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <>
        <div className="nav">
          <div className="title">
            <h3>UseReducer</h3>
            <div className="cart">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z" />
              </svg>
              <p className="total-amount">{amount}</p>
            </div>
          </div>
        </div>
        <div className="section">
          <h2>YOUR BAG</h2>
          {cart.length > 0 ? (
            <List />
          ) : (
            <p className="content">is currently empty</p>
          )}
        </div>
      </>
    )
  }
}

export default App
