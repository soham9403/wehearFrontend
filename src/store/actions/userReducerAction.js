import { accessToken, refreshToken, userId } from "../../config/helper"

export const signInAction = (data, donotSetLocalVar = false) => {
    if (!donotSetLocalVar) {
        accessToken.set(data.accessToken)
        refreshToken.set(data.refreshToken)
        userId.set(data._id)
    }

    return {
        type: "SIGN_IN",
        value: data
    }
}

export const signOutAction = () => {
    accessToken.remove()
    refreshToken.remove()
    userId.remove()

    return {
        type: "SIGN_OUT",
    }
}