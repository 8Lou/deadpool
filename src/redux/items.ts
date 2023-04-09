import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, FilterType } from '../types/types';
import { addCard, deleteCard, getAllCards } from '../api/api';

type CardInitialStateType = {
  items: Card[];
  isLoading: boolean;
  error: string | null;
  filteredItems: Card[];
};
type SearchItemsType = {
  search: string;
  title: string;
};
const initialState: CardInitialStateType = {
  items: [],
  isLoading: false,
  error: null,
  filteredItems: [],
};

export const getAllItems = createAsyncThunk<Card[], void, {}>('getAllCards', async () => {
  try {
    const response = await getAllCards();
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
});
export const deleteItems = createAsyncThunk('deleteItem', async (id: number) => {
  try {
    const response = await deleteCard(id);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
});
export const addItems = createAsyncThunk('addItem', async (item: Card) => {
  try {
    const response = await addCard(item);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
});
export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    filterByCatalogName(state, action: PayloadAction<FilterType>) {
      switch (action.payload) {
        case 'DC':
          state.filteredItems = state.items.filter((el: Card) =>
            el.name.startsWith(action.payload),
          );
          break;
        case 'Deadpool':
          state.filteredItems = state.items.filter((el: Card) =>
            el.name.startsWith(action.payload),
          );
          break;
        case 'Marvel':
          state.filteredItems = state.items.filter((el: Card) =>
            el.name.startsWith(action.payload),
          );
          break;
        case 'X-MEN':
          state.filteredItems = state.items.filter((el: Card) =>
            el.name.startsWith(action.payload),
          );
          break;
        case 'Spider-Man':
          state.filteredItems = state.items.filter((el: Card) =>
            el.name.startsWith(action.payload),
          );
          break;
        case 'By price':
          state.filteredItems.sort((a, b) => a.age - b.age);
          break;
        case 'By rating':
          state.filteredItems.sort((a, b) => b.rate - a.rate);
          break;
        default:
          state.filteredItems = state.items;
      }
    },
    searchItems(state, action: PayloadAction<SearchItemsType>) {
      state.filteredItems = state.items.filter((el) =>
        action.payload.title !== 'ALL'
          ? el.name.startsWith(action.payload.title) && el.name.includes(action.payload.search)
          : el.name.includes(action.payload.search),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllItems.fulfilled, (state, action: PayloadAction<Card[]>) => {
        state.isLoading = false;
        state.items = action.payload;
        state.filteredItems = state.items;
      })
      .addCase(getAllItems.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') state.error = action.payload;
        else console.log(action.payload);
      })
      .addCase(deleteItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteItems.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.items = state.items.filter((el) => el.id === action.payload);
        state.filteredItems = state.items;
      })
      .addCase(deleteItems.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') state.error = action.payload;
        else console.log(action.payload);
      });
    // .addCase(addItems.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(addItems.fulfilled, (state, action: PayloadAction<Card>) => {
    //   state.isLoading = false;
    //   state.items.push(action.payload);
    //   state.filteredItems = state.items;
    // })
    // .addCase(addItems.rejected, (state, action: PayloadAction<unknown>) => {
    //   state.isLoading = false;
    //   if (typeof action.payload === 'string') state.error = action.payload;
    //   else console.log(action.payload);
    // });
  },
});
export const { filterByCatalogName, searchItems } = itemsSlice.actions;
export default itemsSlice.reducer;
