import { TokenPayload } from "@/types/common/basic.type";
import { UserData } from "@/types/modules/v1/user/user-auth/data/user-date.type";
import { profileRepository } from "../repositories/";
import { eventEmitter } from "@/config";
import { UserEventName } from "@/constants";

export const profileService = async (userTokenData: TokenPayload): Promise<UserData> => {
    const userData = await profileRepository(userTokenData.userId)
    eventEmitter.emit(UserEventName.USER_PROFILE_DATA, userData)
    return userData!
}