export enum UserEventName {
  // =========================User CRUD Event=========================
  USER_CREATED = 'USER.CREATED',
  USER_UPDATED = 'USER.UPDATED',
  USER_DELETED = 'USER.DELETED',
  USER_PROFILE_DATA = 'USER.PROFILE_DATA',

  // =========================User Auth Status Event=========================
  USER_LOGOUT = 'USER.LOGOUT',
  USER_AUTH_CHECK = 'USER.AUTH_CHECK',
  USER_PASSWORD_RESET = 'USER.PASSWORD_RESET',

  // =========================Order CRUD Event=========================
  ORDER_CREATED = 'ORDER.CREATED',
  ORDER_DELETED = 'ORDER.DELETED',
  ORDER_UPDATED = 'ORDER.UPDATED',
  ORDER_STATUS_CHANGED = 'ORDER.STATUS_CHANGED',
  ORDER_PAYMENT_COMPLETED = 'ORDER.PAYMENT_COMPLETED',
}
