export interface CustomersList {
    id?: string;
    created?: string;
    clients: string;
    since: string;
    total_earnings: string;
    available_credit: string;
    status: string;
    additional?: {
        main_contact: {
            first_name: string;
            last_name: string;
        };
        notes: string;
    }
}


export interface CustomersListHeaders {
    title: string;
    id: string
}
