
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CustomersList, CustomersListHeaders} from "../../types";

// constant should be put in a different file, or it can be fetched from the api
const HEADERS = [
    {title: 'Client', id: "client"},
    {title: 'Since', id: "since"},
    {title: 'Total Earnings', id: "total_earnings"},
    {title: 'Available Credit', id: "available_credit"},
    {title: 'Status', id: "status"},
]

const LIST = [{"id":"e433e597-ab6f-fd44-30ab-6c22153a5964","created":"2022-11-02T10:53:32.502Z","status":"Active","client":"ACS","total_earnings":"$0.00","available_credit":"$200.00","since":"2020-08-14T09:53:03.000Z","additional":{"main_contact":{"first_name":"Win ","last_name":"Butler"},"notes":"Aliquet faucibus sapien, nunc aliquet et, nunc eu massa. Vitae sed faucibus aliquam id sed scelerisque."}},{"id":"fe612059-9dfa-c840-7bff-e53c70261ebc","created":"2022-11-02T10:54:04.742Z","status":"Active","client":"Arcade Fire","total_earnings":"$0.00","available_credit":"$100.00","since":"2022-07-05T09:53:42.000Z","additional":{"main_contact":{"first_name":"Tomasda","last_name":"Carrysda"},"notes":"Aliquet faucibus sapien, nunc aliquet et, nunc eu massa. Vitae sed faucibus aliquam id sed scelerisque."}}]

export interface CustomersListState {
    defaultList: CustomersList[];
    sortedList: CustomersList[];
    sortKey: string;
    order: string;
    headers: CustomersListHeaders[];
}

export const initialState: CustomersListState = {
    defaultList: LIST,
    sortedList: [],
    sortKey: '',
    order: "desc",
    headers: HEADERS,
}


export const customersList = createSlice({
    name: 'customersList',
    initialState,
    reducers:{
        sortListByQuery(state, action: PayloadAction<string>) {

            const query = action.payload;
            const sortedList = state.defaultList.filter((item) => {
                if (item.client.toUpperCase().includes(query.toUpperCase()) ) {
                    return item;
                }
                return false;
            })

            state.sortedList = sortedList;

        },
        sortListByColumn(state, action: PayloadAction<string>) {

            const sortByKey = (key: string) => (a: any, b: any) => a[key] > b[key] ? 1 : -1
            let sorted;

            const list = state.sortedList.length !== 0 ? state.sortedList : state.defaultList;


            if(!action.payload){
                sorted = state.defaultList

                state.sortKey = '';
                state.order = "desc";
            }
            else{
                if(action.payload === state.sortKey) {
                    state.order = state.order === "desc" ? "asc" : "desc";
                }
                else{
                    state.order = "desc";
                }

                sorted = list.slice().sort(sortByKey(action.payload ))
                state.sortKey = action.payload;
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
            console.log(action.payload)
            state.defaultList.forEach((item) => {
                if(item.id === action.payload) item.status = item.status === 'Active' ? 'Archived' : 'Active';
            });
            state.sortedList.forEach((item) => {
                if(item.id === action.payload) item.status = item.status === 'Active' ? 'Archived' : 'Active';

            });

        },

    }

})


export const { sortListByQuery, sortListByColumn, removeItem, addItem, changeStatus } = customersList.actions;
export default customersList.reducer;
