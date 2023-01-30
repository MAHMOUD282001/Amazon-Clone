export let getBasketTotal = (basket)=>(
    basket.reduce((amount, item)=>{
        return amount + item.price
    },0)
)

export const initialState = {
    basket: [],
    user: null
}

function AppReducer(state = initialState, action) {
  switch(action.type) {
    case "SET_USER":
        return{
            ...state,
            user : action.user
        }
    
    case "ADD_TO_BASKET":
        return{
            ...state,
            basket : [...state.basket, action.item]
        }
    
    case "REMOVE_FROM_BASKET":
        let index = state.basket.findIndex(basketItem => basketItem.id === action.id)
        
        let newBasket = [...state.basket]
        
        if(index >= 0){
            newBasket.splice(index, 1)
        }
        
        else{
            console.warn(`Can't Remove This Item ${action.id}`)
        }
        
        return{
            ...state,
            basket : newBasket
        }
    
    case "EMPTY_BASKET":
        return{
            ...state,
            basket : []
        }
    
    default:
        return state
  }
}

export default AppReducer