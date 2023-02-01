import { useEffect } from "react"
import { createContext, useState, useReducer, useContext } from "react"
import cartItem from "./components/Data"
import reducer from "./reducer"

// const defaultValue = {
//   totalAmount: 4,
//   items: Data,
//   totalPrice: 2199.96,
// }

// const CartContext = createContext(defaultValue)

// const AppProvider = (props) => {
//   const reducer = (state, action) => {
//     if (action.type === "ADD") {
//       let updatedItems

//       const existingItemIndex = state.items.findIndex(
//         (item) => item.id === action.item.id
//       )
//       const existingItem = state.items[existingItemIndex]
//       if (existingItemIndex >= 0) {
//         const updatedItem = { ...existingItem, amount: existingItem.amount + 1 }
//         updatedItems = [...state.items]
//         updatedItems[existingItemIndex] = updatedItem
//       }

//       return {
//         totalAmount: state.totalAmount + 1,
//         totalPrice: state.totalPrice + action.item.price,
//         items: updatedItems,
//       }
//     } else if (action.type === "REMOVE") {
//       let updatedItems
//       // const existingItem = state.items.filter((item) => item.id === action.id)
//       const existingItemIndex = state.items.findIndex(
//         (item) => item.id === action.id
//       )
//       const existingItem = state.items[existingItemIndex]
//       if (existingItem.amount === 1) {
//         updatedItems = state.items.filter((item) => item.id !== action.id)
//       } else {
//         const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
//         updatedItems = [...state.items]
//         updatedItems[existingItemIndex] = updatedItem
//       }

//       return {
//         totalAmount: state.totalAmount - 1,
//         totalPrice: state.totalPrice - existingItem.price,
//         items: updatedItems,
//       }
//     }
//   }

//   const [state, dispatchCart] = useReducer(reducer, defaultValue)
//   const addItemHandler = (item) => {
//     dispatchCart({ type: "ADD", item: item })
//   }
//   const removeItemHandler = (id) => {
//     dispatchCart({ type: "REMOVE", id: id })
//   }

const initialValue = {
  total: 0,
  cart: [],
  amount: 0,
  loading: false,
}
const url = "https://course-api.com/react-useReducer-cart-project"
const CartContext = createContext(initialValue)

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialValue)
  const clearCartHandler = () => {
    dispatch({ type: "CLEAR_CART" })
  }
  const removeHandler = (id) => {
    dispatch({ type: "REMOVE", payload: id })
  }

  const increaseHandler = (id) => {
    dispatch({ type: "INCREASE", payload: id })
  }
  const decreaseHandler = (id) => {
    dispatch({ type: "DECREASE", payload: id })
  }

  const fetchData = async () => {
    dispatch({ type: "LOADING" })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: "DISPLAY_ITEMS", payload: cart })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    dispatch({ type: "TOTAL" })
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{
        ...state,
        clearCartHandler,
        removeHandler,
        increaseHandler,
        decreaseHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(CartContext)
}

export { CartContext, CartProvider }
