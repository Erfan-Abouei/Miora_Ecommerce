export enum EventName {
  // =========================User Events=========================
  USER_CREATED = 'USER.CREATED',
  USER_UPDATED = 'USER.UPDATED',
  USER_DELETED = 'USER.DELETED',
  USER_LOGIN = 'USER.LOGIN',
  USER_LOGOUT = 'USER.LOGOUT',
  USER_PASSWORD_RESET = 'USER.PASSWORD_RESET',

  // =========================Order Events=========================
  ORDER_CREATED = 'ORDER.CREATED',
  ORDER_UPDATED = 'ORDER.UPDATED',
  ORDER_DELETED = 'ORDER.DELETED',
  ORDER_STATUS_CHANGED = 'ORDER.STATUS_CHANGED',
  ORDER_PAYMENT_COMPLETED = 'ORDER.PAYMENT_COMPLETED',

  // =========================Product Events=========================
  PRODUCT_CREATED = 'PRODUCT.CREATED',
  PRODUCT_UPDATED = 'PRODUCT.UPDATED',
  PRODUCT_DELETED = 'PRODUCT.DELETED',
  PRODUCT_STOCK_UPDATED = 'PRODUCT.STOCK_UPDATED',

  // =========================Notification Events=========================
  NOTIFICATION_SENT = 'NOTIFICATION.SENT',
  NOTIFICATION_FAILED = 'NOTIFICATION.FAILED',

  // =========================Health check Events=========================
  HEALTH_CHECK_PASSED = 'HEALTH_CHECK.PASSED',
  HEALTH_CHECK_FAILED = 'HEALTH_CHECK.FAILED',
}
