const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] }
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    }
  }
  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
      }
      return cartItem
    })
    return { ...state, cart: tempCart }
  }

  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem
      })
      .filter((item) => item.amount !== 0)
    return { ...state, cart: tempCart }
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true }
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false }
  }
  if (action.type === "TOTAL") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { amount, price } = cartItem
        const itemTotalPrice = price * amount
        cartTotal.total += itemTotalPrice
        cartTotal.amount += amount
        return cartTotal
      },
      { total: 0, amount: 0 }
    )
    total = total.toFixed(2)

    return { ...state, total, amount }
  }

  return state
}

export default reducer
