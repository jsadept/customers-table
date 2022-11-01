import {RootState} from "../store";
import {CustomersListState} from "./customersList-slice";
import {CustomersList} from "../../types";


export const selectCustomersListState = (state: RootState): CustomersListState => state.customersList;
export const selectDefaultList = (state: RootState): CustomersList[] => selectCustomersListState(state).defaultList;
export const selectSortedList = (state: RootState): CustomersList[] => selectCustomersListState(state).sortedList;
export const selectSortKey = (state: RootState): string => selectCustomersListState(state).sortKey;
export const selectOrder = (state: RootState): string => selectCustomersListState(state).order;
