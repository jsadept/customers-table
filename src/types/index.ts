export interface CustomersList {
    id?: string;
    created?: string | Date;
    since: string | Date;
    client: string;
    total_earnings: string | number;
    available_credit: string | number;
    status?: string;
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
