import { createSlice } from "@reduxjs/toolkit";
import { sumPrice, sumQuntity } from "../../helpers/sumItems";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
        state.total = sumPrice(state.selectedItems);
        state.itemsCounter = sumQuntity(state.selectedItems);
        state.checkout = false;
      }
    },
    removeItem: (state, action) => {
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.selectedItems = newSelectedItems;
      state.total = sumPrice(state.selectedItems);
      state.itemsCounter = sumQuntity(state.selectedItems);
      state.checkout = false;
    },
    increase: (state, action) => {
      const increaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[increaseIndex].quantity++;
      state.total = sumPrice(state.selectedItems);
      state.itemsCounter = sumQuntity(state.selectedItems);
      state.checkout = false;
    },
    decrease: (state, action) => {
      const decreaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[decreaseIndex].quantity--;
      state.total = sumPrice(state.selectedItems);
      state.itemsCounter = sumQuntity(state.selectedItems);
      state.checkout = false;
    },
    checkout: (state) => {
      state.selectedItems = [];
      state.checkout = true;
      state.total = 0;
      state.itemsCounter = 0;
    },
  },
});

export default cartSlice.reducer;
export const { increase, decrease, addItem, removeItem, checkout } =
  cartSlice.actions;
