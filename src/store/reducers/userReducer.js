import constants from "../../config/constants"

const initialState = {
    data: {},
    isLoggedIn: false,
    role: constants.user_role.RETELLER_ROLE
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_IN": return { ...state, data: action.value, isLoggedIn: true, role: action.value.role };
        case "SIGN_OUT": return { ...state, data: {}, isLoggedIn: false, role: constants.user_role.RETELLER_ROLE };
        default: return { ...state }
    }
}
export default userReducer