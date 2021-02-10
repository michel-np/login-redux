import { User } from "./user";

interface UserWidget {
    id: number;
    user_id: number;
    active: number;
    widget_id: number;
    analytic: number;
    key: string;
}

interface Pagination {
    page_count: number;
    current_page: number;
    has_next_page: boolean;
    has_prev_page: boolean;
    count: number;
    limit: number | null;
}

export interface UserWidgets {
    data: UserWidget[];
    pagination: Pagination;
}