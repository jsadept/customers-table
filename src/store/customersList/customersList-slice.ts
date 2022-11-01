
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CustomersList} from "../../types";


export interface CustomersListState {
    defaultList: CustomersList[];
    sortedList: CustomersList[];
    sortKey: string,
    order: string,
}

export const initialState: CustomersListState = {
    defaultList: [],
    sortedList: [],
    sortKey: '',
    order: "desc",
}


export const customersList = createSlice({
    name: 'customersList',
    initialState,
    reducers:{
        sortListByQuery(state, action: PayloadAction<string>) {

            const query = action.payload;

            const defaultList = state.defaultList.filter((item) => {
                if (item.clients.toUpperCase().includes(query.toUpperCase()) ) {
                    return item;
                }
                return false;
            })

            const sortedList = state.sortedList.filter((item) => {
                if (item.clients.toUpperCase().includes(query.toUpperCase()) ) {
                    return item;
                }
                return false;
            })

            state.defaultList = defaultList;
            state.sortedList = sortedList;

        },
        sortListByColumn(state, action: PayloadAction<string>) {

            const sortByKey = (key: string) => (a: any, b: any) => a[key] > b[key] ? 1 : -1

            let sorted = state.defaultList.slice().sort(sortByKey(action.payload || state.sortKey))

            if(action.payload) state.sortKey = action.payload;

            if(action.payload === state.sortKey) {
                state.order = state.order === "desc" ? "asc" : "desc";
            }
            if(action.payload !== state.sortKey && !!state.sortKey) {
                state.order = "desc"
            }

            state.sortedList = state.order === "desc" ? sorted : sorted.reverse();

        },
        addItem(state, action: PayloadAction<any>){

            state.defaultList.push(action.payload)
            state.sortedList.push(action.payload)

        },
        removeItem(state, action: PayloadAction<string>){

            const filtered = state.defaultList.filter((item) => item.id !== action.payload);
            const filteredAndSorted = state.sortedList.filter((item) => item.id !== action.payload);

            state.defaultList = filtered;
            state.sortedList = filteredAndSorted;

        },
        changeStatus(state, action: PayloadAction<string>){

            state.defaultList.forEach((item) => {
                if(item.id === action.payload) item.status = item.status === 'active' ? 'archived' : 'active';
            });
            state.sortedList.forEach((item) => item.id === action.payload);

        },

    }

})


export const { sortListByQuery, sortListByColumn, removeItem, addItem, changeStatus } = customersList.actions;
export default customersList.reducer;
