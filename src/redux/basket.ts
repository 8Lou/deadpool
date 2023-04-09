import { AddedItems, Card } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type BasketStateType = {
  addedItems: AddedItems[];
  totalPrice: number;
};
const initialState: BasketStateType = {
  addedItems: [],
  totalPrice: 0,
};

export const counterSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Card>) => {
      const findItem = state.addedItems.find((item) => item.id === action.payload.id);
      if (findItem) findItem.count++;
      else state.addedItems.push({ ...action.payload, count: 1 });
      state.totalPrice = state.addedItems.reduce((acc, item) => acc + item.age * item.count, 0);
    },
    minusItem: (state, action: PayloadAction<AddedItems>) => {
      const findItem = state.addedItems.find((item) => item.id === action.payload.id);
      if (findItem) {
        if (findItem.count - 1 === 0) {
          state.addedItems = state.addedItems.filter((el) => el.id !== findItem.id);
        } else {
          findItem.count--;
        }
      }
      state.totalPrice = state.addedItems.reduce((acc, item) => acc + item.age * item.count, 0);
    },
    getAddedItems: (state, action: PayloadAction<AddedItems[]>) => {
      state.addedItems = action.payload;
    },
  },
});

export const { addItem, minusItem, getAddedItems } = counterSlice.actions;
export default counterSlice.reducer;
