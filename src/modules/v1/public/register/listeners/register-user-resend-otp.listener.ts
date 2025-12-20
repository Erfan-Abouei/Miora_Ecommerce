import { eventEmitter } from "@/config";
import { PublicEventName } from "@/constants";

eventEmitter.on(PublicEventName.USER_REGISTER_RESEND_OTP, (): void => {
  // user register resend otp notification !
})