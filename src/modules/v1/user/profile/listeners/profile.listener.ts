import { eventEmitter } from "@/config";
import { UserEventName } from "@/constants";
import { UserData } from "@/types/modules/v1/user/data/user-date.type";

eventEmitter.on(UserEventName.USER_PROFILE_DATA, (userData: UserData): void => { })