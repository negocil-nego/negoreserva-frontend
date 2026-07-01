export interface NotificationResponse {
    uuid: string;
    type: NotificationType;
    message: string;
    ready: boolean;
    createdAt: string;
}

export enum NotificationType {
    NONE = "NONE",
    SEND_MESSAGE = "SEND_MESSAGE",
}

export interface NotificationPaginate {
    content: NotificationResponse[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface NotificationFilterRequest {
    ready?: boolean | null;
    search?: string | null;
    pageNumber?: number | null;
    pageSize?: number | null;
}

export const EMPTY_NOTIFICATION_PAGINATE: NotificationPaginate = {
    content: [],
    empty: true,
    first: true,
    last: true,
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
};
