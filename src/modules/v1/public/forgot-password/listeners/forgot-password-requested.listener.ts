import { eventEmitter } from "@/config";
import { PublicEventName } from "@/constants";

eventEmitter.on(PublicEventName.USER_FORGOT_PASSWORD_REQUESTED, () => { })