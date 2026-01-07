export enum AdminEventName {
  // =========================Product CRUD Event=========================
  PRODUCT_CREATED = 'PRODUCT.CREATED',
  PRODUCT_UPDATED = 'PRODUCT.UPDATED',
  PRODUCT_DELETED = 'PRODUCT.DELETED',
  PRODUCT_STOCK_UPDATED = 'PRODUCT.STOCK_UPDATED',

  // =========================Notification Event=========================
  NOTIFICATION_SENT = 'NOTIFICATION.SENT',
  NOTIFICATION_FAILED = 'NOTIFICATION.FAILED',
}
