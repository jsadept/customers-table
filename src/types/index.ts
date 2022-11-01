export interface CustomersList {
    id: string;
    created: Date;
    clients: string;
    since: Date;
    total_earnings: string;
    available_credit: string;
    status: string;
    additional: {
        main_contact: {
            first_name: string;
            last_name: string;
        };
        notes: string;
    }
}


