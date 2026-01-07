export enum PublicEventName {
  // =========================Health Check Event=========================
  HEALTH_CHECK_PASSED = 'HEALTH_CHECK.PASSED',
  HEALTH_CHECK_FAILED = 'HEALTH_CHECK.FAILED',

  // =========================Login User Event=========================
  USER_LOGIN = 'USER.LOGIN',
  USER_LOGOUT = 'USER.LOGOUT',

  // =========================Forget Password Event=========================
  USER_FORGOT_PASSWORD_REQUESTED = 'USER.FORGOT_PASSWORD_REQUESTED',
  USER_FORGOT_PASSWORD_VERIFIED_OTP = 'USER.FORGOT_PASSWORD_VERIFIED_OTP',
  USER_FORGPT_PASSWORD_VERIFIED = 'USER.FORGOT_PASSWORD_VERIFIED',

  // =========================Register User Event=========================
  USER_REGISTER = 'USER.REGISTER',
  USER_REGISTER_CONFIRM = 'USER.REGISTER_CONFIRM',
  USER_REGISTER_RESEND_OTP = 'USER.REGISTER_RESEND_OTP',
}
