import { configureStore, ThunkDispatch, AnyAction, combineReducers } from '@reduxjs/toolkit';
import {
  EqualityFn,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase
} from 'react-redux';
import profile from 'src/redux/slices/profileSlice';
import chat from 'src/redux/slices/chat/chatSlice';

const combinedReducers = combineReducers({ profile, chat });

export const store = configureStore({
  reducer: combinedReducers
});

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useDispatch = () => useDispatchBase<TypedDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: EqualityFn<TSelected>
): TSelected => useSelectorBase<RootState, TSelected>(selector);
