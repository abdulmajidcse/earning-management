import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    mobile: string;
    is_admin: boolean;
    is_active: boolean;
    email_verified_at: string;
    current_transactions_sum_amount: number;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export interface Paginate {
    current_page: number;
    from?: number;
    last_page: number;
    links: [{ active: boolean; label: string; url?: string }];
    next_page_url?: string;
    prev_page_url?: string;
    to?: number;
    total: number;
}

export interface PaginatedData<T> extends Paginate {
    data: T[];
    first_page_url: string;
    last_page_url: string;
    path: string;
    per_page: number;
}

export interface Transaction extends User {
    id: number;
    user_id: number;
    user: User;
    sent_from_email: string;
    amount: number;
    sent_at: string;
    is_paid: number;
    is_count: number;
    paid_at?: string;
    created_at: string;
    updated_at: string;
}
