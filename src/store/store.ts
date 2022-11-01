import { configureStore } from '@reduxjs/toolkit'
import {Action} from "redux";
import { ThunkAction } from 'redux-thunk';
import { loadState } from './browserStorage';
import customersList from "./customersList/customersList-slice";

const preloadedState = loadState();


export const store = configureStore({
    reducer: {
        customersList: customersList,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    preloadedState,
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
