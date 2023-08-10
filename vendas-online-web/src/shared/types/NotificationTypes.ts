export type Notification = 'success' | 'info' | 'warning' | 'error';

export interface NotificationType {
    message: string;
    type: Notification;
    description?: string;
}