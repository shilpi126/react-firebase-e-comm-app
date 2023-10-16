export function getItemCount (cartItems){

    return cartItems.reduce((count,cartItems) => cartItems.quantity+count,0 )
    
}

export  function getSubTotal(cartItem){
    return cartItem.reduce((sum, {product, quantity}) =>product.price * quantity + sum,0)
}


