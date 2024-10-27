import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext  = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case "ADD":
            console.log("Adding item:", action);
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];


        case "REMOVE":
            // Use filter instead of splice to create a new array without modifying the original array
            return state.filter((_, index) => index !== action.index);

        case "UPDATE":
            let arr = [...state];
            arr.find((food, index) => {
                if (food.id === action.id) {
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price };
                }
                return arr;
            });
            return arr;

        case "DROP":
            return [];

        default:
            console.log("Error in Reducer");
            return state;
    }
};


export const CartProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(reducer, []);
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);