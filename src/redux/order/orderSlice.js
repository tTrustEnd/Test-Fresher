import create from '@ant-design/icons/lib/components/IconFont';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// carts = [
//     {
//         quantity: số lượng mua,
//         detail: { book },
//         id: book._id
//     }]
const initialState = {
    carts: [],
    cartsHistory: [],
    term:''
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//     'counter/fetchCount',
//     async (amount) => {
//         const response = await fetchCount(amount);
//         // The value we return becomes the `fulfilled` action payload
//         return response.data;
//     }
// );

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        doOrder: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            let carts = state.carts;
            const item = action.payload;
            let is = carts.findIndex(c => c._id === item._id);
            if (is > -1) {
                carts[is].quantity += item.quantity
            }
            else {
                carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail })
            }
            state.carts = carts;
        },
    
        doPlusOrder: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            let carts = state.carts;
            let item = action.payload;
            let is = carts.findIndex(c => c._id === item.key);
            if (is > -1) {
                carts[is].quantity += 1
            }
            // let is = carts.findIndex(c => {c._id === item._id});
            // if (is > -1) {
            //     carts[is].quantity = carts[is].quantity + item.quantity
            // } else {
            //     carts.push({ quantity: item.quantity, _id: item.id, detail: item.detail })
            // }
            state.carts = carts;

        },
        doMinusOrder: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            let carts = state.carts;
            let item = action.payload;
            let is = carts.findIndex(c => c._id === item.key);
            if (is > -1) {
                if (carts[is].quantity > 0) {
                    carts[is].quantity -= 1
                }

            }
            state.carts = carts;

        },
        doDeleteItem: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            let carts = state.carts;
            let item = action.payload;
            // let is = carts.findIndex( c => c._id === item.key)
            const newcarts = carts.filter(c => c._id !== item.key)

            state.carts = newcarts;

        },
        doBuyItem: (state, action) => {
            let cart = state.carts;
            let cartH = state.cartsHistory;
            const item = action.payload;
            let res = item.map(item => {
                let is = cart.findIndex(c => c._id === item.key)
                const arr1 = cart.slice(0, is);
                const arr2 = cart.slice(is + 1, cart.length)
                cart = arr1.concat(arr2)
            })
            if(cartH.length==0){
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;
                state.carts = cart;
                let x = item.map(item => {
                    return {...item,dateTime}
                });
                
                state.cartsHistory = x;
            }
            if(cartH.length > 0){
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;
                state.carts = cart;
                let x = item.map(item => {
                    return {...item,dateTime}
                   
                });
              state.cartsHistory=state.cartsHistory.concat(x)
              
            }
              
                
                state.carts = cart;
        },
        doReturnOrder: (state,action) =>{
            let cartH = state.cartsHistory;
            let item = action.payload;
            let x = cartH.filter(u => u.key != item.id)
            state.cartsHistory = x;
        },
        doSearchItem: (state,action) =>{
           state.term = action.payload
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
});

export const { doOrder, doPlusOrder, doMinusOrder, doDeleteItem, doBuyItem,doReturnOrder,doSearchItem } = orderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
        dispatch(incrementByAmount(amount));
    }
};

export default orderSlice.reducer;
