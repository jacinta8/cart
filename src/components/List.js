// import Data from "./Data"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import "./List.css"

import { useGlobalContext } from "../CartContext"
const List = () => {
  const {
    total,
    cart,
    clearCartHandler,
    removeHandler,
    increaseHandler,
    decreaseHandler,
  } = useGlobalContext()
  // const updatedTotalPrice = totalPrice.toFixed(2)
  return (
    <>
      <ul className="list">
        {cart.map((phone) => {
          const { id, title, price, img, amount } = phone

          return (
            <li className="phone-info" key={id}>
              <img src={img} alt={title} />
              <div className="info-container">
                <h4>{title}</h4>
                <h4 className="price">${price}</h4>
                <button
                  className="remove-btn"
                  onClick={() => {
                    removeHandler(id)
                  }}
                >
                  remove
                </button>
              </div>
              <div className="quantity">
                {/* increase amount */}
                <FaAngleUp
                  type="button"
                  className="amount-btn"
                  onClick={() => {
                    increaseHandler(id)
                  }}
                />
                {/* amount */}
                <p>{amount}</p>
                {/* decrease amount */}
                <FaAngleDown
                  type="button"
                  className="amount-btn"
                  onClick={() => decreaseHandler(id)}
                />
              </div>
            </li>
          )
        })}
      </ul>
      <div className="underline"></div>
      <div className="total">
        <h4>Total</h4>
        <h4>${total}</h4>
      </div>
      <div className="clear">
        <button className="btn clear-btn" onClick={clearCartHandler}>
          CLEAR CART
        </button>
      </div>
    </>
  )
}

export default List
